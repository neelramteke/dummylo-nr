import { useState } from "react";
import DataGeneratorForm from "@/components/DataGeneratorForm";
import DataTable from "@/components/DataTable";
import { Column } from "@/types/generator";
import { generateDummyData } from "@/utils/dataGenerator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCSV } from "@/utils/csvExport";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [rowCount, setRowCount] = useState<number>(10);
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const { toast } = useToast();

  const handleGenerateData = async () => {
    if (columns.length === 0) {
      toast({
        title: "No columns defined",
        description: "Please add at least one column to generate data.",
        variant: "destructive",
      });
      return;
    }
    const data = await generateDummyData(columns, rowCount);
    setGeneratedData(data);
    toast({
      title: "Data generated successfully",
      description: `Generated ${rowCount} rows of dummy data.`,
    });
  };

  const handleDownloadCSV = () => {
    if (generatedData.length === 0) {
      toast({
        title: "No data to export",
        description: "Please generate data first before downloading.",
        variant: "destructive",
      });
      return;
    }
    exportToCSV(generatedData, "dummy_data");
    toast({
      title: "CSV downloaded successfully",
      description: "Your data has been exported to CSV format.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">AI Dummy Data Generator</h1>
          <p className="text-gray-600">Generate realistic dummy data for your projects</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <DataGeneratorForm
            columns={columns}
            setColumns={setColumns}
            rowCount={rowCount}
            setRowCount={setRowCount}
            onGenerate={handleGenerateData}
          />
        </div>

        {generatedData.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Generated Data Preview</h2>
              <Button onClick={handleDownloadCSV} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CSV
              </Button>
            </div>
            <DataTable data={generatedData} columns={columns} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;