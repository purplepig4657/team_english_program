import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

interface IssueChartProps {
    data: Array<any>;
    width: number;
    stroke: string;
    name: string;
}

const IssueChart: React.FC<IssueChartProps> = ({
    data,
    width,
    stroke,
    name
}) => {
    return <>
        <LineChart width={width} height={300} data={data}
                   style={{ marginTop: "50px" }}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="issueScore" name={name} stroke={stroke} />
        </LineChart>
    </>
}

export default IssueChart;
