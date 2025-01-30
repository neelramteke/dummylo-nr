import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Column, DataType } from "@/types/generator";

const DATA_TYPES: { value: DataType; label: string }[] = [
  { value: "id", label: "ID (Auto-incrementing)" },
  { value: "uuid", label: "UUID" },
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "name", label: "Full Name" },
  { value: "email", label: "Email Address" },
  { value: "age", label: "Age (18-80)" },
  { value: "date", label: "Date" },
  { value: "phone", label: "Phone Number" },
  { value: "address", label: "Street Address" },
  { value: "city", label: "City" },
  { value: "country", label: "Country" },
  { value: "company", label: "Company Name" },
  { value: "jobTitle", label: "Job Title" },
  { value: "salary", label: "Salary (USD)" },
  { value: "boolean", label: "Boolean" },
  { value: "color", label: "Color" },
  { value: "url", label: "URL" },
  { value: "rating", label: "Rating (1-5)" },
  { value: "product", label: "Product" },
  { value: "randomNumber", label: "Random Number (1-80)" },
  { value: "project", label: "Project Name" },
];

interface DataGeneratorFormProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  rowCount: number;
  setRowCount: (count: number) => void;
  onGenerate: () => void;
}

const DataGeneratorForm = ({
  columns,
  setColumns,
  rowCount,
  setRowCount,
  onGenerate,
}: DataGeneratorFormProps) => {
  const addColumn = () => {
    setColumns([...columns, { name: "", type: "name" }]);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index: number, field: keyof Column, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 w-full">
              <Input
                placeholder="Column name"
                value={column.name}
                onChange={(e) => updateColumn(index, "name", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1 w-full">
              <Select
                value={column.type}
                onValueChange={(value) => updateColumn(index, "type", value as DataType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {DATA_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeColumn(index)}
              className="shrink-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          variant="outline"
          onClick={addColumn}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Column
        </Button>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            type="number"
            min="1"
            max="1000"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-gray-600">rows</span>
        </div>
        <Button onClick={onGenerate} className="w-full sm:w-auto sm:ml-auto">
          Generate Data
        </Button>
      </div>
    </div>
  );
};

export default DataGeneratorForm;