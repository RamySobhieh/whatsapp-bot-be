import * as fs from "fs";
import * as path from "path";

const uploadDir = path.join(__dirname, "..", "Uploads"); // Adjust this path as necessary

// Synchronous cleanup function to delete all files in the upload directory
const cleanUploads = () => {
  try {
    const files = fs.readdirSync(uploadDir);
    for (const file of files) {
      fs.unlinkSync(path.join(uploadDir, file));
      console.log(`Deleted ${file} from ${uploadDir}`);
    }
  } catch (err) {
    console.error("Error during cleanup:", err);
  }
};

// Handle process exit and call the cleanup function
process.on("SIGINT", () => {
  console.log("SIGINT received, cleaning up uploads...");
  cleanUploads();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, cleaning up uploads...");
  cleanUploads();
  process.exit(0);
});

// Note: The 'exit' event cannot be used for asynchronous operations
// It's better to rely on SIGINT and SIGTERM for cleanup

export { cleanUploads };
