import * as XLSX from "xlsx";

export function extractFirstColumnFromFile(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON (row-wise data)
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract the first column values
      const firstColumnValues = rows.map((row: any) => row[0]).filter(Boolean);
      resolve(firstColumnValues as string[]);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}
