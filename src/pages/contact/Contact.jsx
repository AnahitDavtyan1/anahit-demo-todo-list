import { useRef } from "react";
import { Button } from "react-bootstrap";
import styles from "./contact.module.css";

function Contact() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  return (
    <div className={styles.fill}>
      <div>
        <h2 className={styles.contactPageTitle}>Contact Us</h2>
        <div className={styles.contactForm}>
          <label htmlFor="name" className={styles.label}>
            Full name*
          </label>
          <input
            type="text"
            id="name"
            className={styles.textInput}
            ref={nameRef}
          />
          <label htmlFor="email" className={styles.label}>
            Email*
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className={styles.textInput}
            ref={emailRef}
          />
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            className={styles.textInputs}
            rows={5}
            ref={messageRef}
          />
          <Button variant="success" className={styles.submit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
