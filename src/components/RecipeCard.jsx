import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const RecipeCard = ({ recipe, onSelect }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        cursor: "pointer",
        transition: "0.3s",
          borderRadius: 3,
          overflow: "hidden",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6
        },
        "& img": {
          transition: "0.3s",
        },
        "&:hover img": {
          transform: "scale(1.1)"

        }
      }}
      onClick={() => onSelect(recipe.idMeal)}
    >
      <CardMedia
        component="img"
        height="180"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <CardContent>
        <Typography variant="h6">
          {recipe.strMeal}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;