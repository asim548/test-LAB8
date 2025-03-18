const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { lendBook, getBorrowedBooks } = require("./book");
const { registerUser, loginUser } = require("./auth");

const app = express();
const PORT = 3000;
const secretKey = "your_secret_key";

app.use(bodyParser.json());

// Middleware to authenticate users
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// User registration
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    res.json(registerUser(username, password));
});

// User login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    res.json(loginUser(username, password));
});

// Lend a book (authenticated)
app.post("/lend", authenticateToken, (req, res) => {
    const { title, author, borrower, dueDate, category } = req.body;
    res.json(lendBook(title, author, borrower, dueDate, category));
});

// Get borrowed books (authenticated)
app.get("/books", authenticateToken, (req, res) => {
    res.json(getBorrowedBooks(req.query));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
