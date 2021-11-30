import "./App.css";

import { connect } from "react-redux";
import React, { useEffect } from "react";
import Slider from "./components/Slider/Slider";
import { countYear, deleteYear } from "./reducers/array";

function App(props) {
  let dateStart, dateEnd;
  dateStart = new Date(2015, 0, 1);
  dateEnd = new Date(2016, 11, 31);

  useEffect(() => {
    props.deleteYear();
    props.countYear(dateStart, dateEnd);
  }, []);

  return (
    <div className="App">
      { dateStart&&dateEnd&& <Slider start={dateStart.getTime()} end={dateEnd.getTime()} />}

    </div>
  );
}
export default connect(({ array }) => array, { countYear, deleteYear })(App);
