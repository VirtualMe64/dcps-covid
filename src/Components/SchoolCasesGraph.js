import { Bar, HorizontalBar } from "react-chartjs-2";
import React from "react";
import colors from "../colors";

const SchoolCasesGraph = (props) => {
  const [schoolCases, setSchoolCases] = React.useState({});
  const [data, setData] = React.useState({});
  const [sortType, setSortType] = React.useState("cases");
  const [max, setMax] = React.useState(0);

  React.useEffect(() => {
    // parse school cases, totaling cases per school
    let schoolCases = {};
    props.caseData
      .filter((letter) => {
        if (!props.dateFilter) {
          return true;
        }
        return letter.date === props.dateFilter;
      })
      .forEach((letter) => {
        const { num_cases, school } = letter;
        if (!(school in schoolCases)) {
          schoolCases[school] = {
            num_cases,
          };
        } else {
          schoolCases[school].num_cases += num_cases;
        }
      });

    // get max value for y-axis
    let tempMax = 0;
    Object.values(schoolCases).forEach((val) => {
      if (val.num_cases > tempMax) {
        tempMax = val.num_cases;
      }
    });
    setMax(tempMax);
    setSchoolCases(schoolCases);
  }, [props.dateFilter, props.caseData]);

  React.useEffect(() => {
    const sorts = {
      cases: (a, b) => schoolCases[b].num_cases - schoolCases[a].num_cases,
      alphabetical: (a, b) => a.localeCompare(b),
    };

    // take data and format it for chartjs
    let labels = Object.keys(schoolCases).sort(sorts[sortType]);
    let data = labels.map((label) => schoolCases[label].num_cases);
    setData({
      labels,
      datasets: [
        {
          label: "Total COVID Cases",
          backgroundColor: colors.bars,
          data,
        },
      ],
    });
  }, [schoolCases, sortType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onClick: () => {
        setSortType(sortType === "cases" ? "alphabetical" : "cases");
      },
    },
    title: {
      display: true,
      text:
        (props.dateFilter ? "New" : "Total") +
        " COVID Cases By School" +
        (props.dateFilter ? " - " + props.dateFilter : ""),
      fontSize: 30,
    },
  };

  const yAxes = [
    {
      ticks: {
        beginAtZero: true,
        max: max + 1,
        precision: 0,
      },
      gridLines: {
        color: colors.grid,
      },
    },
  ];

  const xAxes = [
    {
      gridLines: {
        display: false,
      },
    },
  ];

  return props.horizontal ? (
    <HorizontalBar
      data={data}
      options={{ ...options, scales: { yAxes: xAxes, xAxes: yAxes } }}
      onElementsClick={props.handleBarClick}
    />
  ) : (
    <Bar
      data={data}
      options={{ ...options, scales: { yAxes: yAxes, xAxes: xAxes } }}
      onElementsClick={props.handleBarClick}
    />
  );
};

export default SchoolCasesGraph;
