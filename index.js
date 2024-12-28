import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

const PORT = 8000;
const BUILDBOXDB = "mongodb://localhost:27017/BuildBox-DataBase";

mongoose.connect(BUILDBOXDB).then(()=>{
    console.log("DataBase is connected successful");
    app.listen(PORT,()=>{
        console.log('Server is running');
    });
}).catch((error)=>console.log(error));

app.use("/api/user", route);