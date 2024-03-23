import './App.css';

import React, {useEffect} from 'react';
import axios from 'axios';

import Map from './Map'

function App() {

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
