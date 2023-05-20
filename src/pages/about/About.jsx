import styles from "./about.module.css";

function About() {
  return (
    <div className={styles.aboutSection}>
      <h1 className="text-center">About</h1>
      <p className={styles.aboutUsContent}>
        To-Do List project is an application specially built to keep track of errands or tasks that need to be done.
        This application will be like a task keeper where the user would be able to enter the tasks that they need to
        do.The main purpose of a to do list is to provide yourself with a list of your priorities in order to ensure
        that you don't forget anything and are able to effectively plan out your tasks so that they are all accomplished
        in the correct time frame.
      </p>
    </div>
  );
}

export default About;
