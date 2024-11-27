import styles from './about.module.css';

export const About = () => {
    return(
        <section id='about' className={styles.about}>
            <h1>About</h1>
            <div className={styles.textWebsite}>
                <h2>Website</h2>
                <p>
                This is a no code, drag and drop website builder. A drag-and-drop builder is a user-friendly interface that allows individuals to create and customize digital content without needing coding knowledge. This tool uses a visual interface where users can select elements—such as text blocks, images, buttons, and forms—and "drag" them onto a digital canvas. Once placed, users can "drop" these elements in the desired position, adjusting their layout and appearance through simple actions like resizing, aligning, and styling. <br/> After user created their website through our tool, then they can download the source code of their website created and can be deployed anywhere of their choice.
                </p>
            </div>
            <div className={styles.textTeam}>
                <h2>Team</h2>
                <p>
                    We are the team of four worked on this project, each are responsible for each feature and design of this Website.
                </p>
            </div>
        </section>
    )
}