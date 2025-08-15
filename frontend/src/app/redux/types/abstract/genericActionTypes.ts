type GenericActionTypes<T extends { [k in string]: any }> = T[keyof T];

export default GenericActionTypes;
