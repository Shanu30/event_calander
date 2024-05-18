import { useState, useEffect } from "react";
import "./App.css";
import { Table, Typography, Dropdown, Button, Input, Modal } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [date, setDate] = useState(new Date());
  const [columns, setColumns] = useState([]);
  let initialDataSource = [
    { key: uuidv4(), resource: "task1" },
    { key: uuidv4(), resource: "task2" },
  ];
  // setting the initial dataSource from localStorage
  try {
    const storedData = localStorage.getItem("dataSource");
    if (storedData) {
      initialDataSource = JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [isAddResource, setIsAddResource] = useState(false);
  const [inputResource, setInputResource] = useState("");

  const showAddResourceModal = () => {
    setIsAddResource(true);
  };
  // Add method for dataSource.
  const CreateAddResource = () => {
    if (inputResource.trim() !== "") {
      const newRow = { key: uuidv4(), resource: inputResource };
      setDataSource([...dataSource, newRow]);
      setInputResource("");
    }
    setIsAddResource(false);
  };
  const handleCancel = () => {
    setIsAddResource(false);
  };
  // here setting the updated dataSource in localStorage
  useEffect(() => {
    localStorage.setItem("dataSource", JSON.stringify(dataSource));
  }, [dataSource]);
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
      })),
    ];
    setColumns(newColumns);
  }, [date]);
  // method to jump on current date
  const handleCurrentDay = () => {
    setDate(new Date());
  };
  // method to jump on previous date
  const handlePrev = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };
  // method to jump on next date
  const handleNext = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };
  return (
    <>
      <div className="topBar">
        <Dropdown
          overlay={
            <Calendar
              onChange={setDate}
              value={date}
              style={{ border: "none" }}
            />
          }
          trigger={["click"]}
          placement="bottomLeft"
          arrow
        >
          <div className="titleText" onClick={(e) => e.preventDefault()}>
            {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </div>
        </Dropdown>
        <div className="topBarRightSection">
          <LeftOutlined className="nxtPrevIcon" onClick={() => handlePrev()} />
          <Typography className="todayBtn" onClick={() => handleCurrentDay()}>
            Today
          </Typography>
          <RightOutlined className="nxtPrevIcon" onClick={() => handleNext()} />
        </div>
      </div>
      <div className="tableWrapper">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content", y: 660 }}
          pagination={false}
          bordered
          headerClassName="tableHeader"
        />
      </div>
      <Modal
        title="Add Resource"
        open={isAddResource}
        onOk={CreateAddResource}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          value={inputResource}
          onChange={(e) => setInputResource(e.target.value)}
          placeholder="Enter the name of Resource"
        />
      </Modal>
    </>
  );
}

export default App;
