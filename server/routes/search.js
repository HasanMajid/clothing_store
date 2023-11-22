const express = require('express');
const app = express();
const PORT = 3000; // Choose a port number

// Sample data (replace this with your actual data)
const users = [
  { USERID: 1, USERTYPE: 'Admin', FIRSTNAME: 'John', LASTNAME: 'Doe', EMAIL: 'john@example.com', PHONENUMBER: '123-456-7890', DATEOFBIRTH: '1990-01-01' },
  // Add more users as needed
];

// Endpoint to get all users
app.get('/user/get', (req, res) => {
  res.json(users);
});

// Endpoint to search users based on the provided query parameter
app.get('/user/search', (req, res) => {
  const searchTerm = req.query.q.toLowerCase();

  const filteredUsers = users.filter(user => {
    // You can customize the search logic based on your requirements
    return (
      user.FIRSTNAME.toLowerCase().includes(searchTerm) ||
      user.LASTNAME.toLowerCase().includes(searchTerm) ||
      user.EMAIL.toLowerCase().includes(searchTerm)
    );
  });

  res.json(filteredUsers);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});