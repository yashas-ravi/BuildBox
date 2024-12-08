import styles from './home.module.css';
import heroImg from '../assets/heroimg.png';

export const Home = () => {

    let navLinks = "rr"
    navLinks = document.getElementById('navlinks');

    const handleMenu = (Mkey) => {
        if(Mkey === 'open'){
            navLinks.style.right = '5px';
        }
        if(Mkey === 'close'){
            navLinks.style.right= '-400px';
        }
    }

 return(
    <section className={styles.home}>
    <div className={styles.navbar}>
            <strong>Build Box</strong>
            <ul id='navlinks' className={styles.navlinks}>
            <p onClick={()=>handleMenu('close')} className={styles.navbarClosemenu}><i class="fa-solid fa-xmark"></i></p>
                <li><a href="/">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/signin">sign in</a></li>
            </ul>
            <div onClick={()=>handleMenu('open')} className={styles.navbarMenu}>
            <i class="fa-solid fa-bars"></i>
            </div>
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