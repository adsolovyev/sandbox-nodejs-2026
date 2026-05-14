-- Роли
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Связь многие-ко-многим (пользователь ↔ роли)
CREATE TABLE user_roles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Жанры (справочник)
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Книги
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre_id INT REFERENCES genres(id) ON DELETE RESTRICT,
    total_copies INT NOT NULL CHECK (total_copies >= 0),
    available_copies INT NOT NULL CHECK (available_copies >= 0)
);

-- Выдачи
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    book_id INT REFERENCES books(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP
);

-- Журнал
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    action TEXT NOT NULL, -- 'ISSUE' или 'RETURN'
    "user" TEXT NOT NULL,
    book TEXT NOT NULL,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity INT
);

INSERT INTO users ("name") values
('masha'),
('sasha');

INSERT INTO roles ("name") values
('admin'),
('manager'),
('user');

INSERT INTO user_roles (user_id, role_id) values
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


-- выдача книги с изменением счётчика двумя запросами
INSERT INTO loans (user_id,book_id,quantity) VALUES (2,7,1);
--UPDATE books SET available_copies=available_copies-1 WHERE id=7;


-- описание триггера - начало

-- функция для триггера
CREATE OR REPLACE FUNCTION decrease_book_copies()
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
$$ LANGUAGE plpgsql;

-- сам триггер
CREATE TRIGGER trg_decrease_copies
BEFORE INSERT on loans
FOR EACH ROW
EXECUTE FUNCTION decrease_book_copies();

-- описание триггера - конец


-- описание триггера - начало

-- функция для триггера
CREATE OR REPLACE FUNCTION increase_book_copies()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.return_date IS NOT NULL AND OLD.return_date IS NULL THEN
		UPDATE books
		SET available_copies = available_copies + NEW.quantity
		WHERE id = NEW.book_id;
	END IF;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- сам триггер
CREATE TRIGGER trg_increase_copies
AFTER UPDATE on loans
FOR EACH ROW
EXECUTE FUNCTION increase_book_copies();
-- описание триггера - конец


-- описание триггера - начало

-- функция для триггера
CREATE OR REPLACE FUNCTION log_loan_actions()
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
$$ LANGUAGE plpgsql;


-- сам триггер
CREATE TRIGGER trg_log_loans
AFTER INSERT OR UPDATE ON loans
FOR EACH ROW
EXECUTE FUNCTION log_loan_actions();

-- описание триггера - конец

-- хранимая процедура
CREATE OR REPLACE PROCEDURE reset_library()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE books
    SET available_copies = total_copies;
    DELETE FROM loans;
    DELETE FROM logs;
END;
$$;