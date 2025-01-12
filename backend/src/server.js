"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = require("./data");
var app = (0, express_1.default)();
app.use(express_1.default.json()); //POST request did not work without it
var port = 3000;
//GET /users?query_params 
// *I purposly missed the part where you said
//" query parameters - query=string" because
// I don't understand what you exactly mean by that
app.get("/users", function (req, res) {
    var _a = req.query, email = _a.email, phoneNumber = _a.phoneNumber;
    var filteredUsers = __spreadArray([], combinedUsers, true);
    if (email) {
        var emailString_1 = email.toString();
        filteredUsers = filteredUsers.filter(function (user) { return user.email === emailString_1; });
    }
    if (phoneNumber) {
        var phoneNumberString_1 = phoneNumber.toString();
        filteredUsers = filteredUsers.filter(function (user) { return user.phoneNumber === phoneNumberString_1; });
    }
    else
        res.json(filteredUsers);
    res.json(filteredUsers);
});
//GET/users/{id}
app.get("/users/:id", function (req, res) {
    var id = req.params.id;
    var filteredUsers = __spreadArray([], combinedUsers, true);
    var user = filteredUsers.find(function (user) { return user._id === id; });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
//POST/users
app.post("/users", function (req, res) {
    var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, phoneNumber = _a.phoneNumber;
    if (!firstName || !lastName || !email || !phoneNumber) {
        return res.status(400).json({ message: "You must give all fields: firstName, lastName, email, phoneNumber" });
    }
    var newUser = {
        _id: "".concat(combinedUsers.length + 1),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
    };
    res.status(201).json(newUser);
});
app.listen(port, function () {
    console.log("Serrver is running on https://localhost:".concat(port));
});
//PUT/users/{id}
app.put("/users/:id", function (req, res) {
    var id = req.params.id;
    var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, phoneNumber = _a.phoneNumber;
    var userIndex = combinedUsers.findIndex(function (user) { return user._id === id; });
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    var updatedUser = __assign(__assign({}, combinedUsers[userIndex]), { firstName: firstName || combinedUsers[userIndex].firstName, lastName: lastName || combinedUsers[userIndex].lastName, email: email || combinedUsers[userIndex].email, phoneNumber: phoneNumber || combinedUsers[userIndex].phoneNumber });
    combinedUsers[userIndex] = updatedUser;
    return res.status(200).json(updatedUser);
});
// DELETE /users/{id}
app.delete("/users/:id", function (req, res) {
    var id = req.params.id;
    var userIndex = combinedUsers.findIndex(function (user) { return user._id === id; });
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    combinedUsers.splice(userIndex, 1);
    console.log(combinedUsers);
    return res.status(200).json({ success: true, message: "User deleted successfuly" });
});
function combineUserData(namesArray, phoneNumbersArray) {
    return namesArray.map(function (user, index) {
        var _a;
        var phoneNumberEntry = phoneNumbersArray.find(function (entry) { return entry.email === user.email; });
        return {
            _id: "".concat(index + 1),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: ((_a = phoneNumberEntry === null || phoneNumberEntry === void 0 ? void 0 : phoneNumberEntry.phoneNumbers[0]) === null || _a === void 0 ? void 0 : _a.value) || "N/A",
        };
    });
}
var combinedUsers = combineUserData(data_1.eamilsWithNames, data_1.emailsWithPhoneNumbers);
console.log(combinedUsers);
