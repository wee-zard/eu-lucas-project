export const ArrayUtils = {
  getListWithoutFirstElement<T> (list: T[]) {
    return list.filter((_, index) => index !== 0);
  }
};
