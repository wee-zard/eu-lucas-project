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

export type ScrollBarProps = {
  width: string,
}

export const customScrollBar = (obj?: ScrollBarProps) => ({
  '::-webkit-scrollbar': {
    width: obj?.width ?? '5px',
  },
  '::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 50, 0.35)',
    borderRadius: "12px",
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    outline: '1px solid gray',
    borderRadius: "12px",
  }
});

export const StyledScrollBarHolder = styled.div<{}>((props) => ({
  overflow: "auto",
  overflowX: "hidden",
  ...customScrollBar(),
}));
