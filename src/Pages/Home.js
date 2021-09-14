import "../App.css";
import colors from "../colors";
import caseData from "../cases.json";
import React from "react";
import Select from "react-select";
import DateGraph from "../Components/DateGraph";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const [options, setOptions] = React.useState([]);
  const [school, setSchool] = React.useState("");
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  React.useEffect(() => {
    let schools = [];
    caseData.forEach((letter) => {
      if (schools.indexOf(letter.school) === -1) {
        schools.push(letter.school);
      }
    });
    schools = schools.sort();
    setOptions(
      schools.map((school) => {
        return { value: school, label: school };
      })
    );
  }, []);

  const handleChange = (e) => {
    setSchool(e.value);
  };

  return (
    <div className="App" style={{ backgroundColor: colors.background }}>
      <header
        className="App-header-home"
        style={{ backgroundColor: colors.background, color: colors.text }}
      >
        {school === "" ? (
          <SchoolSelect options={options} handleChange={handleChange} />
        ) : (
          <SchoolSummary
            school={school}
            setSchool={setSchool}
            isMobile={isMobile}
          />
        )}
      </header>
    </div>
  );
};

const SchoolSummary = (props) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      props.setSchool("");
    }
  };

  const handleBarClick = (elem) => {
    if (elem.length === 0) {
      return;
    }
    let date = elem[0]._model.label;
    window.open(
      caseData.filter(
        (letter) => letter.date === date && letter.school === props.school
      )[0].url,
      "_blank"
    );
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="Graph-container-2">
      <h1>{props.school}</h1>
      <h4>
        Total cases:{" "}
        {caseData
          .filter((letter) => letter.school === props.school)
          .map((letter) => letter.num_cases)
          .reduce((a, b) => a + b, 0)}
      </h4>
      <DateGraph
        caseData={caseData}
        schoolFilter={props.school}
        handleBarClick={handleBarClick}
        horizontal={props.isMobile}
      />
    </div>
  );
};

const SchoolSelect = (props) => (
  <div>
    <h1>DCPS COVID-19 Data</h1>
    <Select
      options={props.options}
      className="School-search"
      placeholder="Enter a school"
      onChange={props.handleChange}
      styles={{
        menu: (base) => ({
          ...base,
          marginTop: "0px",
        }),
      }}
    />
  </div>
);

export default HomePage;
