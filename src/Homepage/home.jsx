import styles from './home.module.css';

export const Home = () => {
 return(
    <section>
    <div className={styles.nav}>
        <div>
            <img src="" alt="" />
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </div>
    </section>
 );
}