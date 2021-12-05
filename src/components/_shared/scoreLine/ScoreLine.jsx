import React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { throttle } from "throttle-debounce";

import "./style.scss";

const ScoreLine = ({ from, to, handleChange }) => {
  const handleScoreChange = throttle(300, (_, value) => {
    handleChange(value);
  })

  return (
    <div className="score-wrapper">
      <Box sx={{ width: 250 }}>
        <Slider
          value={[from, to]}
          onChange={handleScoreChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          marks
        />
      </Box>
    </div>
  );
};

export default ScoreLine;
