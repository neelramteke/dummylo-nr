import { Column } from "@/types/generator";

const FIRST_NAMES = [
  "John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava",
  "Alexander", "Isabella", "Daniel", "Mia", "David", "Charlotte", "Joseph",
  "Amelia", "Matthew", "Harper", "Andrew", "Evelyn"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin"
];

const COMPANIES = [
  "Tech Solutions Inc.", "Global Innovations", "Digital Dynamics", "Future Systems",
  "Smart Technologies", "Cloud Computing Co.", "Data Analytics Ltd.", "Web Solutions",
  "Software Experts", "IT Consulting Group"
];

const PRODUCTS = [
  "Smart Watch", "Wireless Earbuds", "Gaming Laptop", "4K Monitor", "Mechanical Keyboard",
  "Gaming Mouse", "USB-C Hub", "External SSD", "Bluetooth Speaker", "Webcam",
  "Power Bank", "Phone Case", "Laptop Stand", "Wireless Charger", "Graphics Tablet"
];

const generateId = (index: number) => `ID${String(index + 1).padStart(4, "0")}`;

const generateName = () => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
};

const generateEmail = (name: string) => {
  const [firstName, lastName] = name.toLowerCase().split(" ");
  return `${firstName}.${lastName}@example.com`;
};

const generateAge = () => Math.floor(Math.random() * (65 - 18 + 1)) + 18;

const generateDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .split("T")[0];
};

const generateSalary = () => {
  const base = Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000;
  return `$${base.toLocaleString()}`;
};

const generatePhone = () => {
  const area = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${prefix}-${line}`;
};

const generateAddress = () => {
  const number = Math.floor(Math.random() * 9900) + 100;
  const streets = ["Main St", "Oak Ave", "Maple Rd", "Cedar Ln", "Pine Dr"];
  const street = streets[Math.floor(Math.random() * streets.length)];
  return `${number} ${street}`;
};

const generateCompany = () => {
  return COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
};

const generateRating = () => {
  return (Math.floor(Math.random() * 5) + 1).toString();
};

const generateProduct = () => {
  return PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
};

const generators: Record<string, (index: number, row?: any) => any> = {
  id: generateId,
  name: generateName,
  email: (index: number, row: any) => generateEmail(row.name || generateName()),
  age: generateAge,
  date: generateDate,
  salary: generateSalary,
  phone: generatePhone,
  address: generateAddress,
  company: generateCompany,
  rating: generateRating,
  product: generateProduct,
};

export const generateDummyData = async (columns: Column[], rowCount: number) => {
  const data = [];
  
  for (let i = 0; i < rowCount; i++) {
    const row: Record<string, any> = {};
    
    // First pass: generate all non-dependent fields
    for (const column of columns) {
      if (column.type !== "email") {
        row[column.name] = generators[column.type](i, row);
      }
    }
    
    // Second pass: generate dependent fields (like email which depends on name)
    for (const column of columns) {
      if (column.type === "email") {
        row[column.name] = generators[column.type](i, row);
      }
    }
    
    data.push(row);
  }
  
  return data;
};
