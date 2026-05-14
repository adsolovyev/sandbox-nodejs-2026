-- пример успешной транзакции
-- (выпонляем запросы по очереди)
BEGIN;
INSERT INTO loans (user_id, book_id, quantity) values (1, 4, 6);
INSERT INTO loans (user_id, book_id, quantity) values (2, 4, 6);
-- на этом этапе смотрим содержимое таблицы loans (там не должно быть этих данных!)
COMMIT; -- подтверждение транзакции
-- смотрим содержимое таблицы loans ещё раз (данные должны появиться)


-- пример транзакции с выбросом исключений
-- (выпонляем запросы по очереди)
BEGIN;
INSERT INTO loans (user_id, book_id, quantity) values (1, 7, 3);
INSERT INTO loans (user_id, book_id, quantity) values (2, 7, 2); -- выбросит ошибку 'Not enough copies available'
-- на этом этапе даже COMMIT не поможет, т.к. транзакция будет автоматически отменена

ROLLBACK; -- откат транзакции вручную