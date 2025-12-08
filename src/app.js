const express = require('express');

const app = express();

app.use("/user", ( req, res,next) => {
    console.log("User Route");
    // res.send("route handler 1")
    next();
},
[(req, res, next) => {
    console.log("User Route 2");
    // res.send("route handler 2")
    next();
},
(req, res, next) => {
    console.log("User Route 3");
    // res.send("route handler 3");
    next();
}],
(req, res, next) => {
    console.log("User Route 4");
    // res.send("route handler 4");
    next();
},
(req, res, next) => {
    console.log("User Route 5");
    res.send("route handler 5");
    next();
})

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});