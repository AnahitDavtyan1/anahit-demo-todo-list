import { Col, Button, Card } from "react-bootstrap";

function Task(props) {
  const task = props.data;
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="mt-2 mb-2">
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>Description</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Task;
