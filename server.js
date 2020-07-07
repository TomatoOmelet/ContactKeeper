const express = require("express");
const { request } = require("express");

const app = express()

app.get("/", (request, res) =>{res.json({message: "Hello"})})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`server started on ${PORT}`)})
