import styled from "@emotion/styled";

export const StyledComponentGap = styled.div<({display?: string, gap?: string})>((props) => ({
    display: props.display ?? "flex", 
    gap: props.gap ?? "16px",
}));

export const StyledFullWidthAndHeight = () => ({
    width: "100%",
    height: "100%",
});