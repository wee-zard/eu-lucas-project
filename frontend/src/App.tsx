import React, { useEffect } from 'react';
import logo from './media/logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const fetchData = async () => {
    const obj = { title: 'React POST Request Example', hash: 'ww31d' };

    //========================================================

    axios.get(
      "http://localhost:3001/fetch-single-image", //Endpoint to send files
      { params: {
        ID: 123,
        KEY: 1222
      } }, // Attaching the form data
    ).then((res) => {

    })  // Handle the response from backend here
    .catch((err) => {

    }); // Catch errors if any

    //========================================================

    axios.post(
      "http://localhost:3001/image", //Endpoint to send files
      obj, // Attaching the form data
    ).then((res) => {

    })  // Handle the response from backend here
    .catch((err) => {

    }); // Catch errors if any

    //========================================================
  }

  useEffect(() => {
    fetchData();
  }, []);

  // eslint-disable-next-line no-useless-escape
  const path = "file:///C:/Users/veelm/Downloads/logo.png";

  const imagePath = [
    "https://gisco-services.ec.europa.eu/lucas/photos/2006/BE/380/231/38023110C.jpg"
  ];

  const valami = imagePath.map((image, key) => 
    <div key={key}>
      <img src={image} alt="logo2" />
    </div>
  )



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {valami}
        
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
