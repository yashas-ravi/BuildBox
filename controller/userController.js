import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const fetchall = async (req, res) => {
    try{
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({message:"no users found"})
        } 
        res.status(200).json(users);

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error."});
    }
};

export const fetchuser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findOne({_id:id});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({user});

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error."});
    }
};

export const createuser = async (req, res) => {
    try{
        const userData = new User(req.body);
        const {username} = userData;

        const userExist = await User.findOne({username});
        if(userExist){
            return res.status(400).json({message:"user already exists."});
        }

        const savedUser = await userData.save();
        res.status(200).json(savedUser);

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const createpage = async (req, res) => {
    try{
        const id = req.params.id;
        const {pagename, status, jsonData} = req.body;
        // const pageExist = await User.findOne({id, "pages.name":name});
        // if(pageExist){
        //     return res.status(400).json({message:"page already exists.", pageExist});
        // }
        const savedPage = await User.findByIdAndUpdate(id, {$addToSet:{pages:{pagename:pagename,status:status, jsonData:jsonData,}}});
        res.status(200).json(savedPage);

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const updateuser = async(req, res) => {
    try{
        const id = req.params.id;
        const field = req.query.field;
        const value = req.query.value;
        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message:"user not found."});
        }
        const updateuser = await User.updateOne({_id:id},{ [field]:value});
        res.status(201).json(updateuser);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const updatepage = async(req, res) => {
    try{
        const id = req.params.id;
        const status = req.query.status;
        const pageExist = await User.findOne({"pages._id":id});
        if(!pageExist){
            return res.status(404).json({message:"page not found."});
        }
        const updatePage = await User.updateOne({"pages._id":id},{$set:{"pages.$.status":status}});
        res.status(201).json(updatePage);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const deleteuser = async(req, res) => {
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message:"user not found."});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message:"User deleted"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const deletepage = async(req, res) => {
    try{
        const id = req.params.id;
        const pageid = req.query.pageid;
        const pageExist = await User.findOne({"pages._id":pageid});
        if(!pageExist){
            return res.status(404).json({message:"page not found."});
        }
        await User.findByIdAndUpdate(id, {$pull:{pages:{_id:pageid}}},{new:true});
        res.status(201).json({message:"page deleted"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const saveContent = async(req, res) => {
    try{
        const id = req.params.pageId;
        const page = await User.findOne({"pages._id":id});
        if(!page){
            return res.status(404).json({message:"page not found."});
        }
        const updatePage = await User.updateOne({"pages._id":id},{$set:{"pages.$.jsonData": req.body.jsonData}});
        res.status(201).json(updatePage);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const loadContent = async(req, res) => {
    try{
        const id = req.params.pageId;
        const page = await User.findOne({"pages._id":id});
        if(!page){
            return res.status(404).json({message:"page not found."});
        }
        let pageIndex = 0;
        page.pages.forEach(element => {
            if(element._id==id){
                res.header("Content-type", "application/json");
                res.status(201).json(page.pages[pageIndex].jsonData);
            }
            pageIndex++;
        });
       
        pageIndex=0;
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const signUp = async(req, res) => {
    try{
        const userData = new User(req.body);
        const {username} = userData;
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"user already exists"});
        }
        const savedUser = await userData.save();
        jwt.sign({_id: savedUser._id}, 'secretkey123',{expiresIn:'10d'});

        res.status(200).json({status:"success",message:"user regestered successfully",});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};

export const signin = async(req, res) => {
    try{
        const userData = new User(req.body);
        const {username} = userData;
        const {password} = userData;
        const userExist = await User.findOne({username});
        if(!userExist){ 
            return res.status(404).json({message:"user not found."});
        }
        const userID = userExist._id;
        const isValidPass = await bcrypt.compare(password, userExist.password);
        if(!isValidPass){
            return res.status(401).json({message:"Invalid username or password"});
        }
        const token = jwt.sign({_id: userExist._id}, 'secretkey123',{expiresIn:'10d'});
        res.status(201).json({message:"login successful", token, userID});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error."});
    }
};