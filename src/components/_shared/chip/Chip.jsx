import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./style.scss";

export default function BasicChips({ onClick, id, label, activeGenre }) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className="chip-item">
      <Stack direction="row" spacing={1}>
        <Chip
          color={activeGenre ? "success" : "primary"}
          label={label}
          onClick={handleClick}
        />
      </Stack>
    </div>
  );
}
