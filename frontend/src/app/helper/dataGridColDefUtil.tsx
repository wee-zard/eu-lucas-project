import { emptyPlaceholder } from "@global/globalConsts";
import { GenericRowType } from "@model/types/GenericRowType";
import Tooltip from "@mui/material/Tooltip";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import DateHelper from "./dateHelper";
import StyledStackChip from "@components/StyledStackChip";

type RenderCellParamType<T> = GridRenderCellParams<GenericRowType<T>>;

function getFieldValue<T>(
  param: RenderCellParamType<T>,
  field: keyof T,
  isPlaceholderChecked: boolean = true,
): any {
  const data = (param.row as any)[field];
  return isPlaceholderChecked ? (data ?? emptyPlaceholder) : data;
}

export function renderTooltipTextCell<T>(
  param: RenderCellParamType<T>,
  field: keyof T,
): JSX.Element {
  const data = getFieldValue(param, field);
  return (
    <Tooltip title={data}>
      <div>{data}</div>
    </Tooltip>
  );
}

export function renderNormalTooltipTextCell(data: string): JSX.Element {
  return (
    <Tooltip title={data}>
      <div>{data}</div>
    </Tooltip>
  );
}

export function renderTextCell<T>(param: RenderCellParamType<T>, field: keyof T): JSX.Element {
  const data = getFieldValue(param, field);
  return <>{data}</>;
}

export function renderDateTimeCell<T>(param: RenderCellParamType<T>, field: keyof T): JSX.Element {
  const data = getFieldValue(param, field, false);
  return <>{data ? DateHelper.convertISOStringToDateTimeFormat(data) : emptyPlaceholder}</>;
}

export function renderChipCell<T>(
  param: RenderCellParamType<T>,
  field: keyof T,
  tooltipTitle: string,
): JSX.Element {
  const data = getFieldValue(param, field);
  return <StyledStackChip label={data} tooltip={{ title: tooltipTitle }} />;
}
