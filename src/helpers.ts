import { CatalogItem, Filter } from "./types";

export const formatElapsedTime = (lastEdited: string): string => {
  const now = new Date();
  const editedDate = new Date(lastEdited);
  const elapsed = now.getTime() - editedDate.getTime();

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `edited about ${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `edited about ${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `edited about ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `edited just now`;
  }
};

export const getNestedFilterOptions = (
  catalogData: CatalogItem[],
  filterKey: string
): string[] => {
  const filterValues = catalogData.map((item) => item[filterKey]);
  return Array.from(new Set(filterValues.flat().filter(Boolean)));
};

export const getFilteredData = (
  catalogData: CatalogItem[],
  activeFilters: Filter[]
): CatalogItem[] => {
  return catalogData.filter((item) => {
    return activeFilters.every((filter) => {
      return filter.value.includes(item[filter.key]);
    });
  });
};

// TODO: can optimize using Trie
export const searchOptions = (options: string[], query: string): string[] => {
  return options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );
};
