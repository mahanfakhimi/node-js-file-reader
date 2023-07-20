const fs = require("fs");

const inputFileName = "./omens.txt";
const outputFileName = "./output.js";

function readAndConvertToJSArray(fileName, callback) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("خطا در خواندن فایل:", err);
      return;
    }

    const texts = data.split(/\n\d+\.\s/).filter((text) => text.trim() !== "");

    const objectsArray = texts.map((text, index) => ({
      id: index + 1,
      text: text.trim(),
    }));

    callback(objectsArray);
  });
}

function convertArrayToJSString(array) {
  const arrayString = JSON.stringify(array, null, 2);
  return `const texts = ${arrayString};\n\nmodule.exports = texts;\n`;
}

readAndConvertToJSArray(inputFileName, (texts) => {
  const jsString = convertArrayToJSString(texts);

  fs.writeFile(outputFileName, jsString, "utf8", (err) => {
    if (err) {
      console.error("خطا در ذخیره فایل:", err);
    } else {
      console.log(`فایل ${outputFileName} با موفقیت ایجاد شد.`);
    }
  });
});
