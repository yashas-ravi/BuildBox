import express from "express";
import {createuser,createpage, fetchall, updateuser, updatepage, saveContent, loadContent, fetchuser, deleteuser, deletepage,signUp, signin} from "../controller/userController.js";

const route = express.Router();

route.get("/fetchall",fetchall);
route.get("/fetch/:id",fetchuser);
route.post("/createuser",createuser);
route.post("/createpage/:id",createpage);
route.put("/updateuser/:id",updateuser);
route.put("/updatepage/:id",updatepage);
route.delete("/deleteuser/:id",deleteuser);
route.delete("/deletepage/:id",deletepage);
route.get("/loadcontent/:pageId",loadContent);
route.post("/savecontent/:pageId",saveContent); 
route.post("/signup", signUp);
route.post("/signin", signin);

export default route;