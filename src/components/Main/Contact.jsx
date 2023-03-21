import React, { useState } from "react";
import "../../pages/Contact/ContactPage.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
/* TypedJs */
import Typical from "react-typical";

/* Multi idioma */
import { FormattedMessage } from "react-intl";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    fetch("https://formspree.io/f/mayknqjr", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error;
      });
      setName('');
      setEmail('');
      setMessage('');
      toast.success('Message sent successfully');
  };

  return (
    <section className="contactos" id="contactos">
        <ToastContainer theme="colored" position="bottom-center" />
      <h2 className="heading">
        <FormattedMessage id="contact" defaultMessage="Contact" />
      </h2>
      <h3 className="titulo" data-aos="fade-left" data-aos-delay="300">
        <FormattedMessage id="contact-info" defaultMessage="Contact me by: " />
        <Typical
          className="site-contacto"
          loop={Infinity}
          wrapper="b"
          steps={[
            "Gmail",
            1500,
            "Twitter",
            1500,
            "Linkedin",
            1500,
            "Github",
            1500,
          ]}
        />
      </h3>

      <div className="form-enclosure">
        <form className="form flex" onSubmit={handleSubmit}>
          <input
            className="input"
            name="name"
            value={name}
            type="text"
            placeholder="Type Your Name Here"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Please type your Email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="input-message"
            type="text"
            placeholder="Please Type Your Message"
            name="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button className="submit" type="submit">
            Send Message
          </button>
        </form>
      </div>

      <div className="icons">
        <a
          href="mailto:jerasterix@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          data-aos="zoom-in"
        >
          <div className="layer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="fab fas fa-envelope"></span>
          </div>
          <div className="text">Gmail</div>
        </a>
        <a
          href="https://twitter.com/JMelfah1"
          target="_blank"
          rel="noopener noreferrer"
          data-aos="zoom-in"
        >
          <div className="layer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="fab fa-twitter"></span>
          </div>
          <div className="text">Twitter</div>
        </a>
        <a
          href="https://www.linkedin.com/in/jeremiah-melfah/"
          target="_blank"
          rel="noopener noreferrer"
          data-aos="zoom-in"
        >
          <div className="layer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="fab fa-linkedin-in"></span>
          </div>
          <div className="text">Linkedin</div>
        </a>
        <a
          href="https://github.com/Jaymelfah"
          target="_blank"
          rel="noopener noreferrer"
          data-aos="zoom-in"
        >
          <div className="layer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="fab fa-github-square"></span>
          </div>
          <div className="text">GitHub</div>
        </a>
      </div>
    </section>
  );
};
export default React.memo(Contact);
