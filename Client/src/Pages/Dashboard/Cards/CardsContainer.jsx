import { useEffect, useState } from "react";
import StatCard from "../../Dashboard/Cards/StateCard";
import { FaWallet, FaChartLine, FaBalanceScale, FaExchangeAlt } from "react-icons/fa";

const CardsContainer = ({ carddata, transactions }) => {
    // console.log(carddata)
    const [animated, setAnimated] = useState({
        income: 0,
        expense: 0,
        balance: 0,
        transactions: 0,
    });

    // 🔥 Animate when props change
    useEffect(() => {
        if (!carddata) return;

        const interval = setInterval(() => {
            setAnimated((prev) => ({
                income: Math.min(
                    prev.income + carddata.income / 20,
                    carddata.income
                ),
                expense: Math.min(
                    prev.expense + carddata.expense / 20,
                    carddata.expense
                ),

                balance:
                    carddata.balance >= 0
                        ? Math.min(
                            prev.balance + carddata.balance / 20,
                            carddata.balance
                        )
                        : Math.max(
                            prev.balance + carddata.balance / 20,
                            carddata.balance
                        ),

                transactions: transactions ? transactions.length : 0,
            }));
        }, 50);

        return () => clearInterval(interval);
    }, [carddata, transactions]);

    return (
        <div className="cards">

            <StatCard
                title="Total Income"
                value={`₹${Math.round(animated.income)}`}
                change="+12%"
                icon={FaWallet}
            />

            <StatCard
                title="Total Expenses"
                value={`₹${Math.round(animated.expense)}`}
                change="+8%"
                icon={FaChartLine}
            />

            <StatCard
                title="Net Balance"
                value={`₹${Math.round(animated.balance)}`}
                icon={FaBalanceScale}
            />

            <StatCard
                title="Transactions"
                value={Math.round(animated.transactions)}
                icon={FaExchangeAlt}
            />

        </div>
    );
};

export default CardsContainer;