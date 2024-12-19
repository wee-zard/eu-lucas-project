import React from "react";
//import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";

/*
 * React.memo:
 * (-) Nem szereti, ha van függvény props-ja. (pl. handleSend: () => void)
 * (+) Szereti, ha csak elemi adattagok vannak a props-ban.
 */

export const OtherworldlyGreeting = React.memo(function Greeting() {
  console.log(
    "Otherworldly Greeting was rendered at",
    new Date().toLocaleTimeString()
  );
  return <h3>Hello world! {new Date().toLocaleTimeString()}</h3>;
});
