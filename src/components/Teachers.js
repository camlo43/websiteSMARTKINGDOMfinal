import React from 'react';
import profesora from '../profesora.jpg';
import './Teachers.css';

const teacher = {
  image: profesora,
  description: 'Nuestro equipo docente está formado por profesionales calificados y dedicados, comprometidos con el desarrollo integral de cada niño.',
};

const Teachers = () => {
  return (
    <section id="teachers" className="teachersSection">
      <h2 className="teachersTitle">Docentes</h2>
      <div className="teachersContainer">
        <img src={teacher.image} alt="Foto de la profesora del preescolar Smart Kingdom" className="teacherImage" />
        <p className="teacherDescription">{teacher.description}</p>
      </div>
    </section>
  );
};

export default Teachers;
