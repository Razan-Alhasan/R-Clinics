import pdf from "pdf-creator-node"
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { options } from "./options.js";
const __fileName = fileURLToPath(import.meta.url)
const __dirName = dirname(__fileName)

export const createPdf = (bill, fileName, req, res) => {
    const htmlPath = join(__dirName, "../Templates/billPdfTemplate.html");
    let html = fs.readFileSync(htmlPath, "utf8");
    var document = {
        html: html,
        data: {bill},
        path: `./SRC/PdfFiles/${fileName}`
    };
    pdf.create(document, options).then(() =>
    { return res.send(`<a download href="${req.protocol}://${req.headers.host}/${fileName}">download</a>`); });
};