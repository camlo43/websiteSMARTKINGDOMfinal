import React from 'react';
import aire from '../aire.png';
import classroom from '../classroom.png';
import camara from '../camara.png';
import playarea from '../playarea.png';
import './Services.css';

const services = [
  {
    id: 'SALONES DE ALTA CALIDAD',
    image: classroom,
    description: 'SALONES DE ALTA CALIDAD: Espacios creativos y seguros donde los niños fortalecen su autonomía y se preparan para la primaria a través del juego y el aprendizaje activo.',
  },
  {
    id: 'AREA DE JUEGOS',
    image: playarea,
    description: 'AREA DE JUEGOS: Un lugar lleno de color, diversi  ón y juguetes donde los niños exploran, socializan y desarrollan su imaginación.',
  },
  {
    id: 'AIRE ACONDICIONADO',
    image: aire,
    description: 'SALONES CLIMATIZADOS: Ambientes frescos y cómodos, ideales para el aprendizaje y bienestar de los niños.',
  },
  {
    id: 'CAMARAS',
    image: camara,
    description: 'SISTEMA DE CAMARAS: Contamos con vigilancia en tiempo real para garantizar la seguridad de los niños y la tranquilidad de los padres.',
  },
];

const Services = () => {
  return (
    <section id="services" className="servicesSection">
      <h2 className="servicesTitle">Servicios</h2>
      <div className="servicesContainer">
        {services.map((service) => (
          <div key={service.id} className="serviceItem">
            <div className="serviceImageContainer">
              <img src={service.image} alt={`Imagen representativa de ${service.id}`} className="serviceImage" />
            </div>
            <p className="serviceDescription">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
