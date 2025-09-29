type CacheKeyType = string | number;

type CacheStorageEntryType = {
  entry: string[];
};

export type CacheStorageType = {
  [k in CacheKeyType]: CacheStorageEntryType;
};
