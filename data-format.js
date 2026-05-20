// descending order
const getDebtFees = (debts) => {
  const debtFees = [];

  debts.forEach(debt => {
    if (debt["interest-fees"] > 0) {
      debtFees.push({
        name: debt.name,
        interestFees: debt["interest-fees"]
      })
    }
  });
  
  return debtFees.sort((a, b) => b.interestFees - a.interestFees);
};

const getAvailCred = (debts) => {
  let creditLine = 0;
  let utilization = 0;

  debts.forEach(debt => {
    if (debt.type === "credit card" && !debt?.closed) {
      creditLine += debt["credit-limit"];
      utilization += debt.balance;
    }
  });
  
  return [
    utilization.toFixed(2),
    creditLine.toFixed(2)
  ];
};

module.exports = {
  getAvailCred,
  getDebtFees
};
