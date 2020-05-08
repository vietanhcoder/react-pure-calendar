import React, { useState } from "react";
import moment from "moment";
import "./css/styles.css";
const Calendar3 = () => {
  const [dateObject, setDateObject] = useState(moment());
  const [allMonths] = useState(moment.months());

  const weekDaysShort = moment.weekdaysShort();
  const firstDayOfMonth = moment(dateObject).startOf("month").format("d"); // The number of days in week
  const getCurrentDay = Number(dateObject.format("D"));
  const getMonth = dateObject.format("MMM");
  const getYear = dateObject.format("Y");
  // empty days list before the first day of of month
  const emptyDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    const key = `empty-${i}`;
    emptyDays.push(<td key={key} className="calendar-day empty" />);
  }

  // days in month
  const daysInMonth = [];
  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    const currentDay = d === getCurrentDay ? "today" : "";
    daysInMonth.push(
      <td key={d} className={`calendar-day ${currentDay}`}>
        {d}
      </td>
    );
  }

  // Render calendar structure of week days
  const totalSlots = [...emptyDays, ...daysInMonth];
  let rows = []; // Array of hàng ngang
  let cells = []; // array con
  totalSlots.forEach((row, idx) => {
    if (idx % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; //empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (idx === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });
  // tạo 2 array cha và con,
  // trường hợp array con đủ 7 phần tử thì nhét vô array con vào array cha + reset array con

  const selectedMonth = (month) => () => {
    const monthNo = allMonths.indexOf(month); // get month number
    let newObj = { ...dateObject };
    newObj = moment(dateObject).set("month", monthNo); // change month value
    console.log("OUTPUT: slelectedMonth -> newObj", newObj);
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

  const renderDaysInMonth = rows.map((d, idx) => {
    return <tr key={idx}>{d}</tr>;
  });

  //handle function render
  const _handleClickMonth = () => {
    console.log("show list month");
  };
  const _handleClickYear = () => {
    console.log("show list year");
  };
  // End of function Render
  return (
    <div>
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
        <i className="fa fa-arrow-left"></i>
        <i className="fa fa-arrow-right"></i>
      </div>
      <div className="calendar-date">
        <table className="calendar-month">
          <thead>
            <tr>
              <th colSpan="4">Select a Month</th>
            </tr>
          </thead>
          <tbody>{renderMonthsList()}</tbody>
        </table>
        <table className="calendar-day">
          <thead>
            <tr>
              {weekDaysShort.map((day) => (
                <th key={day} className="week-day">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderDaysInMonth}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar3;
