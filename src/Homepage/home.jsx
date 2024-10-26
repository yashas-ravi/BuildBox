import styles from './home.module.css';
import heroImg from '../assets/heroImg.png'

export const Home = () => {
 return(
    <section className={styles.home}>
    <div className={styles.navbar}>
            <strong>Build Box</strong>
            <ul className={styles.navlinks}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
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
            <button>start build</button>
            <button>contact</button>
            </div>
        </div>
        <div className={styles.heroImgdiv}>
        <img src={heroImg} alt="img" />
        </div>
    </div>

    </section>
 );
}