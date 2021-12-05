import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./style.scss";

export default function BasicSelect({ value, handleChange }) {
  return (
    <div className="select-wrapper">
      <Box sx={{ minWidth: 220 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={value}
            onChange={handleChange}
          >
            <MenuItem value={"popularity.desc"}>Popularity (A-Z)</MenuItem>
            <MenuItem value={"popularity.asc"}>Popularity (Z-A)</MenuItem>
            <MenuItem value={"release_date.desc"}>Year (Newest first)</MenuItem>
            <MenuItem value={"release_date.asc"}>Year (Oldest first)</MenuItem>
            <MenuItem value={"vote_average.desc"}>Vote (A-Z)</MenuItem>
            <MenuItem value={"vote_average.asc"}>Vote (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
