import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../SmartKingdomfinal.png';
import './Login.css';

const Login = () => {
  return (
    <div className="loginBackground">
      <div className="loginPanel">
        <img src={logo} alt="Smart Kingdom Logo" className="loginLogo" />
        <form className="loginForm" onSubmit={e => e.preventDefault()}>
          <div className="inputGroup">
            <FaUser className="inputIcon" />
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              required
              autoComplete="username"
            />
          </div>
          <div className="inputGroup">
            <FaLock className="inputIcon" />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              required
              autoComplete="current-password"
            />
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
