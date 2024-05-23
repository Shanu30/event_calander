import React, { useState } from "react";
import randomColor from "randomcolor";
import { Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const EventBox = () => {
  const [position, setPosition] = useState({ x: 0 });
  const [offset, setOffset] = useState({ x: 0 });
  let color = randomColor();

  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left });
  };

  const handleDragEnd = (e) => {
    const newX = e.clientX - offset.x;
    setPosition({ x: newX });
  };

  // const handleEventDelete = (currentDay, currentSource) => {
  //   
  //   const updatedDay = day.filter((item) => item !== currentDay);
  //   const updatedSource = source.filter((item) => item !== currentSource);
  //   setDay(updatedDay);
  //   setSource(updatedSource);
  // };
  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="eventBox"
      style={{
        transform: `translateX(${position.x}px)`,
        backgroundColor: color,
        userselect: "none",
      }}
    >
      <Typography className="eventText">New Event</Typography>
      <DeleteOutlined
        className="deleteIcon"
        // onClick={handleEventDelete(currentDay, currentSource)}
      />
    </div>
  );
};

export default EventBox;
