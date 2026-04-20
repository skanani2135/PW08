const { test, expect } = require("@playwright/test");
const ExcelJS = require('exceljs');

const excelPath = "C:/01/Personal/Technical/Automation/Playwright/02/tests/test-data/ExcelSheet/ExcelData.xlsx";

/**
 * Utility to load workbook
 */
async function getWorksheet() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);
    return workbook.getWorksheet(1);
}


// -------------------- TC 6A --------------------
test('TC 6A - Read Single Cell from Excel', async () => {

    const worksheet = await getWorksheet();

    const cellValue = worksheet.getCell('A1').value;
    console.log("Value in A1:", cellValue);

    expect(cellValue).not.toBeNull();
});


// -------------------- TC 6B --------------------
test('TC 6B - Read All Rows from Excel', async () => {

    const worksheet = await getWorksheet();

    let rowCount = 0;

    worksheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber}:`, row.values);
        rowCount++;
    });

    expect(rowCount).toBeGreaterThan(0);
});


// -------------------- TC 6C --------------------
test('TC 6C - Validate Excel Sheet Structure', async () => {

    const worksheet = await getWorksheet();

    // Example validations
    expect(worksheet).toBeTruthy();
    expect(worksheet.rowCount).toBeGreaterThan(0);
    expect(worksheet.columnCount).toBeGreaterThan(0);

    console.log("Total Rows:", worksheet.rowCount);
    console.log("Total Columns:", worksheet.columnCount);
});