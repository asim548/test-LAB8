const fs = require("fs");
const booksFile = "./data/books.json";

// Load books data
const loadBooks = () => {
    if (!fs.existsSync(booksFile)) return [];
    return JSON.parse(fs.readFileSync(booksFile, "utf8")) || [];
};

// Save books data
const saveBooks = (books) => {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};

// Lend a book function
const lendBook = (title, author, borrower, dueDate, category) => {
    const books = loadBooks();
    books.push({ title, author, borrower, dueDate, category });
    saveBooks(books);
    return { message: "Book lent successfully" };
};

// Get borrowed books function
const getBorrowedBooks = (filter = {}) => {
    let books = loadBooks();
    if (filter.category) books = books.filter((b) => b.category === filter.category);
    if (filter.borrower) books = books.filter((b) => b.borrower === filter.borrower);
    if (filter.dueDate) books = books.filter((b) => b.dueDate === filter.dueDate);
    return books;
};

// Export functions
module.exports = { lendBook, getBorrowedBooks };
