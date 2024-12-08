import styles from './signin.module.css';

export const Signin = () => {
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
                    <form action="" className={styles.SIformwrap}>
                    <label name='username'>Username</label>
                    <input type="alphanum" required/>
                    <label name='password'>Password</label>
                    <input type="password" required/>
                    <button type='submit'>sign in</button>
                    </form>
            </div>
            <div className={styles.SIusertosignup}>
            <p>New user? <a href="/signup">sign-up</a></p>
            </div>
        </section>
    );
} 