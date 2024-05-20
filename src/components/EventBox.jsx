import React, { useState } from "react";
import randomColor from "randomcolor";

const EventBox = () => {
  const [position, setPosition] = useState({ x: 0 });
  const [offset, setOffset] = useState({ x: 0 });

  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left });
  };

  const handleDragEnd = (e) => {
    const newX = e.clientX - offset.x;
    setPosition({ x: newX });
  };
  let color = randomColor();

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        transform: `translateX(${position.x}px)`,
        borderRadius: "5px",
        backgroundColor: color,
        padding: "5px 12px",
        zIndex: 2,
        textAlign: "center",
        position: "absolute",
        top: 0,
        cursor: "grab",
        userselect: "none",
        fontWeight: "bold",
      }}
    >
      New Event
    </div>
  );
};

export default EventBox;
