import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class PantryChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cookiesPackets" fill="#8884d8" />
          <Bar dataKey="candy" fill="#82ca9d" />
          <Bar dataKey="coffeeSachets" fill="#ffa07a" />
          <Bar dataKey="milkPackets" fill="#20b2aa" />
          <Bar dataKey="coffeeMachine" fill="#faebd7" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
