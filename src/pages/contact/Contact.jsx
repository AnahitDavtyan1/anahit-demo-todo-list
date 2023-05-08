import { useRef, useState } from "react";

function Contact() {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1 className="text-center">Contact us page</h1>
      Name Surname <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default Contact;
