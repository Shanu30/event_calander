import React from "react";
import { Dropdown, Typography } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const TopBar = ({ date, setDate }) => {
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
  );
};

export default TopBar;
