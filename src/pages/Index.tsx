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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px] dark:bg-grid-white/[0.02]"></div>
      <Navbar />
      
      <div className="relative pt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold italic">DUMMYLO by NEEL R.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Generate realistic dummy data for your database tables.</p>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-200/20">
            <DataGeneratorForm
              columns={columns}
              setColumns={setColumns}
              rowCount={rowCount}
              setRowCount={setRowCount}
              onGenerate={handleGenerateData}
            />
          </div>

          {generatedData.length > 0 && (
            <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-4 border border-gray-200/20">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Generated Data Preview</h2>
                <Button
                  onClick={handleDownloadCSV}
                  variant="outline"
                  className="group transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white dark:hover:from-blue-400 dark:hover:to-purple-400"
                >
                  <Download className="h-4 w-4 mr-2 group-hover:text-white" />
                  Download CSV
                </Button>
              </div>
              <DataTable data={generatedData} columns={columns} />
            </div>
          )}
        </div>

        <footer className="text-center py-8 text-gray-600 dark:text-gray-400 mt-8">
          Made with ❤️ by Neel R
        </footer>
      </div>
    </div>
  );
};

export default Index;