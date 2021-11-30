import React, { useState, useEffect } from "react";
import "./Slider.css";
import { connect } from "react-redux";
import { countYear, deleteYear } from "../../reducers/array";

const Slider = ({ start, end, years, month }) => {
  const [slider1, setSlider1] = useState(start);
  const [slider2, setSlider2] = useState(end);
  const [allDate, setAllDate] = useState(false);

  useEffect(() => {
    setBagePosition(
      slider1,
      document.getElementById("slider-1"),
      document.getElementById("slider1__value")
    );
    fillColor();
  }, [slider1]);

  useEffect(() => {
    setBagePosition(
      slider2,
      document.getElementById("slider-2"),
      document.getElementById("slider2__value")
    );
    fillColor();
  }, [slider2]);

  useEffect(() => {
    setBagePosition(
      slider1,
      document.getElementById("slider-1"),
      document.getElementById("slider1__value")
    );
    setBagePosition(
      slider2,
      document.getElementById("slider-2"),
      document.getElementById("slider2__value")
    );
    fillColor();
  }, [years]);

  function setBagePosition(sliderValue, curentSlider, curentPointer) {
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

  const getMonth = month => {
    switch (month) {
      case 0:
        return "Январь";
      case 1:
        return "Февраль";
      case 2:
        return "Март";
      case 3:
        return "Апрель";
      case 4:
        return "Май";
      case 5:
        return "Июнь";
      case 6:
        return "Июль";
      case 7:
        return "Август";
      case 8:
        return "Сентябрь";
      case 9:
        return "Октябрь";
      case 10:
        return "Ноябрь";
      case 11:
        return "Декабрь";
      default:
        return "";
    }
  };

  function fillColor() {
    let percent1 = ((slider1 - start) / (end - start)) * 100;
    let percent2 = ((slider2 - start) / (end - start)) * 100;

    document.getElementById(
      "slider-track"
    ).style.background = `linear-gradient(to right,  #EDF1F8 ${percent1}% , #5CADEA  ${percent1}% , #5CADEA  ${percent2}%,  #EDF1F8 ${percent2}%)`;
  }

  return (
    <>
      <div className="switch">
        <span onClick={()=>setAllDate(false)} className={allDate?"switch__item":"switch__item-active"}>Все года</span>
        <span onClick={()=>setAllDate(true)} className={allDate?"switch__item-active":"switch__item"}>Месеца</span>
      </div>
      <div className="container">
        <div id="slider1__value" className="slider__value">
          <div>{getMonth(new Date(Number(slider1)).getMonth())}</div>
          <div>{new Date(Number(slider1)).getFullYear()}</div>
        </div>
        <div id="slider2__value" className="slider__value-reverse">
          <div>{getMonth(new Date(Number(slider2)).getMonth())}</div>
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
            years.map(year => (
              <>
                <div>{year}</div>
                <div className={"years"} key={year.index}>
                  {allDate && month.map(el => (
                    <div className={"month"}>
                      {el.month === "янв" ? "" : el.month}
                    </div>
                  ))}
                </div>
              </>
            ))}
          <div>{years[years.length - 1] + 1}</div>
        </div>
      </div>
    </>
  );
};

export default connect(({ array }) => array, { countYear, deleteYear })(Slider);
