import styled from "@emotion/styled";

export const StyledComponentGap = styled.div<{
  display?: string;
  gap?: string;
}>((props) => ({
  display: props.display ?? "flex",
  gap: props.gap ?? "16px",
}));

export const StyledFullWidthAndHeight = () => ({
  width: "100%",
  height: "100%",
});

export const windowBorders = () => {
  return {
    /** FIXME: Make this color to be visible and cool on light & dark mode */
    backgroundColor: "rgba(71, 128, 255, 0.125)",
    borderRadius: "16px",
    padding: "16px",
  };
};

/**
 * TODO: Implement a custom scrollbar and add that bar to different components.
 * https://www.geeksforgeeks.org/how-to-create-a-custom-scrollbar-using-css/ 
 * https://stackoverflow.com/questions/53772429/material-ui-how-can-i-style-the-scrollbar-with-css-in-js 
 */
