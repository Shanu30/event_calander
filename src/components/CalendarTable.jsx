import React from "react";
import { Table } from "antd";

const CalendarTable = ({ columns, dataSource }) => {
  return (
    <div className="tableWrapper">
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content", y: 660 }}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default CalendarTable;
