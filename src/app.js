const express = require('express');
const { adminAuth,userAuth } = require('./middlewares/auth');

const app = express();

app.use('/admin',adminAuth);

app.get('/user', userAuth, (req, res) => {
    res.send("User data sent successfully");
})

app.get('/admin/getAllData', (req, res) => {
    res.send("All data sent successfully");
})

app.post('/admin/deleteUser', (req, res) => {
    res.send("User deleted successfully");
})

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});