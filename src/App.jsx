
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
  }

}

export default App;