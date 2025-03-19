const { lendBook, getBorrowedBooks } = require("./src/book");

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
    });

    test("should return all borrowed books", () => {
        const books = getBorrowedBooks();
        expect(Array.isArray(books)).toBe(true);
    });

    test("should filter borrowed books by category", () => {
        const fictionBooks = getBorrowedBooks({ category: "Fiction" });
        expect(fictionBooks.every(book => book.category === "Fiction")).toBe(true);
    });
});
