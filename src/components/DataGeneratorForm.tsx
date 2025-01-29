import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Column, DataType } from "@/types/generator";

const DATA_TYPES: { value: DataType; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "name", label: "Full Name" },
  { value: "email", label: "Email" },
  { value: "age", label: "Age" },
  { value: "date", label: "Date" },
  { value: "salary", label: "Salary" },
  { value: "phone", label: "Phone" },
  { value: "address", label: "Address" },
  { value: "company", label: "Company" },
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
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <Input
                placeholder="Column name"
                value={column.name}
                onChange={(e) => updateColumn(index, "name", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
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

      <div className="flex gap-4 items-center">
        <Button
          variant="outline"
          onClick={addColumn}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Column
        </Button>
        <div className="flex items-center gap-2">
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
        <Button onClick={onGenerate} className="ml-auto">
          Generate Data
        </Button>
      </div>
    </div>
  );
};

export default DataGeneratorForm;