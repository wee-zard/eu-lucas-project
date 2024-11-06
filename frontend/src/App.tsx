import React, { StrictMode } from 'react';
import './App.css';
import TmpScreen from './app/screen/TmpScreen';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <StrictMode>
          <TmpScreen />
        </StrictMode>
      </header>
    </div>
  );
}

export default App;
