import React from "react";
import { Table } from "antd";

const CalendarTable = ({ columns, dataSource }) => {
  const onCellClick = (record, rowIndex, columnIndex) => {
    // Get the column header text
    const columnHeader = columns[columnIndex].title;

    // Get the row header text
    const rowHeader = record[columns[0].dataIndex];

    // Get the value of the first cell in the row
    const firstCellValue = record[columns[0].dataIndex];

    // Display the extracted values (you can modify this based on your requirements)
    console.log("Column Header: " + columnHeader);
    console.log("Row Header: " + rowHeader);
    console.log("Value of First Cell: " + firstCellValue);
  };
  return (
    <div className="tableWrapper">
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content", y: 660 }}
        pagination={false}
        bordered
        headerClassName="tableHeader"
        onCell={() => ({
          onClick: () => onCellClick(record, rowIndex, 0),
        })}
      />
    </div>
  );
};

export default CalendarTable;
