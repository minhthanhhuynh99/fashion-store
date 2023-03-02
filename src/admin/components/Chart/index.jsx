import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
const data = [
  {name: 'Hậu', money: 100, pv: 1400, amt: 1400},
  {name: 'Minh', money: 1200, pv: 1400, amt: 1400},
  {name: 'Quang', money: 200, pv: 1400, amt: 1400},
  {name: 'Ronaldo', money: 500, pv: 1400, amt: 1400},
];
function Chart(props) {
  return (
    <BarChart width={500} height={400} data={data}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="money" fill="#3498db" barSize={30} />
  </BarChart>
  )
}
export default Chart
