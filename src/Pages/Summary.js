import "../App.css";
import colors from "../colors";
import SchoolCasesGraph from "../Components/SchoolCasesGraph";
import DateGraph from "../Components/DateGraph";
import caseData from "../cases.json";
import React from "react";
import { defaults } from "chart.js";
import { useMediaQuery } from "react-responsive";

const SummaryPage = () => {
  const [graphMode, setGraphMode] = React.useState(true);
  const tallScreen = useMediaQuery({ maxWidth: 1000 }, undefined, () => {
    console.log("change");
  });
  const [dateFilter, setDateFilter] = React.useState(null);

  React.useEffect(() => {
    defaults.global.defaultFontColor = colors.text;
  });

  const handleHeaderClick = () => {
    setGraphMode(!graphMode);
    setDateFilter(null);
  };

  return (
    <div className="App" style={{ backgroundColor: colors.background }}>
      <header
        className="App-header"
        style={{ backgroundColor: colors.background, color: colors.text }}
      >
        <h1 onClick={handleHeaderClick}>DCPS COVID-19 Data</h1>
        <div className="Graph-container">
          {graphMode ? (
            <DateGraph
              caseData={caseData}
              horizontal={tallScreen}
              setDateFilter={setDateFilter}
              setGraphMode={setGraphMode}
            />
          ) : (
            <SchoolCasesGraph
              caseData={caseData}
              horizontal={true}
              dateFilter={dateFilter}
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default SummaryPage;
