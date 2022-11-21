import React, { useEffect, useState } from "react";
import { Button, Card, Col, Stack, Image,Row,Fade } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";
import {getPost} from '../../api.js'
import {Center} from '../Center.js'
  
function Detail(){

    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [categories,setCategories] = useState([]);
    const [author,setAuthor] = useState([]);
    
    useEffect(() => {
        getPost(id).then((result) => {
            setPost(result);
            setCategories(result.categories);
            setAuthor(result.author)
      })
    }, [])

    return<Center>
        <Card>
            <Card.Body>
                <Row>
                    <Col c lg="1"><Image thumbnail={true} src={author.avatar}></Image></Col>
                    <Col><h5 className="text-muted">{author.name}</h5></Col>
                </Row>
            <Card.Title></Card.Title>
                <Card.Title><span className="">{post.title}</span></Card.Title>
                <Card>
                    <Card.Body>
                    <Stack gap={2}>
                    <div>
                    <Card.Title>Summary</Card.Title>
                    {post.summary}
                    </div>
                    <div>
                    <Card.Title>Publish Date</Card.Title>
                    {post.publishDate}
                    </div>
                    <div>
                    <Card.Title>Categories</Card.Title>
                        <ul>
                        {categories.map(category => {
                            return (

                                <Fade in={true} appear={true} >
                                <li key={category.id}>{category.name}</li>
                                </Fade>
                            )
                        })}
                        </ul>
                    </div>
                    </Stack>
                    </Card.Body>
                </Card> 
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-primary" as={Link}  to={`/`}> Back</Button>
            </Card.Footer>
            </Card>
        </Center> 
}

export default Detail;