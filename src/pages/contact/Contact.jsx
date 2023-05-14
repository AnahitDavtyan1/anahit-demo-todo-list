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
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    const isEmailInvalid = !emailRegex.test(email);
    const hasSomeError = !name || !email || isEmailInvalid;

    if (hasSomeError) {
      let nameError = "";
      let emailError = "";
      if (!name) {
        nameError = "Name is required!";
      }
      if (!email || isEmailInvalid) {
        emailError = !email ? "Email is required!" : "Email address is not valid!";
      }
      setErrorMessages({
        name: nameError,
        email: emailError,
      });
      return;
    } else {
      setErrorMessages({
        name: "",
        email: "",
      });
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

  console.log(errorMessages);

  return (
    <div className={styles.fill}>
      <div>
        <h2 className={styles.contactPageTitle}>We'd Love to hear From You !</h2>
        <div className={styles.contactForm}>
          <label htmlFor="name" className={styles.label}>
            Full name*
          </label>
          <input
            type="text"
            id="name"
            className={`${styles.textInput} ${errorMessages.name ? styles.invalid : ""}`}
            ref={nameRef}
          />
          {errorMessages.name && <span className={styles.errorMessage}>{errorMessages.name}</span>}
          <label htmlFor="email" className={styles.label}>
            Email*
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className={`${styles.textInput} ${errorMessages.email ? styles.invalid : ""}`}
            ref={emailRef}
          />
          {errorMessages.email && (
            <span span className={styles.errorMessage}>
              {errorMessages.email}
            </span>
          )}
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea id="message" className={styles.textInputs} rows={5} ref={messageRef} />
          <Button variant="success" className={styles.submit} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
