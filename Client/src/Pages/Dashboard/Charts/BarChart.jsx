import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// 🔥 Custom Tooltip (like your design)
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{label}</p>
                {/* <p className="income">income : {payload[0].value}</p> */}
                <p className="expense">expense : {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const data = [
    { name: "Sales", income: 1900, expense: 1100 },
    { name: "Services", income: 1200, expense: 800 },
    { name: "Payroll", income: 1500, expense: 1000 },
    { name: "Operating", income: 2500, expense: 2000 },
    { name: "Training", income: 2000, expense: 1500 },
];

const BarChartData = ({ data }) => {
    return (
        <>
        <div className="chart-card">
            <h3>Category Breakdown</h3>
            <p className="sub">Financial summary by category</p>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data || []} barGap={8}>

                    {/* Grid */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="name" />
                    <YAxis />

                    {/* ❌ Remove black hover */}
                    <Tooltip content={<CustomTooltip />} cursor={false} />

                    {/* 🔥 Gradient bars */}
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c4b5fd" />
                            <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>

                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a78bfa" />
                            <stop offset="100%" stopColor="#5b21b6" />
                        </linearGradient>
                    </defs>

                    {/* Bars */}
                    <Bar
                        dataKey="income"
                        barSize={30}
                        fill="url(#incomeGradient)"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1200}
                    />

                    <Bar
                        dataKey="expense"
                        barSize={30}
                        fill="url(#expenseGradient)"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1200}
                    />

                </BarChart>
            </ResponsiveContainer>
            </div>
        </>
    );
};

export default BarChartData;