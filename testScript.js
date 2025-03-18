const { lendBook, getBorrowedBooks } = require("./src/book.js");


//testing
// Test lending a book
console.log("Testing lendBook function...");
const result = lendBook("1984", "George Orwell", "Alice", "2025-01-01", "Fiction");
console.log(result); // Expected output: { message: "Book lent successfully" }

// Test getting borrowed books
console.log("\nTesting getBorrowedBooks function...");
const borrowedBooks = getBorrowedBooks();
console.log(borrowedBooks); // Expected output: Array of books

// Test filtering borrowed books by category
console.log("\nTesting getBorrowedBooks with category filter...");
const fictionBooks = getBorrowedBooks({ category: "Fiction" });
console.log(fictionBooks); // Expected output: Array of Fiction books
