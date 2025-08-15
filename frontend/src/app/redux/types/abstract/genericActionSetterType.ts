import GenericConstMapper from "./genericConstMapper";

// FIXME: Not fixed yet!
type GenericActionSetterType<K extends { [k in string]: K }, T, L extends keyof T> = {
  [k in L]: {
    type: GenericConstMapper<K, ImageActionSetterConsts>;
    payload: T[k];
  };
};

export default GenericActionSetterType;
