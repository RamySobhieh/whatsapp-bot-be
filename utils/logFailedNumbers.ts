import * as fs from "fs";
import * as path from "path";

const uploadDir = path.join(__dirname, "..", "Logs"); // Adjust this path as necessary

function logFailedNumbers(failedNumbers: string[]) {
  const filePath = path.join(uploadDir, Date.now() + "failed_numbers.txt");
  const failedNumbersString = failedNumbers.join("\n");
  // Use fs.appendFileSync to log the numbers
  try {
    fs.appendFileSync(filePath, `${failedNumbersString}\n`);
    console.log("Failed numbers logged to failed_numbers.txt");
  } catch (err) {
    console.error("Error writing to failed_numbers.txt:", err);
  }
}

export { logFailedNumbers };
