import styles from './signin.module.css';
import { useState } from 'react';
import axios from 'axios';

export const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(null);

    async function handleSignin(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/api/user/signin",{
                "username":userName, "password":password
            })
            .then(function(res){
                console.log(res);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userID);
                if(res.status === 201){
                    window.location = "/dashboard";
                }
            })
        }catch(error){
            console.log(error);
            if(error.status===401){
                return setShowError("Invalid username or password");
            }
            else if(error.status===404){
                return setShowError("user not found");
            }
            else if(error.status===500){
                return setShowError("something went wrong");
            }
        }
        e.target.reset();
    }

    return(
        <section className={styles.signin}>
            <div className={styles.SIwelcmgreet}>
                    <h1>Welcome back</h1>
                    <h2>Let's login to <strong>buildbox</strong> your account</h2>
            </div>
            <div className={styles.SIWrapper}>
                <div className={styles.SItextrow}>
                <h2>Sign In</h2>
                <h2>Get started</h2>
                </div>
                    <form className={styles.SIformwrap} onSubmit={handleSignin}>
                    <label name='username'>Username</label>
                    <input type="alphanum" onChange={(e)=>{setUserName(e.target.value);}} required/>
                    <label name='password'>Password</label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value);}} required/>
                    <div className={styles.SIformerr}><p>{showError}</p></div>
                    <button type='submit'>sign in</button>
                    </form>
            </div>
            <div className={styles.SIusertosignup}>
            <p>New user? <a href="/signup">sign-up</a></p>
            </div>
        </section>
    );
} 