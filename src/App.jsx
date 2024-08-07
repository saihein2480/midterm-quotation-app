import { useState, useRef } from "react";
import accessoryData from "./product.json";
import DataTable from "./components/DataTable";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);
  const [price, setPrice] = useState(accessoryData[0].price);
  const quantityRef = useRef();
  const productRef = useRef();
  const discountRef = useRef();

  const search = (keyword) => {
    setFilteredSelectedItems(
      selectedItems.filter(item => item.name.includes(keyword))
    );
  };

  const handleSubmit = () => {
    const productId = parseInt(productRef.current.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    const quantity = parseInt(quantityRef.current.value);
    const discount = parseFloat(discountRef.current.value);
    const order = {
      ...product,
      quantity,
      discount,
      amount: product.price * quantity - discount,
    };

    const existingItemIndex = selectedItems.findIndex(
      item => item.name === order.name && item.price === order.price
    );

    if (existingItemIndex > -1) {
      selectedItems[existingItemIndex].quantity += quantity;
      selectedItems[existingItemIndex].discount += discount;
      selectedItems[existingItemIndex].amount += order.amount;
    } else {
      selectedItems.push(order);
    }

    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    setPrice(product.price);
  };

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  const clearItems = () => {
    setSelectedItems([]);
    setFilteredSelectedItems([]);
  };

  return (
    <>
      <Container className="my-4">
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Item:</Form.Label>
                <Form.Control as="select" ref={productRef} onChange={updatePrice}>
                  {accessoryData.map((accessory, index) => (
                    <option key={index} value={accessory.id}>
                      {accessory.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Price Per Unit:</Form.Label>
                <Form.Control readOnly value={price} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type="number" ref={quantityRef} defaultValue={1} min={1} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Discount:</Form.Label>
                <Form.Control type="number" min={0} ref={discountRef} defaultValue={0} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button className="mt-2" onClick={handleSubmit}>Add</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <Row>
          <Col>
            <Button variant="danger" className="mb-2" onClick={clearItems}>Clear</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable 
              data={filteredSelectedItems} 
              onDelete={deleteItemByIndex}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
