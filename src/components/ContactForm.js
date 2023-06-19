import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";
init(process.env.REACT_APP_PUBLIC_KEY);

const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const formMessage = document.querySelector(".form-message");

        emailjs
            .sendForm(
                "service_cpn3wso",
                "template_2322f5b",
                form.current,
                process.env.REACT_APP_PUBLIC_KEY
            )
            .then(
                (result) => {
                    console.log(result.text);
                    form.current.reset();
                    formMessage.innerHTML =
                        "<p className='success'>Message envoyé !</p>";
                    setTimeout(() => {
                        formMessage.innerHTML = "";
                    }, 2500);
                },
                (error) => {
                    console.log(error.text);
                    formMessage.innerHTML =
                        "<p className'error'>Une erreur c'est produite, veuillez réessayer</p>";
                    setTimeout(() => {
                        formMessage.innerHTML = "";
                    }, 2500);
                }
            );
    };

    return (
        <div className="form-container">
            <h2>contactez-nous</h2>
            <form ref={form} onSubmit={sendEmail} className="form-content">
                <label>nom</label>
                <input
                    type="text"
                    name="name"
                    required
                    autoComplete="off"
                    id="name"
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                    id="email"
                />
                <label>Message</label>
                <textarea name="message" id="mess" />
                <input type="submit" value="Envoyer" className="hover button" />
            </form>
            <div className="form-message"></div>
        </div>
    );
};

export default ContactForm;
