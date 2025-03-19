const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersFile = "./data/users.json";
const secretKey = "your_secret_key"; 


const loadUsers = () => {
    if (!fs.existsSync(usersFile)) return [];
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
};


const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const registerUser = (username, password) => {
    const users = loadUsers();
    if (users.find((user) => user.username === username)) {
        return { error: "User already exists" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers(users);
    return { message: "User registered successfully" };
};


const loginUser = (username, password) => {
    const users = loadUsers();
    const user = users.find((u) => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return { error: "Invalid username or password" };
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    return { message: "Login successful", token };
};


module.exports = { registerUser, loginUser };
