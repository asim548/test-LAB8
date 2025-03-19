const { registerUser, loginUser } = require("./src/auth.js");

// Test User Registration
console.log("Testing registerUser function...");
let registerResult = registerUser("testUser", "securePassword123");
console.log(registerResult);

// Test Duplicate User Registration
console.log("\nTesting duplicate user registration...");
let duplicateRegister = registerUser("testUser", "newPassword456");
console.log(duplicateRegister);

// Test User Login (Correct Credentials)
console.log("\nTesting loginUser function with correct credentials...");
let loginSuccess = loginUser("testUser", "securePassword123");
console.log(loginSuccess);

// Test User Login (Incorrect Password)
console.log("\nTesting loginUser function with incorrect password...");
let loginFail = loginUser("testUser", "wrongPassword");
console.log(loginFail);

// Test User Login (Non-existent User)
console.log("\nTesting loginUser function with non-existent user...");
let loginNoUser = loginUser("unknownUser", "password123");
console.log(loginNoUser);
