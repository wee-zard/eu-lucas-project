import React from "react";

type Props = {
  //namedId?: number;
};

export const OtherworldlyGreeting = React.memo(function Greeting({}: Props) {
  console.log(
    "Otherworldly Greeting was rendered at",
    new Date().toLocaleTimeString()
  );
  return <h3>Hello world! {new Date().toLocaleTimeString()}</h3>;
});
