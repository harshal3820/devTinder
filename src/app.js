const express = require('express');

const app = express();

// /ac, /abc will be handled
// app.get(/^\/ab?c$/, (req, res) =>{
//     res.send({firstName: "Harshal", lastName: "Patil"})
// })

// // /abc, /abbc, /abbbbbbbbbbbbbbbbbbc will be handled
// app.get(/^\/ab+c$/, (req, res) =>{
//     res.send({firstName: "Harshal", lastName: "Patil"})
// })

// // /acd, /abcd, /abbbcd, /abbbbbbbbbbbbbbbbc will be handled
// app.get(/^\/ab*cd$/, (req, res) =>{
//     res.send({firstName: "Harshal", lastName: "Patil"})
// })

// app.get(/^\/a(bc)+d$/, (req, res) =>{
//     res.send({firstName: "Harshal", lastName: "Patil"})
// })

app.get(/^\/.*fly$/, (req, res) =>{
    res.send({firstName: "Harshal", lastName: "Patil"})
})

//This will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
    // console.log(req.query);
    console.log(req.params)
    res.send({firstName: "Harshal", lastName: "Patil"});
})

app.use("/hello", (req, res) => {
    res.send("Hello Hello Hello!")
})

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});