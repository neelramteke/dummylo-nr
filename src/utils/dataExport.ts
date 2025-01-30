export const exportToCSV = (data: any[], filename: string) => {
  // Get headers from the first row
  const headers = Object.keys(data[0]);
  
  // Convert data to CSV format
  const csvContent = [
    headers.join(","), // Header row
    ...data.map(row => headers.map(header => {
      const cell = row[header];
      // Escape quotes and wrap in quotes if contains comma or quotes
      const escaped = cell.toString().replace(/"/g, '""');
      return escaped.includes(',') || escaped.includes('"') 
        ? `"${escaped}"`
        : escaped;
    }).join(","))
  ].join("\n");
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};