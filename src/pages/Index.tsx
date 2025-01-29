import { useState } from "react";
import DataGeneratorForm from "@/components/DataGeneratorForm";
import DataTable from "@/components/DataTable";
import { Column } from "@/types/generator";
import { generateDummyData } from "@/utils/dataGenerator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCSV } from "@/utils/csvExport";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,80%,white)] dark:bg-grid-black/10"></div>
      <ThemeToggle />
      
      <div className="relative">
        {/* Hero Section */}
        <div className="w-full h-[300px] bg-black flex items-center justify-center mb-8">
          <img
            src="/lovable-uploads/0628990f-4dc5-41c0-af0a-a18f4d7e99e9.png"
            alt="DUMMYLO"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <DataGeneratorForm
              columns={columns}
              setColumns={setColumns}
              rowCount={rowCount}
              setRowCount={setRowCount}
              onGenerate={handleGenerateData}
            />
          </div>

          {generatedData.length > 0 && (
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4 border border-border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Generated Data Preview</h2>
                <Button
                  onClick={handleDownloadCSV}
                  variant="outline"
                  className="group transition-all duration-300 hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Download CSV
                </Button>
              </div>
              <DataTable data={generatedData} columns={columns} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;