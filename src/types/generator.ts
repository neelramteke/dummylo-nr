export type DataType = "id" | "name" | "email" | "age" | "date" | "salary" | "phone" | "address" | "company" | "rating" | "product";

export interface Column {
  name: string;
  type: DataType;
}