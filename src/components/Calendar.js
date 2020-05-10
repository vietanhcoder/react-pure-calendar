import React, { useState } from "react";
import moment from "moment";
import "./css/styles.css";
import uuid from "react-uuid";
// https://momentjs.com/docs/
const Calendar = () => {
  const [dateObject, setDateObject] = useState(moment());
  const [allMonths] = useState(moment.months());

  const weekDaysShort = moment.weekdaysShort();
  const firstDayOfMonth = moment(dateObject).startOf("month").format("d"); // The number of days in week

  const getCurrentDay = Number(dateObject.format("D"));
  const getMonth = dateObject.format("MMM");
  const getYear = dateObject.format("Y");
  // empty days list before the first day of of month

  // moment("2012-02", "YYYY-MM")
  // https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/10-days-in-month/

  // Render calendar structure of week days

  const RenderAllDays = () => {
    const allSlots = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      allSlots.push(<div key={uuid()} className="calendar-day empty"></div>);
    }
    for (let d = 1; d <= dateObject.daysInMonth(); d++) {
      const currentDay = d === getCurrentDay ? "today" : "";
      allSlots.push(
        <div key={uuid()} className={`calendar-day ${currentDay}`}>
          {d}
        </div>
      );
    }
    return allSlots.map((d, idx) => {
      return (
        <div key={idx} className="day-in-month">
          {d}
        </div>
      );
    });
  };
  const selectedMonth = (month) => () => {
    const monthNo = allMonths.indexOf(month); // get month number
    let newObj = moment(dateObject).set("month", monthNo).clone(); // change month value
    setDateObject(newObj);
  };

  const renderMonthsList = () => {
    const months = [];
    let rows = [];
    let cells = [];
    allMonths.map((data) => {
      months.push(
        <td key={data} onClick={selectedMonth(data)}>
          <span>{data}</span>
        </td>
      );
    });

    months.forEach((row, idx) => {
      if (idx % 3 !== 0 || idx === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells); //add last row

    return rows.map((d, idx) => {
      return <tr key={idx}>{d}</tr>;
    });
  };
  // sua lai render thanh the div - render day inmonth, day in week,

  //handle function render
  const _handleClickMonth = () => {
    console.log("show list month");
  };
  const _handleClickYear = () => {
    console.log("show list year");
  };
  // https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/10-days-in-month/
  const _handlePrevMonth = () => {
    // const monthNo = allMonths.indexOf(
    //   dateObject.subtract(1, "month").format("MMMM")
    // );
    let newObj = moment(dateObject).subtract(1, "month").clone();
    setDateObject(newObj);
  };
  const _handleNextMonth = () => {
    let newObj = moment(dateObject).add(1, "month").clone();
    setDateObject(newObj);
  };

  // End of function Render
  return (
    <div className="calendar-wrapper">
      <div className="tail-datetime-calendar">
        <div className="calendar-navi calendar-year">
          <span
            data-tail-navi="switch"
            className="calendar-label"
            onClick={_handleClickYear}
          >
            {getYear}
          </span>
        </div>
        <div className="calendar-navi">
          <span
            data-tail-navi="switch"
            className="calendar-label"
            onClick={_handleClickMonth}
          >
            {getMonth}
          </span>
        </div>
      </div>
      <div className="icon-nav-month-wrapper">
        <i className="fa fa-arrow-left" onClick={_handlePrevMonth}></i>
        <i className="fa fa-arrow-right" onClick={_handleNextMonth}></i>
      </div>
      <div className="calendar-date">
        {/* <table className="calendar-month">
          <thead>
            <tr>
              <th colSpan="4">Select a Month</th>
            </tr>
          </thead>
          <tbody>{renderMonthsList()}</tbody>
        </table> */}
        <div className="calendar-full-day">
          <RenderAllDays />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
