const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`);
});
const FILE_NAME = "products.xlsx";

// Function to save product data

function saveToExcel(product) {
let workbook;
let worksheet;
let data = [];

if (fs.existsSync(FILE_NAME)) {

// Read the existing Excel file

workbook = XLSX.readFile(FILE_NAME);

// Check if the "Products" sheet exists

if (workbook.Sheets["Products"]) {
worksheet = workbook.Sheets["Products"];
data = XLSX.utils.sheet_to_json(worksheet); // Get existing data

}
} else {
// Create a new workbook if the file doesn't exist
workbook = XLSX.utils.book_new();

}


// Append new product
data.push(product);
worksheet = XLSX.utils.json_to_sheet(data);


// If the sheet already exists, replace it instead of appending a duplicate
if (workbook.Sheets["Products"]) {
workbook.Sheets["Products"] = worksheet;

} else {
XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

}
XLSX.writeFile(workbook, FILE_NAME);

}


// API Endpoint to add product

app.post("/add-product", (req, res) => {

const { productId, productName, price, numberInStock } = req.body;

if (!productId || !productName || !price || !numberInStock) {

return res.status(400).json({ message: "All fields are required!" });

}


const product = { ProductID: productId, Name: productName, Price: price, Stock: numberInStock };

saveToExcel(product);

res.json({ message: "Product added successfully!" });

});