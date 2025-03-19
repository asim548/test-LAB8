const fs = require("fs");
const booksFile = "./data/books.json";

// Load books from JSON file
const loadBooks = () => {
    if (!fs.existsSync(booksFile)) return [];
    return JSON.parse(fs.readFileSync(booksFile, "utf8")) || [];
};

// Save books to JSON file
const saveBooks = (books) => {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};

// Lend a book
const lendBook = (title, author, borrower, dueDate, category) => {
    const books = loadBooks();
    const book = { title, author, borrower, returnDate: dueDate, category };
    books.push(book);
    saveBooks(books);
    return { 
        message: "Book lent successfully",
        book: book  // Include book details in response
    };
};

// Get borrowed books (with optional filter)
const getBorrowedBooks = (filter = {}) => {
    let books = loadBooks();
    if (filter.category) books = books.filter((b) => b.category === filter.category);
    if (filter.borrower) books = books.filter((b) => b.borrower === filter.borrower);
    if (filter.dueDate) books = books.filter((b) => b.returnDate === filter.dueDate);
    return books;
};

module.exports = { lendBook, getBorrowedBooks };
