
const express = require("express");
const app = express();
const cors = require('cors')

const mongoConnect = require('./config/database')
const userRoute = require('./routes/userRoute')

app.use(cors({
    origin: ["http://localhost:3000"]
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRoute);

mongoConnect().then(() => {
    let server = app.listen(3500, ()=>{
        console.log("server running @ 3500");
    })
})
