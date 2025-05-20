import React, { useState } from 'react';
import './EnrollmentForm.css';
import emailjs from 'emailjs-com';

// Inicializa EmailJS con tu user ID
emailjs.init("efUaB7iO_6MMMcDAc");

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'El correo electrónico no es válido';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Cambiamos 'email' por 'contact' para que coincida con tu plantilla
      emailjs.send("service_7xsas9l", "template_k0kacub", {
        name: formData.name,
        contact: formData.email // 👈 CORRECTO: este es el que usa la plantilla
      })
      .then(() => {
        alert('Correo enviado correctamente');
        setSubmitted(true);
      }, (error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo');
      });
    }
  };

  if (submitted) {
    return (
      <section id="inscripcion" className="enrollmentFormSection">
        <h2>Mas informacion</h2>
        <p>Gracias por escribirnos. Nos pondremos en contacto contigo pronto.</p>
      </section>
    );
  }

  return (
    <section id="inscripcion" className="enrollmentFormSection">
      <h2>Mas informacion.</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="nameError"
            required
          />
          {errors.name && <span id="nameError" className="error">{errors.name}</span>}
        </div>
        <div className="formGroup">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailError"
            required
          />
          {errors.email && <span id="emailError" className="error">{errors.email}</span>}
        </div>
        <button type="submit" className="submitButton">Enviar</button>
      </form>
    </section>
  );
};

export default EnrollmentForm;
