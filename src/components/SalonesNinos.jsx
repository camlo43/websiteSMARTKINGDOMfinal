import React, { useEffect, useState } from 'react';

const SalonesNinos = () => {
  const [salones, setSalones] = useState([]);
  const [ninosConSalones, setNinosConSalones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No access token found. Please log in.');
      console.error('No access token found. Please log in.');
      return;
    }

    const fetchWithAuth = (url, setData, errorMessage) => {
      fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error('Unauthorized access. Please log in again.');
            }
            throw new Error(errorMessage + ': ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(`${url} response:`, data);
          setData(data);
        })
        .catch(err => {
          setError(err.message);
          console.error(err.message);
        });
    };

    fetchWithAuth('http://localhost:3001/salones', setSalones, 'Error fetching salones');
    fetchWithAuth('http://localhost:3001/estudiantes/conSalones', setNinosConSalones, 'Error fetching niños con salones');
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Salones</h2>
      <ul>
        {salones.map((salon, index) => (
          <li key={index}>{salon.name}</li>
        ))}
      </ul>

      <h2>Niños con Salones</h2>
      <ul>
        {ninosConSalones.map((item, index) => (
          <li key={index}>{item.estudiante} - {item.salon}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalonesNinos;
