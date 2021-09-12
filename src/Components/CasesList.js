import colors from "../colors";

const CasesList = (props) => {
  return (
    <div>
      {props.caseData.map((letter) => {
        return <CaseItem letter={letter} key={letter.url} />;
      })}
    </div>
  );
};

const CaseItem = (props) => {
  return (
    <div
      style={{
        width: "80vw",
        border: "1px solid black",
      }}
    >
      <a
        href={props.letter.url}
        style={{ textDecoration: "none", color: "black" }}
      >
        {props.letter.school}
      </a>
    </div>
  );
};

export default CasesList;
