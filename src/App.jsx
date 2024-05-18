import { useState, useEffect } from "react";
import "./App.css";
import { Table, Typography, Dropdown } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function App() {
  const [date, setDate] = useState(new Date());
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const currentDate = date;
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const getDatesOfMonth = (month, year) => {
      console.log(year);
      console.log(month);
      console.log(currentDate);
      const dates = [];
      const formatter = new Intl.DateTimeFormat("en", {
        day: "numeric",
        weekday: "short",
      });
      const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= lastDateOfMonth; i++) {
        const currentDate = new Date(year, month, i);
        const formattedDate = formatter.format(currentDate);
        dates.push({
          date: formattedDate,
          isCurrentDate: isSameDate(currentDate, new Date()),
        });
      }

      return dates;
    };
    const isSameDate = (date1, date2) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const listOfDates = getDatesOfMonth(currentMonth, currentYear);

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
      "Resource K",
      "Resource K",
      "Resource K",
      "Resource K",
      "Resource K",
      "Resource K",
      "Resource K",
    ];

    const newColumns = [
      {
        title: "",
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

    const newDataSource = resourceTitles.map((resource, resourceIndex) => {
      const resourceData = { key: resourceIndex, resource };

      listOfDates.forEach((_, index) => {
        resourceData[`date${index}`] = "";
      });

      return resourceData;
    });

    setColumns(newColumns);
    setDataSource(newDataSource);
  }, [date]);
  const handleCurrentDay = () => {
    setDate(new Date());
  };
  const handlePrev = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };
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
    </>
  );
}

export default App;
