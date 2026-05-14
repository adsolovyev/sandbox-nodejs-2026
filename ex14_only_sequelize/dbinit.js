import sequelize from './db.js';

export async function setupDatabase() {
    await sequelize.sync({
        alter: true
    });

    // FIXME: Pg ot MariaDB?

    await sequelize.query(`CREATE OR REPLACE FUNCTION decrease_book_copies()
RETURNS TRIGGER AS $$
BEGIN
	IF (SELECT available_copies FROM books WHERE id = NEW.book_id) < NEW.quantity THEN
        RAISE EXCEPTION 'Not enough copies available';
    END IF;

    UPDATE books
    SET available_copies = available_copies - NEW.quantity
    WHERE id = NEW.book_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`);

    await sequelize.query(`DROP TRIGGER IF EXISTS trg_decrease_copies ON loans;
CREATE TRIGGER trg_decrease_copies
BEFORE INSERT on loans
FOR EACH ROW
EXECUTE FUNCTION decrease_book_copies();`);

    await sequelize.query(`CREATE OR REPLACE FUNCTION increase_book_copies()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.return_date IS NOT NULL AND OLD.return_date IS NULL THEN
		UPDATE books
		SET available_copies = available_copies + NEW.quantity
		WHERE id = NEW.book_id;
	END IF;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;`);

    await sequelize.query(`DROP TRIGGER IF EXISTS increase_book_copies ON loans;
CREATE TRIGGER trg_increase_copies
AFTER UPDATE on loans
FOR EACH ROW
EXECUTE FUNCTION increase_book_copies();`);

    await sequelize.query(`CREATE OR REPLACE FUNCTION log_loan_actions()
RETURNS TRIGGER AS $$
BEGIN
     -- Выдача
    IF TG_OP = 'INSERT' THEN
        INSERT INTO logs(action, "user", book, quantity)
        VALUES ('ISSUE', (SELECT name from users WHERE id = NEW.user_id), (SELECT title from books WHERE id = NEW.book_id), NEW.quantity);
    END IF;

    -- Возврат
    IF TG_OP = 'UPDATE' AND NEW.return_date IS NOT NULL AND OLD.return_date IS NULL THEN
        INSERT INTO logs(action, "user", book, quantity)
        VALUES ('RETURN', (SELECT name from users WHERE id = NEW.user_id), (SELECT title from books WHERE id = NEW.book_id), NEW.quantity);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`);

    await sequelize.query(`DROP TRIGGER IF EXISTS trg_log_loans ON loans;
CREATE TRIGGER trg_log_loans
AFTER INSERT OR UPDATE ON loans
FOR EACH ROW
EXECUTE FUNCTION log_loan_actions();`);


    await sequelize.query(`CREATE OR REPLACE PROCEDURE reset_library()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE books
    SET available_copies = total_copies;
    DELETE FROM loans;
    DELETE FROM logs;
END;
$$;`);

// customize db structure

   await sequelize.query(`ALTER TABLE loans ALTER COLUMN loan_date SET DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE logs ALTER COLUMN datetime SET DEFAULT CURRENT_TIMESTAMP;`);

    
    await sequelize.query(`INSERT INTO users ("name") values
('masha'),
('sasha');

INSERT INTO roles ("name") values
('admin'),
('manager'),
('user');

INSERT INTO user_role (user_id, role_id) values
(1,1),
(1,2),
(2,3);

INSERT INTO genres ("name") values
('Русская классика'),
('Иностранное');

INSERT INTO books (title, genre_id, total_copies, available_copies) VALUES 
('Преступление и наказание', 1 , 10, 10),
('Война и мир', 1 , 5, 5),
('Мастер и Маргарита', 1 , 8, 8),
('Евгений Онегин', 1 , 12, 12),
('Отцы и дети', 1 , 7, 7),
('Герой нашего времени', 1 , 6, 6),
('Мертвые души', 1 , 4, 4),
('Анна Каренина', 1 , 5, 5),
('Идиот', 1 , 3, 3),
('Гарри Потер', 2 , 15, 15);
`);

}