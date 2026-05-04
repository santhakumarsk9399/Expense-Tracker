import React from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import "../../../components/Css/Dashboard/piechart.css"
const COLORS = [
    "#7c3aed",
    "#a78bfa",
    "#c4b5fd",
    "#ddd6fe",
    "#8b5cf6",
    "#6d28d9",
];

// 🔥 CUSTOM LABEL FUNCTION
const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
}) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 40 //istance outside
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#555"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontSize: "12px", fontWeight: 500 }}
        >
            {name} — {(percent * 100).toFixed(1)}%
        </text>
    );
};

const PieChartComponent = ({ data }) => {
    console.log(data)
    if (!data || data.length === 0) {
        return <p style={{ textAlign: "center" }}>No data</p>;
    }

    const formatPieData = (data) => {
        let threshold = 0.05; // 5%

        const total = data.reduce((sum, d) => sum + d.value, 0);

        let major = [];
        let others = 0;

        data.forEach((item) => {
            if (item.value / total < threshold) {
                others += item.value;
            } else {
                major.push(item);
            }
        });

        if (others > 0) {
            major.push({ name: "Others", value: others });
        }

        return major;
      };

    const finalData = formatPieData(data);
    return (
        <div className="pie-card">
            <h4>Spending Distribution</h4>

            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        data={finalData}
                        dataKey="expense"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        label={renderCustomLabel} // 🔥 IMPORTANT
                        stroke="none"
                    >
                        
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;