const fs = require("fs");
const booksFile = "./data/books.json";


const loadBooks = () => {
    if (!fs.existsSync(booksFile)) return [];
    return JSON.parse(fs.readFileSync(booksFile, "utf8")) || [];
};


const saveBooks = (books) => {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};


const lendBook = (title, author, borrower, dueDate, category) => {
    const books = loadBooks();
    books.push({ title, author, borrower, dueDate, category });
    saveBooks(books);
    return { message: "Book lent successfully" };
};


const getBorrowedBooks = (filter = {}) => {
    let books = loadBooks();
    if (filter.category) books = books.filter((b) => b.category === filter.category);
    if (filter.borrower) books = books.filter((b) => b.borrower === filter.borrower);
    if (filter.dueDate) books = books.filter((b) => b.dueDate === filter.dueDate);
    return books;
};


module.exports = { lendBook, getBorrowedBooks };
