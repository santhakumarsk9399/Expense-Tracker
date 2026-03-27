const calculateSummary = (transactions) => {
    let income = 0;
    let expense = 0;
    let savings = 0;
// console.log(transactions)
    transactions.forEach((item) => {
        if (item.Type === "income") income += item.Amount;
        if (item.Type === "expense") expense += item.Amount;
        if (item.Type === "savings") savings += item.Amount;
    });

    return {
        income,
        expense,
        savings,
        balance :income - expense
        // balance: income - (expense + savings),
    };
};
export default calculateSummary;