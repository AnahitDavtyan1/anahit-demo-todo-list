import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import FormApi from "../../api/formApi";
import { toast } from "react-toastify";
import styles from "./contact.module.css";
import { setLoader } from "../../redux/reducers/loaderSlice";
import { useDispatch } from "react-redux";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();

function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    message: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    const isEmailInvalid = !emailRegex.test(email);
    const hasSomeError = !name || !email || !message || isEmailInvalid;
    if (hasSomeError) {
      let nameError = "";
      let emailError = "";
      let messageError = "";
      if (!name) {
        nameError = "Name is required!";
      }
      if (!email || isEmailInvalid) {
        emailError = !email ? "Email is required!" : "Email address is not valid!";
      }
      if (!message) {
        messageError = "Message is required";

        setErrorMessages({
          name: nameError,
          email: emailError,
          message: messageError,
        });
        return;
      } else {
        setErrorMessages({
          name: "",
          email: "",
          message: "",
        });
      }
    }

    const form = {
      name,
      email,
      message,
    };
    try {
      dispatch(setLoader(true));
      await formApi.sendForm(form);
      setErrorMessages({
        name: "",
        email: "",
        message: "",
      });
      toast.success("Thank you for contacting us, the form has been sent!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoader(false));
    }
  };
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
            Message*
          </label>
          <textarea
            id="message"
            className={`${styles.textInput} ${errorMessages.message ? styles.invalid : ""}`}
            rows={5}
            ref={messageRef}
          />
          {errorMessages.message && <span className={styles.errorMessage}>{errorMessages.message}</span>}
          <Button variant="success" className={styles.submit} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
