import React, { useState } from 'react';
import './App.css';

function App() {
    const [numberType, setNumberType] = useState('p');
    const [result, setResult] = useState(null);

    const fetchNumbers = async () => {
      try {
          const response = await fetch(`http://localhost:9876/numbers/${numberType}`);
          const data = await response.json();
          console.log(data);  
      } catch (error) {
          console.error('Error fetching numbers:', error);
      }
  };
  

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <div className="input-group">
                <label>Choose Number Type:</label>
                <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
                    <option value="p">Prime</option>
                    <option value="f">Fibonacci</option>
                    <option value="e">Even</option>
                    <option value="r">Random</option>
                </select>
                <button onClick={fetchNumbers}>Fetch Numbers</button>
            </div>
            {result && (
                <div className="result">
                    <h2>Results:</h2>
                    <p><strong>Previous Window State:</strong> {JSON.stringify(result.windowPrevState)}</p>
                    <p><strong>Current Window State:</strong> {JSON.stringify(result.windowCurrState)}</p>
                    <p><strong>Numbers Fetched:</strong> {JSON.stringify(result.numbers)}</p>
                    <p><strong>Average:</strong> {result.avg}</p>
                </div>
            )}
        </div>
    );
}

export default App;
