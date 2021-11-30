import React, { useState, useEffect } from "react";
import "./Slider.css";
import { connect } from "react-redux";
import { countYear, deleteYear } from "../../reducers/array";

const Slider = ({ start, end, years, month }) => {
  const [slider1, setSlider1] = useState(start);
  const [slider2, setSlider2] = useState(end);
  const [allDate, setAllDate] = useState(false);
  const [, setWindowWidth] = useState(0);
  const [, setWindowHeight] = useState(0);
  const Month=["Январь","Февраль","Март","Апрель","Май","Июнь", "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

  useEffect(() => {
    function fillColor() {
      let percent1 = ((slider1 - start) / (end - start)) * 100;
      let percent2 = ((slider2 - start) / (end - start)) * 100;

      document.getElementById(
        "slider-track"
      ).style.background = `linear-gradient(to right,  #EDF1F8 ${percent1}% , #5CADEA  ${percent1}% , #5CADEA  ${percent2}%,  #EDF1F8 ${percent2}%)`;
    }

    function setLabelPosition(sliderValue, curentSlider, curentPointer) {
      if (curentSlider && curentPointer) {
        const position =
          ((sliderValue - parseInt(curentSlider.min)) /
            (parseInt(curentSlider.max) - parseInt(curentSlider.min))) *
          100;
        curentPointer.style.left = position + "%";
        curentPointer.style.marginLeft = -curentPointer.offsetWidth / 2 + "px";
        fillColor();
      }
    }
    setLabelPosition(
      slider1,
      document.getElementById("slider-1"),
      document.getElementById("slider1__value")
    );
    setLabelPosition(
      slider2,
      document.getElementById("slider-2"),
      document.getElementById("slider2__value")
    );
     fillColor();
  }, [slider1,slider2,start,end]);

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  function checkWidth() {
    let array = document.getElementsByClassName("years");

    if (array[0] && array[0].offsetWidth < 270) {
      for (const c of array) {
        c.style.opacity = "0";
      }
    } else {
      for (const c of array) {
        c.style.opacity = "1";
      }
    }
  }
checkWidth();

  return (
    <>
      <div className="switch">
        <span
          onClick={() => setAllDate(false)}
          className={allDate ? "switch__item" : "switch__item-active"}
        >
          Все года
        </span>

        <span
          onClick={() => setAllDate(true)}
          className={allDate ? "switch__item-active" : "switch__item"}
        >
          Месеца
        </span>
      </div>

      <div className="container">
        <div id="slider1__value" className="slider__value">
          <div>{Month[(new Date(Number(slider1)).getMonth())]}</div>
          <div>{new Date(Number(slider1)).getFullYear()}</div>
        </div>

        <div id="slider2__value" className="slider__value-reverse">
          <div>{Month[new Date(Number(slider2)).getMonth()]}</div>
          <div>{new Date(Number(slider2)).getFullYear()}</div>
        </div>

        <div className="slider-track" id={"slider-track"} />
        <input
          list="year"
          type="range"
          min={start}
          max={end}
          id="slider-1"
          value={slider1}
          onChange={e => setSlider1(e.target.value)}
        />
        <input
          type="range"
          min={start}
          max={end}
          id="slider-2"
          value={slider2}
          onChange={e => setSlider2(e.target.value)}
        />
        <div className="year-container">
          {years &&
            years.map((year,index) => (
              <React.Fragment key={index}>
               {year}
                <div className={"years"}>
                  {allDate &&
                    month.map((el,index) => (
                      <div className={"month"} key={index}>
                        {el.month === "янв" ? "" : el.month}
                      </div>
                    ))}
                </div>
              </React.Fragment>
            ))}

          {years[years.length - 1]  &&years[years.length - 1] + 1}
        </div>
      </div>
    </>
  );
};

export default connect(({ array }) => array, { countYear, deleteYear })(Slider);
