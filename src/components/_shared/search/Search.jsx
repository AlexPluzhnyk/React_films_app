import React from "react";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./style.scss";

const Search = ({ value, handleChange, onSearch }) => {
  const handlerChange = ({ target: { value } }) => {
    handleChange(value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const handlerClick = () => {
    onSearch();
  };

  return (
    <div className="search-wrapper">
      {
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search "
            value={value}
            onChange={handlerChange}
            onKeyUp={handleKeyUp}
          />
          <IconButton
            onClick={handlerClick}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      }
    </div>
  );
};

export default Search;
