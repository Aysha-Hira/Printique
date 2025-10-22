import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHomePage = async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/home.html"));
}

export const getCustomizationPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/customization.html"));
}

export const getPaymentPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/payment.html"));
}

export const getErrorPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/error.html"));
}