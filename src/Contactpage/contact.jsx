import styles from './contact.module.css';

export const Contact = () => {
    return(
        <section id='contact' className={styles.contact}>
            <h1>Contact us</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formBox}>
                 <h2>How Can We Help You?</h2>
                 <form action="" className={styles.formfield}>
                    <label name="name">Your name</label>
                    <input type="text" required/>
                    <label name="email">Your email</label>
                    <input type="email" required/>
                    <label name="message">Enter your message</label>
                    <textarea name="message" id="textField" required></textarea>
                    <button type='submit'>Submit</button>
                 </form>
                </div>
            </div>
            <p>Made by BuildBox</p>
        </section>
    );
}