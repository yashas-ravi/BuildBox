import mongoose from "mongoose";
import bcrypt from "bcrypt";

const pageSchema = new mongoose.Schema({
    pagename: {type:String, required:true},
    status: {type:String, },
    jsonData: {type: String},
})

const userSchema = new mongoose.Schema({
    name:{
        type:String, match:/^[a-zA-Z]+$/,
        required: true,
        minlength: [3,'Name should be minimum 3 characters long'],
        maxlength: [20, 'Name should be below 20 characters'],
    },
    username:{
        type:String, match:/^[a-z0-9]+$/,
        required: true,
        unique: true,
        minlength: [6, 'Username should be minimum 6 characters long'],
        maxlength: [20, 'Username should be below 20 characters'],
    },
    password:{
        type:String, match:/^[a-z0-9@!#$%^&*-+_)(]+$/,
        required: true,
        minlength: [6, 'Password should be minimum 6 characters long'],
        maxlength: [20, 'Password should be below 20 characters'],
    },
    pages:[pageSchema]
});

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        });
    }
});

export default mongoose.model("users", userSchema);