import styles from './signup.module.css';

export const Signup = () => {
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
                    <form action="" className={styles.SUformwrap}>
                    <label name='name'>Name</label>
                    <input type="text" required/>
                    <label name='username'>Username</label>
                    <input type="alphanum" required/>
                    <label name='password'>Password</label>
                    <input type="password" required/>
                    <label name='confirm-password'>Confirm Password</label>
                    <input type="password" required/>
                    <button type='submit'>sign up</button>
                    </form>
            </div>
            <div className={styles.SUusertosignin}>
            <p>already user? <a href="/signin">sign-in</a></p>
            </div>
        </section>
    );
} 