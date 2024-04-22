import React, { useState } from "react";
import NavBar from "../../components/ReusableComponents/NavBar";
import Footer from "../../components/Footer/Footer";
import DayView from "../Calendar/DayView";
import AddEvent from "../Calendar/AddEvent";
import "./calendar.css";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";

const Calendar = () => {
  //Keeps track of selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Renders the dates in the currently visible month
  const [activeDate, setActiveDate] = useState(new Date());
  //Function to navigate to the previous month
  const getHeader = () => {
    return (
      <div className="header">
        <div
          className="todayButton"
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}
        >
          Today
        </div>
        <ChevronDoubleLeftIcon
          className="navIcon"
          onClick={() => setActiveDate(subMonths(activeDate, 1))}
        />
        <ChevronDoubleRightIcon
          className="navIcon"
          onClick={() => setActiveDate(addMonths(activeDate, 1))}
        />
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
        <div key={day} className="day weekNames">
          {format(addDays(weekStartDate, day), "E")}
        </div>
      );
    }
    //need a key for each child element
    return <div className="weekContainer1">{weekDays}</div>;
  };
  //generates the dates for the current week and highlights today's date.
  const generateDatesForCurrentWeek = (
    date,
    selectedDate,
    activeDate,
    weekIndex
  ) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div
          key={`${weekIndex}-${day}`}
          className={`day ${
            isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"
          } ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
        ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
          onClick={() => {
            setSelectedDate(cloneDate);
          }}
        >
          {format(currentDate, "d")}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return week;
  };
  //checks the start and end of the week and generates the start of the next month.
  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    let weekIndex = 0;
    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(
          currentDate,
          selectedDate,
          activeDate,
          weekIndex
        )
      );
      currentDate = addDays(currentDate, 7);
      weekIndex++;
    }

    return <div className="weekContainer2">{allWeeks.flat()}</div>;
  };

  return (
    <>
      <NavBar />
      <div className="flex bg-secondary-gold">
        <section className="calendar-section m-2 font-bold">
          {getHeader()}
          {getWeekDaysNames()}
          {getDates()}
        </section>
        {/* <AddEvent selectedDate={selectedDate} /> */}
        <div className="singleDayView flex mt-4 gap-2 ">
          <DayView selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Calendar;
