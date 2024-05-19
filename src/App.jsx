import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import CalendarTable from "./components/CalendarTable.jsx";
import TopBar from "./components/TopBar.jsx";
import AddResourceModal from "./components/modals/AddResourceModal.jsx";
import randomColor from "randomcolor";

function App() {
  const [date, setDate] = useState(new Date());
  const [columns, setColumns] = useState([]);
  const [day, setDay] = useState("");
  const [source, setSource] = useState("");
  let initialDataSource = [];
  let initialEvents = [];
  // getting the initial dataSource from localStorage
  try {
    const storedDataSource = localStorage.getItem("dataSource");
    const storedEvents = localStorage.getItem("events");
    if (storedDataSource) {
      initialDataSource = JSON.parse(storedDataSource);
    }
    if (storedEvents) {
      initialEvents = JSON.parse(storedEvents);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [dataSource, setDataSource] = useState([initialDataSource]);
  const [events, setEvents] = useState([initialEvents]);
  const [isAddResource, setIsAddResource] = useState(false);
  const [inputResource, setInputResource] = useState("");
  let color = randomColor();

  const showAddResourceModal = () => {
    setIsAddResource(true);
  };
  const handleEventAdd = (day, resource) => {
    const newEvent = {
      id: uuidv4(),
      day,
      resource,
    };
    setEvents([...events, newEvent]);
  };

  const handleEventDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };
  // here setting the updated dataSource in localStorage
  useEffect(() => {
    localStorage.setItem("dataSource", JSON.stringify(dataSource));
    localStorage.setItem("events", JSON.stringify(events));
  }, [dataSource, events]);
  useEffect(() => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    //method for getting all the dates of month
    const getDatesOfMonth = (month, year) => {
      const dates = [];
      //formating date table header.
      const formatter = new Intl.DateTimeFormat("en", {
        day: "numeric",
        weekday: "short",
      });
      const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= lastDateOfMonth; i++) {
        const currentDate = new Date(year, month, i);
        const formattedDate = formatter.format(currentDate);
        //pushing all the dates of month in an array to display in table header cells.
        dates.push({
          date: formattedDate,
          isCurrentDate: isSameDate(currentDate, new Date()),
        });
      }

      return dates;
    };
    //method to check the date is same or not.
    const isSameDate = (date1, date2) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };
    const listOfDates = getDatesOfMonth(currentMonth, currentYear);
    //defining the columns for table.
    const newColumns = [
      {
        title: (
          <Button type="primary" onClick={showAddResourceModal}>
            + Resources
          </Button>
        ),
        dataIndex: "resource",
        key: "resource",
        fixed: "left",
        width: 150,
        className: "resourceTitle",
      },
      ...listOfDates.map((dateInfo, index) => ({
        title: (
          <div className={dateInfo.isCurrentDate ? "currentDate" : ""}>
            {dateInfo.date}
          </div>
        ),
        dataIndex: `date${index}`,
        key: `date${index}`,
        width: 100,
        render: (_, record) => {
          if (dateInfo.date === day && record.resource === source) {
            return (
              <div
                style={{
                  borderRadius: "5px",
                  backgroundColor: color,
                  padding: "5px 10px ",
                }}
              >
                New Event
              </div>
            );
          }
        },
        onCell: (record) => ({
          onClick: () => {
            setDay(dateInfo.date);
            setSource(record.resource);
            handleEventAdd(dateInfo.date, record.resource);
          },
        }),
      })),
    ];
    const resourceTitles = [
      "Resource A",
      "Resource B",
      "Resource C",
      "Resource D",
      "Resource E",
      "Resource F",
      "Resource G",
      "Resource H",
      "Resource I",
      "Resource J",
      "Resource K",
    ];
    const newDataSource = resourceTitles.map((resource, resourceIndex) => {
      const resourceData = { key: resourceIndex, resource };
      // listOfDates.forEach((_, index) => {
      //   resourceData[`date${index}`] = "+";
      // });
      // const lastDate = listOfDates.length;
      // for (let i = 1; i <= lastDate; i++) {
      //   if (events.day === listOfDates.date) {
      //     resourceData["event"] = "New Event";
      //   }
      // }
      return resourceData;
    });
    setColumns(newColumns);
    setDataSource(newDataSource);
  }, [date, events]);
  return (
    <>
      <TopBar date={date} setDate={setDate} />
      <CalendarTable columns={columns} dataSource={dataSource} />
      <AddResourceModal
        isAddResource={isAddResource}
        setIsAddResource={setIsAddResource}
        dataSource={dataSource}
        setDataSource={setDataSource}
        inputResource={inputResource}
        setInputResource={setInputResource}
      />
    </>
  );
}

export default App;
