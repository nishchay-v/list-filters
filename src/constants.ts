import { FilterOption } from "./types";

export const FILTER_KEYS = {
  COLLECTION: "collection",
  CREATED_BY: "createdBy",
  ACADEMY: "academy",
  CONTENT_TAGS: "contentTags",
};

export const FILTER_LABELS = {
  [FILTER_KEYS.COLLECTION]: "Collection",
  [FILTER_KEYS.CREATED_BY]: "Created by",
  [FILTER_KEYS.ACADEMY]: "Academy",
  [FILTER_KEYS.CONTENT_TAGS]: "Content tags",
};

export const FILTER_OPTIONS: FilterOption[] = [
  { key: FILTER_KEYS.COLLECTION, name: FILTER_LABELS[FILTER_KEYS.COLLECTION] },
  { key: FILTER_KEYS.CREATED_BY, name: FILTER_LABELS[FILTER_KEYS.CREATED_BY] },
  { key: FILTER_KEYS.ACADEMY, name: FILTER_LABELS[FILTER_KEYS.ACADEMY] },
  {
    key: FILTER_KEYS.CONTENT_TAGS,
    name: FILTER_LABELS[FILTER_KEYS.CONTENT_TAGS],
  },
];
