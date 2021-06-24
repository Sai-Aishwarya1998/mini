import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default class ChartComponent extends PureComponent {
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
          <Bar dataKey="Room1" fill="#8884d8" />
          <Bar dataKey="Room2" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
