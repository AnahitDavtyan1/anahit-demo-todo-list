import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import FormApi from "../../api/formApi";
import { toast } from "react-toastify";
import styles from "./contact.module.css";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();

function Contact() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [nameErrorMessage, setNameErrorMessage] = useState(null);

  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;
    if (!name) {
      setNameErrorMessage("Name is required!");
    } else {
      setNameErrorMessage(null);
    }

    if (!email) {
      setEmailErrorMessage("Email address is required!");
      return;
    }
    setEmailErrorMessage(null);

    if (!emailRegex.test(email)) {
      setEmailErrorMessage("Email address is not valid!");
      return;
    }
    setEmailErrorMessage(null);
    if (nameErrorMessage) {
      return;
    }
    const form = {
      name,
      email,
      message,
    };
    try {
      await formApi.sendForm(form);
      toast.success("Thank you for contacting us, the form has been sent!");
      nameRef.current.value = "";
      messageRef.current.value = "";
      emailRef.current.value = "";
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.fill}>
      <div>
        <h2 className={styles.contactPageTitle}>
          We'd Love to hear From You !
        </h2>
        <div className={styles.contactForm}>
          <label htmlFor="name" className={styles.label}>
            Full name*
          </label>
          <input
            type="text"
            id="name"
            className={`${styles.textInput} ${
              nameErrorMessage ? styles.invalid : ""
            }`}
            ref={nameRef}
          />
          <label htmlFor="email" className={styles.label}>
            Email*
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className={`${styles.textInput} ${
              emailErrorMessage ? styles.invalid : ""
            }`}
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
          <Button
            variant="success"
            className={styles.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {nameErrorMessage && (
            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
              {nameErrorMessage}
            </h5>
          )}
          {emailErrorMessage && (
            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
              {emailErrorMessage}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
