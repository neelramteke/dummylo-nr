export type DataType = 
  | "id" 
  | "uuid"
  | "firstName"
  | "lastName"
  | "name"
  | "email"
  | "age"
  | "date"
  | "phone"
  | "address"
  | "city"
  | "country"
  | "company"
  | "jobTitle"
  | "salary"
  | "boolean"
  | "color"
  | "url"
  | "rating"
  | "product"
  | "randomNumber"
  | "project";

export interface Column {
  name: string;
  type: DataType;
}