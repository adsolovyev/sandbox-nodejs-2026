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