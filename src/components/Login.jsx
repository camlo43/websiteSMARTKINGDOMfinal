import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../SmartKingdomfinal.png';
import './Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info and token in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          nombre: data.nombre,
          rol_id: data.rol_id,
          token: data.token
        }));

        // Redirect based on role
        if (data.rol_id === 1) {
          navigate('/admin');
        } else if (data.rol_id === 2) {
          navigate('/docente');
        } else if (data.rol_id === 3) {
          navigate('/padre');
        } else {
          alert('Rol no autorizado');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
      console.error('Error:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="loginBackground">
      <div className="loginPanel">
        <img src={logo} alt="Smart Kingdom Logo" className="loginLogo" />
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <FaUser className="inputIcon" />
            <input
              type="email"
              placeholder="Correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup passwordGroup">
            <FaLock className="inputIcon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              name="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <span className="passwordToggle" onClick={toggleShowPassword} tabIndex={0} role="button" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleShowPassword(); }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="loginButton">Iniciar sesión</button>
          <div className="forgotPassword">
            <a href="#" tabIndex={0}>¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
