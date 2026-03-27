import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const AreaChartComponent = ({ data }) => {
console.log(data)
    const groupedData = {};

    data.forEach((item) => {
        const date = item.Date;

        if (!groupedData[date]) {
            groupedData[date] = 0;
        }

        groupedData[date] += item.Amount;
    });

    const chartData = Object.keys(groupedData)
        .map((date) => ({
            date,
            amount: groupedData[date],
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />

                <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#7c3aed"
                    fillOpacity={1}
                    fill="url(#colorAmt)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartComponent;