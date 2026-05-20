const fs = require("fs");
const { generateBarChart, generatePieChart } = require("./chart-gen");
const { getDebtFees, getAvailCred } = require("./data-format");
const ogDebtData = fs.readFileSync("./debt-map.json"); // see debt-map-renamed.json for structure
const debtData = [];

JSON.parse(ogDebtData).forEach((debt, index) => {
  debtData.push({
    ...debt,
    name: `debt-${index + 1}`
  })
});

fs.writeFileSync("./debt-map-renamed.json", JSON.stringify(debtData));

const debtFees = getDebtFees(debtData);
generateBarChart(debtFees, 'debth interest and fees', 'debt-fees');

const utilToCredLine = getAvailCred(debtData);
generatePieChart(utilToCredLine, `available credit`, 'avail-credit');
