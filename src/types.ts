export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  type: "Course" | "Quiz";
  createdBy: string;
  lastEdited: string;
  [key: string]: any;
}

export interface FilterOption {
  name: string;
  key: string;
}

export interface Filter {
  key: string;
  value: string[];
}
