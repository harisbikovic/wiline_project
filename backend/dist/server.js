"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("./data");
const app = (0, express_1.default)();
app.use(express_1.default.json()); //POST request did not work without it
const port = 3000;
//GET /users?query_params 
// *I purposly missed the part where you said
//" query parameters - query=string" because
// I don't understand what you exactly mean by that
app.get("/users", (req, res) => {
    const { email, phoneNumber } = req.query;
    let filteredUsers = [...combinedUsers];
    if (email) {
        const emailString = email.toString();
        filteredUsers = filteredUsers.filter(user => user.email === emailString);
    }
    if (phoneNumber) {
        const phoneNumberString = phoneNumber.toString();
        filteredUsers = filteredUsers.filter(user => user.phoneNumber === phoneNumberString);
    }
    else
        res.json(filteredUsers);
    res.json(filteredUsers);
});
//GET/users/{id}
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const filteredUsers = [...combinedUsers];
    const user = filteredUsers.find(user => user._id === id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
//POST/users
app.post("/users", (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
        return res.status(400).json({ message: "You must give all fields: firstName, lastName, email, phoneNumber" });
    }
    const newUser = {
        _id: `${combinedUsers.length + 1}`,
        firstName,
        lastName,
        email,
        phoneNumber,
    };
    res.status(201).json(newUser);
});
app.listen(port, () => {
    console.log(`Serrver is running on https://localhost:${port}`);
});
//PUT/users/{id}
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;
    const userIndex = combinedUsers.findIndex((user) => user._id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = Object.assign(Object.assign({}, combinedUsers[userIndex]), { firstName: firstName || combinedUsers[userIndex].firstName, lastName: lastName || combinedUsers[userIndex].lastName, email: email || combinedUsers[userIndex].email, phoneNumber: phoneNumber || combinedUsers[userIndex].phoneNumber });
    combinedUsers[userIndex] = updatedUser;
    return res.status(200).json(updatedUser);
});
// DELETE /users/{id}
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = combinedUsers.findIndex((user) => user._id === id);
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    combinedUsers.splice(userIndex, 1);
    console.log(combinedUsers);
    return res.status(200).json({ success: true, message: "User deleted successfuly" });
});
function combineUserData(namesArray, phoneNumbersArray) {
    return namesArray.map((user, index) => {
        var _a;
        const phoneNumberEntry = phoneNumbersArray.find(entry => entry.email === user.email);
        return {
            _id: `${index + 1}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: ((_a = phoneNumberEntry === null || phoneNumberEntry === void 0 ? void 0 : phoneNumberEntry.phoneNumbers[0]) === null || _a === void 0 ? void 0 : _a.value) || "N/A",
        };
    });
}
let combinedUsers = combineUserData(data_1.eamilsWithNames, data_1.emailsWithPhoneNumbers);
console.log(combinedUsers);
