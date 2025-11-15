import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAboutUsPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/about-us.html"));
};

export const getAboutUsPageByName = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/about-us.html"));
};
