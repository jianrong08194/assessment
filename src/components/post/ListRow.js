import { Card,Col,Badge, Button , Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
const ListRow = (props) => {
    return <Card key={props.post.id}>
    <Card.Header> 
    <Row>
      {props.post.categories.map((category => {
        return (   
        <Col lg="2" key={category.id} >
        <Badge bg={props.search === category.name? "info" : "secondary"}>{category.name}</Badge>
        </Col>
        )
      }))}
      </Row>
    </Card.Header>
    <Card.Body>
      <Card.Title>{props.post.title}</Card.Title>
      <Card.Text>
      {props.post.summary}
      </Card.Text>
      <Card.Text> {props.post.author.name}</Card.Text>
      <Card.Text> {props.post.publishDate}</Card.Text>
      <Button variant="outline-primary" as={Link}  to={`${props.post.id}/detail/`}> View</Button>
    </Card.Body>
    </Card> 
}

export default ListRow;