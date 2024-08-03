
import { useState } from 'react';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState("");
  const [skinConcerns, setSkinConcerns] = useState("");
  const [response, setResponse] = useState("");

  async function callBackendAPI() {
    console.log("Calling the backend API");

    const apiResponse = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients, skinConcerns })
    });

    const data = await apiResponse.json();
    setResponse(data.response);
    
    return (
      <div className="App">
        <div>
          <textarea
            onChange={(e) => setIngredients(e.target.value)}
            placeholder='Paste the ingredients list'
            cols={90}
            rows={10}
          />
        </div>
        <div>
          <textarea
            onChange={(e) => setSkinConcerns(e.target.value)}
            placeholder='Describe your skin concerns'
            cols={90}
            rows={10}
          />
        </div>
        <div>
          <button onClick={callBackendAPI}>Analyze this product</button>
          {response !== "" ?
            <div>
              <h3>AI Response:</h3>
              <p>{response}</p>
            </div>  
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default App;