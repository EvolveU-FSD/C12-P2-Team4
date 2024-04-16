import React from "react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { format } from "date-fn";

const Calendar = () => {
  //tracks the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  //renders the date in the currently visable month.
  const [activeDate, setActiveDate] = useState(new Date());
  const getHeader = () => {
    return (
      <div className="header">
        <div className="todayButton">Today</div>
        <AiOutlineLeft className="navIcon" />
        <AiOutlineRight className="navIcon" />
        <h2 className="currentMonth">{format(activeDate, "MMMM yyyy")}</h2>
      </div>
    );
  };
  const getWeekDaysNames = () => {};
  const getDates = () => {};

  return (
    <section>
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
    </section>
  );
};

export default Calendar;
