import { Column } from "@/types/generator";
import { v4 as uuidv4 } from 'uuid';

const FIRST_NAMES = [
  "Neel", "Ojas", "Nishant", "Anchal", "Shreya", "Shamiksha", "Pawan", "Aayush",
  "John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava",
  "Alexander", "Isabella", "Daniel", "Mia", "David", "Charlotte", "Joseph",
  "Amelia", "Matthew", "Harper", "Andrew", "Evelyn"
];

const LAST_NAMES = [
  "Patel", "Shah", "Kumar", "Singh", "Reddy", "Sharma", "Verma", "Rao",
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin"
];

const COMPANIES = [
  "Tech Solutions Inc.", "Global Innovations", "Digital Dynamics", "Future Systems",
  "Smart Technologies", "Cloud Computing Co.", "Data Analytics Ltd.", "Web Solutions",
  "Software Experts", "IT Consulting Group", "Infosys", "TCS", "Wipro", "HCL",
  "Tech Mahindra", "Mindtree", "Persistent", "Mphasis"
];

const JOB_TITLES = [
  "Software Engineer", "Product Manager", "Data Scientist", "UX Designer",
  "Project Manager", "Business Analyst", "DevOps Engineer", "Full Stack Developer",
  "Marketing Manager", "Sales Director", "HR Manager", "System Architect"
];

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "New York", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Toronto"
];

const COUNTRIES = [
  "India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan",
  "Singapore", "UAE", "Brazil", "South Africa", "New Zealand", "Ireland"
];

const COLORS = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#FFC0CB", "#A52A2A", "#808080"
];

const URLS = [
  "https://example.com", "https://test.org", "https://demo.net",
  "https://sample.io", "https://website.com", "https://platform.co"
];

const PRODUCTS = [
  "Smartphone", "Laptop", "Tablet", "Smartwatch", "Headphones",
  "Desktop Computer", "Camera", "Printer", "Monitor", "Keyboard",
  "Mouse", "Speaker System", "Gaming Console", "External Hard Drive",
  "Wireless Router"
];

const PROJECTS = [
  "Project Phoenix", "Project Alpha", "Project Genesis", "Project Omega",
  "Project Atlas", "Project Nova", "Project Titan", "Project Nexus",
  "Project Aurora", "Project Quantum", "Project Vector", "Project Matrix",
  "Project Zenith", "Project Horizon", "Project Spectrum"
];

const generateId = (index: number) => `ID${String(index + 1).padStart(4, "0")}`;
const generateUUID = () => uuidv4();
const generateFirstName = () => FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
const generateLastName = () => LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
const generateJobTitle = () => JOB_TITLES[Math.floor(Math.random() * JOB_TITLES.length)];
const generateCity = () => CITIES[Math.floor(Math.random() * CITIES.length)];
const generateCountry = () => COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
const generateBoolean = () => Math.random() < 0.5;
const generateColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const generateURL = () => URLS[Math.floor(Math.random() * URLS.length)];

const generateName = () => {
  const firstName = generateFirstName();
  const lastName = generateLastName();
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

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 80) + 1;
};

const generateProject = () => {
  return PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
};

const generators: Record<string, (index: number, row?: any) => any> = {
  id: generateId,
  uuid: generateUUID,
  firstName: generateFirstName,
  lastName: generateLastName,
  name: generateName,
  email: (index: number, row: any) => generateEmail(row.name || generateName()),
  age: generateAge,
  date: generateDate,
  salary: generateSalary,
  phone: generatePhone,
  address: generateAddress,
  city: generateCity,
  country: generateCountry,
  company: generateCompany,
  jobTitle: generateJobTitle,
  boolean: generateBoolean,
  color: generateColor,
  url: generateURL,
  rating: generateRating,
  product: generateProduct,
  randomNumber: generateRandomNumber,
  project: generateProject,
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
