import express, {Request, Response} from 'express';
import { emailsWithPhoneNumbers,
    eamilsWithNames
} from './data'

const app = express();
app.use(express.json()); //POST request did not work without it

const port: number = 3000;

//GET /users?query_params 
// *I purposly missed the part where you said
//" query parameters - query=string" because
// I don't understand what you exactly mean by that
app.get("/users", (req: Request, res: Response) => {
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
app.get("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const filteredUsers = [...combinedUsers];
    
    const user = filteredUsers.find(user => user._id === id);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

//POST/users
app.post("/users", (req: Request, res: Response ) => {
    const { firstName, lastName, email, phoneNumber } = req.body;
  
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).json({ message: "You must give all fields: firstName, lastName, email, phoneNumber" });
    }

    const newUser: User = {
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
app.put("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;
  
    const userIndex = combinedUsers.findIndex((user) => user._id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const updatedUser = {
      ...combinedUsers[userIndex],
      firstName: firstName || combinedUsers[userIndex].firstName,
      lastName: lastName || combinedUsers[userIndex].lastName,
      email: email || combinedUsers[userIndex].email,
      phoneNumber: phoneNumber || combinedUsers[userIndex].phoneNumber,
    };
  
    combinedUsers[userIndex] = updatedUser;
  
    return res.status(200).json(updatedUser);
  });
  
// DELETE /users/{id}
app.delete("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
  
    const userIndex = combinedUsers.findIndex((user) => user._id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
    combinedUsers.splice(userIndex, 1);
    console.log(combinedUsers);
    
    return res.status(200).json({ success: true, message: "User deleted successfuly" });
  });

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }

function combineUserData(
    namesArray: { email: string; firstName: string; lastName: string }[],
    phoneNumbersArray: { email: string; phoneNumbers: { type: string; value: string }[] }[]
  ): User[] {
    return namesArray.map((user, index) => {
      const phoneNumberEntry = phoneNumbersArray.find(entry => entry.email === user.email);
  
      return {
        _id: `${index + 1}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: phoneNumberEntry?.phoneNumbers[0]?.value || "N/A",
      };
    });
  }

  let combinedUsers = combineUserData(eamilsWithNames, emailsWithPhoneNumbers);
  console.log(combinedUsers);