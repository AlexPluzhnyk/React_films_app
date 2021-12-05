import React from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./style.scss";

const ButtonCustom = ({ name, ...rest }) => {
  return (
    <div className="button-item">
      <Stack spacing={3} direction="row">
        <Button {...rest} variant="contained">
          {name}
        </Button>
      </Stack>
    </div>
  );
};

export default ButtonCustom;
