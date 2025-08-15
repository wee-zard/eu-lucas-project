// FIXME: Not fixed yet!
type GenericConstMapper<T extends { [k in string]: T }, K extends keyof T> = T[K];

export default GenericConstMapper;
