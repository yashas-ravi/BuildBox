import styles from './signup.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [showError, setShowError] = useState("");
    const navigate = useNavigate();

    async function handleSignup(e){
        e.preventDefault();
        if(username.length < 6){
            return setShowError("username must be 6 characters long");
        }
        if(password.length < 6){
            return setShowError("Password must be 6 characters long");
        }
        if(password!==confpassword){
            return setShowError("Passwords not matching");
        }
        try{
            await axios.post("http://localhost:8000/api/user/signup",{
                "username":username, "name":name, "password":password
            })
            .then(function(res){
                console.log(res);
                if(res.status === 200){
                    navigate("/signin");
                }
            })
        }catch(error){
            console.log(error);
            if(error.status===400){
                return setShowError("user already exists");
            }
            else if(error.status===500){
                return setShowError("something went wrong");
            }
        }
        e.target.reset();
    }

    return(
        <section className={styles.signup}>
            <div className={styles.SUwelcmgreet}>
                    <h1>Welcome to <strong>buildbox</strong></h1>
                    <h2>Let's create your account</h2>
            </div>
            <div className={styles.SUWrapper}>
                <div className={styles.SUtextrow}>
                <h2>Sign Up</h2>
                <h2>Get started</h2>
                </div>
                    <form className={styles.SUformwrap} onSubmit={handleSignup}>
                    <label name='name'>Name</label>
                    <input type="text" onChange={(e)=>{setName(e.target.value);}} required/>
                    <label name='username'>Username</label>
                    <input type="alphanum" onChange={(e)=>{setUsername(e.target.value);}} required/>
                    <label name='password'>Password</label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value);}} required/>
                    <label name='confirm-password'>Confirm Password</label>
                    <input type="password" onChange={(e)=>{setConfPassword(e.target.value);}} required/>
                    <div className={styles.SUformerr}><p>{showError}</p></div>
                    <button type='submit'>sign up</button>
                    </form>
            </div>
            <div className={styles.SUusertosignin}>
            <p>already user? <a href="/signin">sign-in</a></p>
            </div>
        </section>
    );
} 