import React from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    month: state.Month.month,
    exp: state.Expenses.expense,
  };
}

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};
connect(mapStateToProps)(function ChartEx(props) {
  const { month, dispatch } = props;
  console.log("mon", month);

  return (
    <Chart
      width="100%"
      height="400px"
      chartType="PieChart"
      data={data}
      options={options}
    />
  );
});
export default { ChartEx };
