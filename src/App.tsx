import React, { useState } from 'react';
import { TextField, Box, Autocomplete, Button, Typography, Container, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, Rating, ThemeProvider} from '@mui/material';
import './App.css';
import StarIcon from '@mui/icons-material/Star';
import backgroundImage from './assets/spill1.jpg'; // Correct import for assets folder

const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Light purple
      dark: '#C8A2C8', // Darker purple for hover
    },
  },
});

function App() {
  const [productType, setProductType] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string>("");
  const [skinConcerns, setSkinConcerns] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const productTypes = [
    "Cleanser", "Cleansing Balm", "Cleansing Oil", "Cream Cleanser", "Face Wash", "Foaming Cleanser", "Gel Cleanser", "Oil Cleanser", "Chemical Exfoliator", "Peel", "Physical Exfoliator / Scrub", "Charcoal Mask", "Clay Mask", "Detox Mask", "Mask", "Mud Mask", "Sheet Mask", "Sleeping Mask", "Under eye Mask", "Face Mist", "Day Cream", "Eye Cream", "Face Cream", "Gel cream", "Hand Cream", "Intensive Moisturizer", "Lip Balm", "Lip Mask", "Lip Oil", "Lip Scrub", 
    "Face Moisturizer", "Night Cream", "Tinted Moisturizer", "Face Oil", "Squalane", "AHA (Alpha Hydroxy Acid) Serum", "Antioxidant Serum", "Azelaic Acid", "BHA (Beta Hydroxy Acid) Serum", "Brightening Serum", "Collagen Serum", 
    "Cooling Gel", "EGF (Epidermal Growth Factor) Serum", "Glycolic Acid", "Hyaluronic Acid Serum", "Niacinamide Serum", "Peptide Serum", "PHA (Polyhydroxy Acid) Serum", "Probiotic Serum", "Quercetin Serum", "Retinol", "Rosehip Oil", "Serum",
    "Vitamin C Serum", "Vitamin E Oil", "Sunscreen", "Acne Spot Treatment", "Pore Minimizer", "Spot Treatment", "Body Butter", "Body Lotion", "Body Oil", "Body Scrub", "Body Moisturizer", "Calamine Lotion", "Makeup Remover", "Micellar Water", "Face Balm", "Toner", "Witch Hazel Toner"
  ];

  async function callBackendAPI() {
    setIsLoading(true);
  
    try {
      const apiResponse = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productType, ingredients, skinConcerns })
      });
  
      if (!apiResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await apiResponse.json();
      setResponse(data.response);
      setRating(data.rating); // Set the rating from the API response
    } catch (error) {
      console.error('Error:', error);
      setResponse("An error occurred while analyzing.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(true); // Open the dialog after the response is fetched
    }
  }
  
  function handleRefresh() {
    setProductType(null);
    setIngredients("");
    setSkinConcerns("");
    setResponse("");
    setRating(null); // Clear the rating
    setIsModalOpen(false);
  }

  return (
    <div
      style={{
        background: `url(${backgroundImage}) repeat-x center center fixed`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw", // Cover the full viewport width
        minHeight: "100vh", // Cover the full viewport height
        overflow: "hidden", // Ensure no scrollbars appear if content overflows
      }}
    >
      <ThemeProvider theme={theme}>
        <div>
          <Typography
            marginTop="75px"
            className="glow-text"
            gutterBottom
            fontSize="650%"
            fontFamily="initial"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            GLOW AI
          </Typography>
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Autocomplete
                  value={productType}
                  onChange={(event, newValue) => setProductType(newValue)}
                  onInputChange={(event, newInputValue) =>
                    setProductType(newInputValue)
                  }
                  options={productTypes}
                  sx={{
                    width: "390px", // Smaller width for product type
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderWidth: "3px" },
                      "&:hover fieldset": { borderWidth: "3px" },
                      "&.Mui-focused fieldset": { borderWidth: "3px" },
                    },
                    margin: "normal", // Ensure same margin as TextField
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Type"
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  label="Skin Concerns"
                  variant="outlined"
                  margin="normal" // Ensure same margin as Autocomplete
                  sx={{
                    width: "390px", // Larger width for skin concerns
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderWidth: "3px" },
                      "&:hover fieldset": { borderWidth: "3px" },
                      "&.Mui-focused fieldset": { borderWidth: "3px" },
                    },
                  }}
                  value={skinConcerns}
                  onChange={(e) => setSkinConcerns(e.target.value)}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                minRows={8}
                label="Ingredients"
                variant="outlined"
                margin="normal"
                sx={{
                  width: "800px", // Same width as the combined length of the product type and skin concerns fields
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderWidth: "3px" },
                    "&:hover fieldset": { borderWidth: "3px" },
                    "&.Mui-focused fieldset": { borderWidth: "3px" },
                  },
                }}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  height: "70px",
                  fontSize: "26px",
                  padding: "4px 8px",
                  mt: 10,
                  width: "300px",
                  textTransform: "lowercase",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderWidth: "2px" },
                    "&:hover fieldset": { borderWidth: "2px" },
                    "&.Mui-focused fieldset": { borderWidth: "2px" },
                  },
                }}
                onClick={callBackendAPI}
                disabled={isLoading}
                className="analyze-button"
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "analyze"
                )}
              </Button>
            </Box>
          </Container>
        </div>
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          classes={{ paper: "custom-dialog" }}
        >
          <DialogTitle className="custom-dialog-title">
            Analysis Result
          </DialogTitle>
          <DialogContent className="custom-dialog-content">
            <Typography>{response}</Typography>
            <Rating
              name="product-rating"
              value={rating}
              max={5}
              readOnly
              precision={0.5}
              icon={<StarIcon style={{ color: "#D8BFD8" }} />}
              emptyIcon={<StarIcon style={{ color: "#C8A2C8" }} />}
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "#C8A2C8",
                },
                "& .MuiRating-iconFilled": {
                  color: "#D8BFD8",
                },
                direction: "rtl", // This reverses the order of the stars
              }}
            />
          </DialogContent>
          <DialogActions className="custom-dialog-actions">
            <Button onClick={() => setIsModalOpen(false)} color="primary">
              Close
            </Button>
            <Button onClick={handleRefresh} color="primary">
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default App;