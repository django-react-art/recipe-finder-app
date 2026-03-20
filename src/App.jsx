import { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import {
  Grid,
  CircularProgress,
  Box,
  Modal,
  Typography,
  Container,
} from "@mui/material";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );
      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();

      setSelectedRecipe(data.meals[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Recipe Finder 🍳
      </Typography>

      <SearchBar onSearch={fetchRecipes} />

      {/* ✅ Spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* ✅ Recipe Grid */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.idMeal} xs={12} sm={6} md={4}>
            <RecipeCard
              recipe={recipe}
              onSelect={handleSelectRecipe}
            />
          </Grid>
        ))}
      </Grid>

      {/* ✅ Modal */}
      <Modal
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      >
        <Box sx={modalStyle}>
          {selectedRecipe && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedRecipe.strMeal}
              </Typography>

              <img
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                width="100%"
                style={{ borderRadius: "8px" }}
              />

              <Typography sx={{ mt: 2 }}>
                {selectedRecipe.strInstructions}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default App;