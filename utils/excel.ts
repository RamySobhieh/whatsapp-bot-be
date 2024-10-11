import * as XLSX from "xlsx";

async function extractFirstColumnFromFile(
  file: Express.Multer.File,
  startRow: number,
  endRow: number
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.readFile(file.path);

      // Get the first sheet name
      const firstSheetName = workbook.SheetNames[0];

      // Get the first sheet
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert the sheet to JSON format
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];

      // Flatten the array and return as an array of strings
      const flatArray = jsonData.flat();
      resolve(flatArray);
    } catch (error) {
      reject(error);
    }
  });
}

export { extractFirstColumnFromFile };
