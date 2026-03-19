import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    setQuery("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 4 }}
    >
      <TextField
        fullWidth
        label="Search by ingredient (e.g. chicken)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;