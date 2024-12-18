export const mergeUniqueSymbols = (defaultSymbols, fetchedSymbols) => {
    return Array.from(new Set([...defaultSymbols, ...fetchedSymbols]));
  };
  