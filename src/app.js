const express = require('express');

const app = express();

//This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName: "Harshal", lastName: "Patil"});
})

app.post("/user", (req, res) => {
    console.log(req.body);
    //Saving data to DB
    res.send("Data successfully saved to db!");
})

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!");
})

//This will match all the HTTP method API calls to /test i.e. GET, POST, DELETE
app.use("/test",(req, res) => {
    res.send("Hello from server")
})

app.use("/", (req, res) => {
    res.send("Namaste Harshal")
})
app.use("/hello", (req, res) => {
    res.send("Hello Hello Hello!")
})

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});