import { Bar, HorizontalBar } from "react-chartjs-2";
import React from "react";
import colors from "../colors";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateGraph = (props) => {
  const [casesByDate, setCasesByDate] = React.useState({});
  const [data, setData] = React.useState({});

  const parseCasesByDate = () => {
    // parse date cases, totaling cases per date
    let dateCases = {};
    props.caseData.forEach((letter) => {
      const { date, num_cases } = letter;
      let dateVar = new Date(date);
      if (!(date in dateCases)) {
        dateCases[date] = {
          num_cases: num_cases,
          date_var: dateVar,
        };
      } else {
        dateCases[date].num_cases += num_cases;
      }
    });
    setCasesByDate(dateCases);
  };

  React.useEffect(() => {
    // load data from cases.json
    parseCasesByDate();
  }, []);

  React.useEffect(() => {
    if (Object.keys(casesByDate).length === 0) {
      return;
    }

    let earliestDate = Object.values(casesByDate)[0].date_var;
    let latestDate = Object.values(casesByDate)[0].date_var;
    Object.values(casesByDate).forEach((dateObj) => {
      if (dateObj.date_var < earliestDate) {
        earliestDate = dateObj.date_var;
      }
      if (dateObj.date_var > latestDate) {
        latestDate = dateObj.date_var;
      }
    });

    let dates = [];
    let current_date = earliestDate;
    while (current_date < latestDate) {
      dates.push(current_date);
      current_date = new Date(current_date.setDate(current_date.getDate() + 1));
    }

    const dateToName = (date) => {
      return `${monthNames[date.getMonth()]} ${date.getDate()}`;
    };

    // take data and format it for chartjs
    let labels = dates.map((date) => dateToName(date));
    let data = labels.map((label) =>
      label in casesByDate ? casesByDate[label].num_cases : 0
    );
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
  }, [casesByDate]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onClick: () => {
        return false;
      },
    },
    title: {
      display: true,
      text: "New DCPS COVID Cases by Date",
      fontSize: 30,
    },
  };

  const yAxes = [
    {
      ticks: {
        beginAtZero: true,
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
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  ];

  const onClick = (elem) => {
    if (elem.length === 0) {
      return;
    }
    let date = elem[0]._model.label;
    props.setDateFilter(date);
    props.setGraphMode(false);
  };

  return props.horizontal ? (
    <HorizontalBar
      data={data}
      options={{ ...options, scales: { yAxes: xAxes, xAxes: yAxes } }}
      onElementsClick={onClick}
    />
  ) : (
    <Bar
      data={data}
      options={{ ...options, scales: { yAxes: yAxes, xAxes: xAxes } }}
      onElementsClick={onClick}
    />
  );
};

export default DateGraph;
