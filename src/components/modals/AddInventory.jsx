import React, { useState } from "react";
import { Modal } from "rsuite";

function AddInventory({ open, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const handleChange = (value, event) => {
    const { name } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Add logic to save inventory data
    console.log(formData);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} size="md">
      {/* <Modal.Header>
        <Modal.Title>Add New Inventory Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <FormGroup>
            <label>Item Name</label>
            <div
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
            />
          </FormGroup>
          <FormGroup>
            <label>Quantity</label>
            <div
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </FormGroup>
          <FormGroup>
            <label>Price</label>
            <div
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary">
          Save
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddInventory;
