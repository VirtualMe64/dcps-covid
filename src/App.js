import "./App.css";
import SummaryPage from "./Pages/Summary";
import HomePage from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/summary" component={SummaryPage} />
      </Switch>
    </Router>
  );
};

export default App;
