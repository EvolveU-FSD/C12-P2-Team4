import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { format } from "date-fns";

const Calendar = () => {
  //Keeps track of selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Renders the dates in the currently visible month
  const [activeDate, setActiveDate] = useState(new Date());

  const getHeader = () => {
    return (
      <div className="header">
        <div className="todayButton">Today</div>
        <AiOutlineLeft className="navIcon" />
        <AiOutlineRight className="navIcon" />
        <h2 className="currentMonth">{format(activeDate, "MMM yyyy")}</h2>
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
