const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
let users = [ { "username": "Alejo", "password": "123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const isValid = (username) => { //returns boolean
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const authenticatedUser = (username, password) => { //returns boolean
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
regd_users.post("/login", (req, res) => {
    console.log(users)
    const username = req.query.username;
    const password = req.query.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
    let isbn = req.params.isbn
    let text = req.query.review
    let usernameAuth = req.session.authorization.username
    if(isbn) {
        if(books[isbn]) {
            books[isbn].reviews[usernameAuth] = text
            console.log(books)
            res.send("Your review was written successfully")
        }
    }
    res.send("An error occurred")
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn
    let usernameAuth = req.session.authorization.username
    if(isbn) {
        delete books[isbn].reviews[usernameAuth]
        console.log(books)
        res.send("Your review was delted successfully")
    }
    res.send("An error occurred")
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
 4  
final_project/router/booksdb.js
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -1,5 +1,7 @@
let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {
          "Pablo": "opagodbookrey"
      } },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
