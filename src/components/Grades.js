import React from 'react';
import baby from '../baby.png';
import baby2 from '../baby2.png';
import baby3 from '../baby3.png';
import baby4 from '../baby4.png';
import baby5 from '../baby5.png';
import baby6 from '../baby6.png';
import './Grades.css';

const grades = [
  {
    id: 'nursery',
    name: 'Nursery',
    age: '1 a 2 años',
    description: 'Introducción al entorno escolar, desarrollo de habilidades motoras y sociales básicas.',
    photo: baby,
  },
  {
    id: 'step',
    name: 'Step',
    age: '2 a 3 años',
    description: 'Fomento de la curiosidad, lenguaje básico y habilidades de interacción social.',
    photo: baby2,
  },
  {
    id: 'pre-kinder',
    name: 'Pre Kinder',
    age: '3 a 4 años',
    description: 'Desarrollo del pensamiento lógico, creatividad y habilidades de comunicación.',
    photo: baby3,
  },
  {
    id: 'kinder',
    name: 'Kinder',
    age: '4 a 5 años',
    description: 'Preparación para la educación primaria, habilidades básicas de lectura y matemáticas.',
    photo: baby4,
  },
  {
    id: 'transition',
    name: 'Transición',
    age: '5 a 6 años',
    description: 'Consolidación de conocimientos, desarrollo de autonomía y habilidades sociales avanzadas.',
    photo: baby5,
  },
  {
    id: 'Guarderia',
    name: 'Guarderia',
    age: '1 a 6 años',
    description: 'Espacio seguro y divertido para el desarrollo integral de los niños, fortaleciendo su autonomía, socialización y aprendizaje a través del juego.',
    photo: baby6,
  },
];

const Grades = () => {
  return (
    <section id="grades" className="gradesSection">
      <h2 className="gradesTitle">Nuestros Grados</h2>
      <div className="gradesGrid">
        {grades.map((grade, index) => (
          <div
            key={grade.id}
            className="gradeCard"
            style={{
              gridArea: `card${index + 1}`,
            }}
          >
            <div className="imageContainer">
              <img src={grade.photo} alt={grade.name} className="gradeImage" />
            </div>
            <div className="content">
              <h3 className="name">{grade.name}</h3>
              <p className="age"><strong>Edad:</strong> {grade.age}</p>
              <p className="description">{grade.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grades;
