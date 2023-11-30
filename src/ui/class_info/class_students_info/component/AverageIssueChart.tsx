import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

interface AverageIssueChartProps {
    data: Array<any>;
    width?: number | undefined;
    stroke: string;
    name: string;
}

const AverageIssueChart: React.FC<AverageIssueChartProps> = ({
    data,
    width = undefined,
    stroke,
    name
}) => {
    return <>
        <LineChart width={width} height={400} data={data}
                   margin={{ top: 5, right: 50, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="averageIssueScore" name={name} stroke={stroke} />
        </LineChart>
    </>
}

export default AverageIssueChart;
