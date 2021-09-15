import "../App.css";
import colors from "../colors";
import SchoolCasesGraph from "../Components/SchoolCasesGraph";
import DateGraph from "../Components/DateGraph";
import caseData from "../cases.json";
import schoolData from "../school_data.json";
import React from "react";
import { defaults } from "chart.js";
import { useMediaQuery } from "react-responsive";

const SummaryPage = () => {
  const [graphMode, setGraphMode] = React.useState(true);
  const tallScreen = useMediaQuery({ maxWidth: 1000 });
  const [dateFilter, setDateFilter] = React.useState(null);
  const [schoolFilter, setSchoolFilter] = React.useState(null);

  React.useEffect(() => {
    defaults.global.defaultFontColor = colors.text;
  });

  const handleHeaderClick = () => {
    setGraphMode(!graphMode);
    setDateFilter(null);
    setSchoolFilter(null);
  };

  const handleBarClickDate = (elem) => {
    if (elem.length === 0) {
      return;
    }
    let date = elem[0]._model.label;
    window.open(
      caseData.filter(
        (letter) => letter.date === date && letter.school === schoolFilter
      )[0].url,
      "_blank"
    );
  };

  const handleBarClickSchool = (elem) => {
    if (elem.length === 0) {
      return;
    }
    let school = elem[0]._model.label;
    setGraphMode(true);
    setSchoolFilter(school);
  };

  return (
    <div className="App" style={{ backgroundColor: colors.background }}>
      <header
        className="App-header-summary"
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
              title={true}
              schoolFilter={schoolFilter}
              handleBarClick={schoolFilter ? handleBarClickDate : null}
            />
          ) : (
            <SchoolCasesGraph
              caseData={caseData}
              horizontal={true}
              dateFilter={dateFilter}
              handleBarClick={handleBarClickSchool}
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default SummaryPage;
