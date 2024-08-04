import React, { useState } from 'react';
import {TextField, Box, Select, MenuItem, FormControl, InputLabel, Button, Typography, Container } from '@mui/material';
import './App.css';

function App() {
  const [productType, setProductType] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [skinConcerns, setSkinConcerns] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  async function callBackendAPI() {
    console.log("Calling the backend API");

    const apiResponse = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productType, ingredients, skinConcerns })
    });

    const data = await apiResponse.json();
    setResponse(data.response);
  }

return (
    <Container maxWidth='xl'>
      <Box sx={{ height: '100', paddingLeft: 55 }}>
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel id="product-type-label">Product Type</InputLabel>
          <Select
            labelId="product-type-label"
            id="product-type"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            label="Product Type"
          >
           
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Skin Concerns"
          variant="outlined"
          margin="normal"
          value={skinConcerns}
          onChange={(e) => setSkinConcerns(e.target.value)}
        />
        <TextField
            fullWidth
            multiline
            minRows={8}
            label="Ingredients"
            variant="outlined"
            margin="normal"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)} />
          <Button
            variant='contained'
            fullWidth
            onClick={callBackendAPI}
            sx={{ mt: 10 }}
          >
            Analyze
          </Button>
          {response && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {response}
            </Typography>
          )}
        </Box>
      </Container>
  );
}

export default App;