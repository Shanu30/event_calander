import { useState } from "react";
import "./App.css";
import { Table, Typography, Dropdown } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const dataSource = [
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
  {
    title: "First row",
    dataIndex: "firstRow",
    key: "firstRow",
    width: 20,
  },
];

const columns = [
  {
    title: "",
    dataIndex: "firstColumn",
    key: "firstColumn",
    fixed: "left", // Fix the first column when scrolling left
    width: 150,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
  {
    title: "First Column",
    dataIndex: "firstColumn",
    key: "firstColumn",
    width: 100,
  },
];

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleCalendarModal = () => {
    isCalendarOpen ? setIsCalendarOpen(false) : setIsCalendarOpen(true);
  };
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
      <div
        style={{
          height: "60px",
          padding: "0 15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#F7F7F7",
        }}
      >
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
          <div
            onClick={(e) => e.preventDefault()}
            style={{ cursor: "pointer", color: "#007aff", fontSize: "25px" }}
          >
            {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </div>
        </Dropdown>
        <div style={{ display: "flex", gap: "5px" }}>
          <LeftOutlined
            style={{ color: "#007aff", fontSize: "20px", cursor: "pointer" }}
            onClick={() => handlePrev()}
          />
          <Typography
            style={{ color: "#007aff", fontSize: "15px" }}
            onClick={() => handleCurrentDay()}
          >
            Today
          </Typography>
          <RightOutlined
            style={{ color: "#007aff", fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleNext()}
          />
        </div>
      </div>
      {/* {isCalendarOpen && <Calendar onChange={setDate} value={date} />} */}
      {/* <Table
      width={100}
      dataSource={dataSource}
      columns={columns}
      // scroll={{ x: 50, y: 150 }}
      bordered
      sticky */}
      {/* /> */}
    </>
  );
}

export default App;
