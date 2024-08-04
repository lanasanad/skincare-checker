import React, { useState } from 'react';
import { TextField, Box, Autocomplete, Button, Typography, Container } from '@mui/material';
import './App.css';

function App() {
  const [productType, setProductType] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string>("");
  const [skinConcerns, setSkinConcerns] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const productTypes = [
    "Face Wash", "Cleanser", "Cleansing Balm", "Cleansing Oil","Foaming Cleanser","Oil Cleanser", "Gel Cleanser","Eye Cream", "Moisturizer", "Night Cream",
    "Tinted Moisturizer","Lip Balm", "Lip Mask", "Lip Oil","Chemical Exfoliator", "Peel", "Physical Exfoliator / Scrub","Mask","Clay Mask", 
    "Sheet Mask", "Sleeping Mask","Makeup Remover", "Micellar Water", "Face Mist", "Face Oil", "Serum", "Toner","Spot Treatment","Sunscreen"
  ];

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
    <><Typography
      variant="h4"
      component="h1"
      gutterBottom
      sx={{
        fontFamily: 'sans-serif',
        fontSize: '400%',
        color: '#284178', 
        marginLeft: '350px', 
        fontWeight: 'bold', 
      }}
    >
      Skincare Product Analyzer
    </Typography><Container>
        <Box sx={{ marginLeft: 45, marginTop: 10 }}>
          <Autocomplete
            value={productType}
            onChange={(event, newValue) => setProductType(newValue)}
            options={productTypes}
            renderInput={(params) => (
              <TextField {...params} label="Product Type" variant="outlined" margin="dense" />
            )}
            ListboxProps={{ style: { maxHeight: '200px' } }} // Set the max height for scroll
          />
          <TextField
            fullWidth
            label="Skin Concerns"
            variant="outlined"
            margin="normal"
            sx={{ width: '800px' }}
            value={skinConcerns}
            onChange={(e) => setSkinConcerns(e.target.value)} />
          <TextField
            fullWidth
            multiline
            minRows={8}
            label="Ingredients"
            variant="outlined"
            margin="normal"
            sx={{ width: '800px' }}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)} />
          <Button
            variant='contained'
            fullWidth
            onClick={callBackendAPI}
            sx={{ mt: 10, width: '400px', marginLeft: "180px" }}
          >
            Analyze
          </Button>
          {response && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {response}
            </Typography>
          )}
        </Box>
      </Container></>
    
  );
}

export default App;