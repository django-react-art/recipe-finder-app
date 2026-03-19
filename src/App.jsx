import { Container, Typography } from "@mui/material";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import { Grid } from "@mui/material";
import { CircularProgress, Box } from "@mui/material";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async (query) => {
  try {
    setLoading(true); // start loading

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
    );
    const data = await response.json();

    setRecipes(data.meals || []);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    setLoading(false); // stop loading
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

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Recipe Finder 🍳
      </Typography>

      <SearchBar onSearch={fetchRecipes} />

      {recipes.length > 0 && (
        <Typography variant="body1">
          {loading && (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
    <CircularProgress />
  </Box>
)}
          <Grid container spacing={3}>
  {recipes.map((recipe) => (
    <Grid item key={recipe.idMeal} xs={12} sm={6} md={4}>
      <RecipeCard recipe={recipe} onSelect={handleSelectRecipe}/>
    </Grid>
  ))}
</Grid>
{selectedRecipe && (
  <Box sx={{ mt: 5 }}>
    <Typography variant="h4" gutterBottom>
      {selectedRecipe.strMeal}
    </Typography>

    <img
      src={selectedRecipe.strMealThumb}
      alt={selectedRecipe.strMeal}
      width="300"
    />

    <Typography sx={{ mt: 2 }}>
      {selectedRecipe.strInstructions}
    </Typography>
  </Box>
)}
        </Typography>
      )}
    </Container>
  );
}

export default App;