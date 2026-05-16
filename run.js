const fs = require('fs');
const ogDebtData = fs.readFileSync('./debt-map.json'); // see debt-map-renamed.json for structure
const debtData = [];

JSON.parse(ogDebtData).forEach((debt, index) => {
    debtData.push({
        ...debt,
        name: `debt-${index + 1}`
    })
});

fs.writeFileSync('./debt-map-renamed.json', JSON.stringify(debtData));
