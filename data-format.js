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
}

module.exports = {
  getDebtFees
};
