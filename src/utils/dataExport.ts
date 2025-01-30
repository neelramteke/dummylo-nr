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

export const exportToJSON = (data: any[], filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToXLSX = (data: any[], filename: string) => {
  // For XLSX export, we'll create a simple HTML table and trigger download
  const headers = Object.keys(data[0]);
  
  // Create HTML table content
  const tableContent = `
    <table>
      <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
      ${data.map(row => `
        <tr>${headers.map(header => `<td>${row[header]}</td>`).join('')}</tr>
      `).join('')}
    </table>
  `;
  
  // Create a Blob with HTML content
  const blob = new Blob([tableContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};