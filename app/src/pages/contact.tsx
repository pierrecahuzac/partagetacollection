import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/contact.scss";

const Contact = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sendEmail = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post(`${baseURL}/mail`, {
                to: 'admin@partagetacollection.eu',
                from: "admin@partagetacollection.eu",
                subject: formData.subject || "Contact depuis le site",
                text: formData.message,
                html: `
                    <div>
                        <h3>Nouveau message de contact</h3>
                        <p><strong>Nom:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Sujet:</strong> ${formData.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${formData.message}</p>
                    </div>
                `,
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            
            alert("Message envoyé avec succès !");
            setFormData({ name: '', email: '', subject: '', message: '' });
            
        } catch (error) {
            console.log(error);
            alert("Erreur lors de l'envoi du message");
        }
    }

    return (
        <div className="contact-page">
            <div className="contact-container">
                <h1>Contact</h1>
                <form onSubmit={sendEmail} className="contact__form">
                    <div className="form-group">
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Sujet:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            //@ts-ignore
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    
                    <button type="submit">Envoyer</button>
                </form>
                
                <Link to="/" className="back-link">Retour à l'accueil</Link>
            </div>
        </div>
    )
}

export default Contact
