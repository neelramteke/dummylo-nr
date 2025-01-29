import { useState } from "react";
import DataGeneratorForm from "@/components/DataGeneratorForm";
import DataTable from "@/components/DataTable";
import { Column } from "@/types/generator";
import { generateDummyData } from "@/utils/dataGenerator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCSV } from "@/utils/csvExport";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,80%,white)] dark:bg-grid-black/10"></div>
      <Navbar />
      
      <div className="relative pt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white/20">
            <DataGeneratorForm
              columns={columns}
              setColumns={setColumns}
              rowCount={rowCount}
              setRowCount={setRowCount}
              onGenerate={handleGenerateData}
            />
          </div>

          {generatedData.length > 0 && (
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-4 border border-white/20">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white dark:text-white">Generated Data Preview</h2>
                <Button
                  onClick={handleDownloadCSV}
                  variant="outline"
                  className="group transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400"
                >
                  <Download className="h-4 w-4 mr-2 group-hover:text-white" />
                  Download CSV
                </Button>
              </div>
              <DataTable data={generatedData} columns={columns} />
            </div>
          )}
        </div>

        <footer className="text-center py-8 text-white dark:text-white mt-8">
          Made with ❤️ by Neel R
        </footer>
      </div>
    </div>
  );
};

export default Index;