import React from "react";
import { Modal, Input } from "antd";
import { v4 as uuidv4 } from "uuid";

const AddResourceModal = ({
  isAddResource,
  setIsAddResource,
  dataSource,
  setDataSource,
  inputResource,
  setInputResource,
}) => {
  const CreateAddResource = () => {
    if (inputResource.trim() !== "") {
      const newRow = {
        key: uuidv4(),
        resource: inputResource[0].toUpperCase() + inputResource.slice(1),
      };
      setDataSource([...dataSource, newRow]);
      setInputResource("");
    }
    setIsAddResource(false);
  };
  const handleCancel = () => {
    setIsAddResource(false);
  };
  return (
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
  );
};

export default AddResourceModal;
