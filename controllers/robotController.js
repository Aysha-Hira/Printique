import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRobotTxt = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/robots.txt"));
};
