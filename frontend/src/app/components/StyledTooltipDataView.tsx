import {
  StyledProcedurePropertyHolder,
  StyledProcedurePropertyTitleHolder,
  StyledProcedurePropertyValueHolder,
} from "@dialogs/boundBoxDialog/timeline/BoundingBoxDialogLogDetails";
import { emptyPlaceholder } from "@global/globalConsts";
import { customScrollBar, StyledScrollBarHolder } from "@global/globalStyles";
import ExifDataDto from "@model/dto/ExifDataDto";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  title?: string;
  propertyMap: ExifDataDto[];
};

const StyledTooltipDataView = ({ title, propertyMap }: Props) => {
  return (
    <div>
      {title && <Typography>{title}</Typography>}
      <br />
      <StyledTooltipDataWrapper>
        {propertyMap.map((property, index) => (
          <StyledProcedurePropertyHolder className="tooltipDataRow" key={`${property}-${index}`}>
            <StyledProcedurePropertyTitleHolder>
              {property.exifKey}:
            </StyledProcedurePropertyTitleHolder>
            <StyledProcedurePropertyValueHolder>
              {property.exifValue ?? emptyPlaceholder}
            </StyledProcedurePropertyValueHolder>
          </StyledProcedurePropertyHolder>
        ))}
      </StyledTooltipDataWrapper>
    </div>
  );
};

export default StyledTooltipDataView;

const StyledTooltipDataWrapper = styled(StyledScrollBarHolder)({
  display: "grid",
  gap: 8,
  height: 300,
  ...customScrollBar(),
});
