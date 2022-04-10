const express = require("express")
const app = express() ;


app.get('/', (req, res, next) => {
    res.send("Hey, There!")
})


app.listen(process.env.PORT || 5454, () => {
    console.log(`server started at http://localhost:${process.env.PORT || 5454}`)
})