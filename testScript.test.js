const fs = require("fs");
const { lendBook, getBorrowedBooks } = require("./src/book");

const booksFile = "./data/books.json";

// Clear books.json before each test
beforeEach(() => {
    fs.writeFileSync(booksFile, JSON.stringify([]));  // Reset books before each test
});

describe("Book Lending System", () => {
    
    test("should lend a book successfully", () => {
        const result = lendBook("1984", "George Orwell", "Alice", "2025-01-01", "Fiction");
        
        expect(result).toEqual({
            message: "Book lent successfully",
            book: {
                title: "1984",
                author: "George Orwell",
                borrower: "Alice",
                returnDate: "2025-01-01",
                category: "Fiction"
            }
        });

        const books = getBorrowedBooks();
        expect(books.length).toBe(1);  // Ensure book is stored
    });

    test("should return all borrowed books", () => {
        lendBook("1984", "George Orwell", "Alice", "2025-01-01", "Fiction");
        lendBook("Brave New World", "Aldous Huxley", "Bob", "2025-02-01", "Sci-Fi");

        const books = getBorrowedBooks();
        expect(books.length).toBe(2); // Ensures all books are retrieved
        expect(Array.isArray(books)).toBe(true);
    });

    test("should filter borrowed books by category", () => {
        lendBook("1984", "George Orwell", "Alice", "2025-01-01", "Fiction");
        lendBook("Brave New World", "Aldous Huxley", "Bob", "2025-02-01", "Sci-Fi");

        const fictionBooks = getBorrowedBooks({ category: "Fiction" });
        expect(fictionBooks.length).toBe(1);
        expect(fictionBooks[0].category).toBe("Fiction");
    });
});
