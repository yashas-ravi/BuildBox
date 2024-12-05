import styles from './home.module.css';
import heroImg from '../assets/heroimg.png';

export const Home = () => {
 return(
    <section className={styles.home}>
    <div className={styles.navbar}>
            <strong>Build Box</strong>
            <ul className={styles.navlinks}>
                <li><a href="/">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/signin">sign in</a></li>
            </ul>
    </div>
    <div className={styles.hero}>
        <div className={styles.colorBox}></div>
        <div className={styles.texts}>
            <h1>Creating websites made easy</h1>
            <h2>build your websites with ease</h2>
            <p>You can create your own website using our no code drag and drop editor.
                No coding experience or skills needed, you can just play around and create your first website in a few minutes.
            </p>
            <div className={styles.heroButtons}>
            <button><a href="/signup">Get started</a></button>
            <button><a href="#contact">contact</a></button>
            </div>
        </div>
        <div className={styles.heroImgdiv}>
        <img src={heroImg} alt="img" />
        </div>
    </div>

    </section>
 );
}