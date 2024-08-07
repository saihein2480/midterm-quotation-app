import React from "react";
import { Container, Table } from "react-bootstrap";

const DataTable = ({ data, onDelete }) => {
  const handleDelete = (index) => {
    onDelete(index);
  };

  const totalDiscount = data.reduce((acc, item) => acc + item.discount, 0);
  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Discount</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <i
                  className="bi bi-trash"
                  onClick={() => handleDelete(index)}
                  style={{ cursor: 'pointer', color: 'red' }}
                ></i>
              </td>
              <td>{item.quantity}</td>
              <td>{item.name}</td>
              <td>{item.discount}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"></td>
            <td>Total Discount</td>
            <td>{totalDiscount}</td>
          </tr>
          <tr>
            <td colSpan="3"></td>
            <td>Total Amount</td>
            <td>{totalAmount}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

export default DataTable;
