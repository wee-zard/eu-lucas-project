import { RefEnum } from "@model/enum/RefEnum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { MutableRefObject } from "react";

const currentRefValueExtractorHandler: GenericHandlerType<RefEnum, any> = {
  [RefEnum.CHECKBOX]: (ref: MutableRefObject<HTMLButtonElement | null>) =>
    (ref.current?.firstChild as any)?.checked,
};

const currentRefValueSetterHandler: GenericHandlerType<
  RefEnum,
  (ref: MutableRefObject<any>, value: any) => void
> = {
  [RefEnum.CHECKBOX]: (ref: MutableRefObject<HTMLButtonElement | null>, value: boolean) => {
    (((ref.current as any).firstChild as any).checked as any) = value;
  },
};

export const extractCurrentGenericRefValue = <T>(key: RefEnum, ref: MutableRefObject<T>) => {
  return currentRefValueExtractorHandler[key](ref);
};

export const setCurrentGenericRefValue = <T>(
  key: RefEnum,
  ref: MutableRefObject<T>,
  value: any,
) => {
  currentRefValueSetterHandler[key](ref, value);
};
