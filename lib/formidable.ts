import formidable from "formidable";
import path from "path";
import fs from "fs";

// Configure formidable
export const form = formidable({
  multiples: false,
  keepExtensions: true,
  uploadDir: path.join(process.cwd(), "/public/uploads"), // files saved here
  maxFileSize: 50 * 1024 * 1024, // 50 MB
});

// Ensure /public/uploads exists
const uploadDir = path.join(process.cwd(), "/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
