import React from 'react';
import './App.css';
import Layout from './layouts/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import videoBg from './assets/video.mp4';
import Footer from './shared/Footer';

function App() {
  return (
    <>
      <Layout>
        <div className="main">
          <div className="overlay"></div>
          <video playsInline  autoPlay loop muted id="myVideo">
            <source src={videoBg} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          <div className="content">
            <h1>Welcome</h1>
            <p>To Digitall Warehouse</p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
