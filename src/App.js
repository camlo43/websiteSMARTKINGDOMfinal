import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import VisionMission from './components/VisionMission';
import Grades from './components/Grades';
import PhotoCarousel from './components/PhotoCarousel';
import Services from './components/Services';
import Teachers from './components/Teachers';
import Testimonials from './components/Testimonials';
import EnrollmentForm from './components/EnrollmentForm';
import './components/EnrollmentForm.css';
import Schedule from './components/Schedule';
import Login from './components/Login';

function Home() {
  return (
    <>
      <VisionMission />
      <Grades />
      <PhotoCarousel />
      <Services />
      <Teachers />
      <Testimonials />
      <EnrollmentForm />
      <Schedule />
      <Map />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
