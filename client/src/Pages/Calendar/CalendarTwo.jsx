import React, { useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { format, startOfWeek, addDays } from "date-fns";

const Calendar = () => {
  //Keeps track of selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Renders the dates in the currently visible month
  const [activeDate, setActiveDate] = useState(new Date());

  <getHeader />;
  const getHeader = () => {
    return (
      <div className="header">
        <div className="todayButton">Today</div>
        <ChevronDoubleLeftIcon className="navIcon" />
        <ChevronDoubleRightIcon className="navIcon" />
        <h2 className="currentMonth">{format(activeDate, "MMM yyyy")}</h2>
      </div>
    );
  };
  //populates the days of the week.
  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div className="day weekNames">
          {format(addDays(weekStartDate, day), "E")}
        </div>
      );
    }
    return <div className="weekContainer">{weekDays}</div>;
  };

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
