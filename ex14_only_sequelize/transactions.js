import sequelize from './db.js';
import { Book, User, Loan } from './models.js';

export async function successTransaction() {

    const t = await sequelize.transaction();

    try {

        const newUser = await User.create({
            name: 'Сергей Петрович'
        }, {
            transaction: t
        });

        const newBook = await Book.create({
            title: 'Капитанская Дочка',
            genreId: 1,
            totalCopies: 1,
            availableCopies: 1
        }, {
            transaction: t
        });

        const newLoan = await Loan.create({
            userId: newUser.id,
            bookId: newBook.id,
            quantity: 1,
        }, {
            transaction: t
        });

        await t.commit();
        console.log('New Loan: ', newLoan.dataValues);

    } catch (err) {
        await t.rollback();
        console.error('Error detected:', err);
    }

}

export async function failedTransaction() {

    const t = await sequelize.transaction();

    try {

        const newUser = await User.create({
            name: 'Сергей Петрович'
        }, {
            transaction: t
        });

        const newBook = await Book.create({
            title: 'Капитанская Дочка',
            genreId: 1,
            totalCopies: 1,
            availableCopies: 1
        }, {
            transaction: t
        });

        const newLoan = await Loan.create({
            userId: newUser.id,
            bookId: newBook.id,
            quantity: 3, // <-- EXCEPTION !!!
        }, {
            transaction: t
        });

        await t.commit();
        console.log('New Loan: ', newLoan.dataValues);

    } catch (err) {
        await t.rollback();
        console.error('Error detected:', err);
    }


}