import React, { useEffect, useState } from "react";
import {getPosts,getCategories} from '../../api.js'
import { Container,Collapse,Form, Stack } from "react-bootstrap";
import { slice } from 'lodash'
import ListRow  from './ListRow'

function Posts(props){
  
  const [posts,setPosts] = useState([])
  const [filteredPost, setFilteredPost] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(5)
  const [search, setSearch] = useState('');
  const [postList, setPostList] = useState([])
  const [categories,setCategories] = useState([])
  const [transition, setTransition] = useState(true)

  const setData = () =>{
    getPosts().then((result) => {
      setPosts(result.posts)
      setPostList(slice(result.posts, 0, index))
      setFilteredPost(result.posts);
    })

    getCategories().then((result) => {
      setCategories(result)
    })
  }

  const loadMore = () => {
      setIndex(index + 5)
      if (index >= filteredPost.length) {
        setIsCompleted(true)
      } else {
        setIsCompleted(false)
      }
      setPostList(slice(filteredPost, 0, index))
    }

  const searchByCategory = (value) => { 
    setSearch(value);
    setPostList([]);
    setTransition(false);

    if(value === 'All'){ 
      setPostList(slice(posts, 0, 5))
      setIsCompleted(false)
      console.log(slice(posts, 0, 5));
    }else{
      setPostList(slice(posts.filter((post) => {
        return post.categories.map((category) => {
          if(category.name.toLowerCase().includes(value.toLowerCase()))
            return true
          return false
        }).includes(true)  
      }), 0, 5))
      setFilteredPost(posts.filter((post) => {
        return post.categories.map((category) => {
          if(category.name.toLowerCase().includes(value.toLowerCase()))
            return true
          return false
        }).includes(true)  
      }))
      setIsCompleted(false)
    }

  }
    useEffect(() => {
      setData()
    }, [])
    
    useEffect(() => {
      setTransition(true);
    }, [postList])

  return <Container>
    <Stack gap={2}>
    <Form.Select onChange={ event => searchByCategory(event.target.value)}>
    <option defaultValue="All">All</option>  
      {categories.map((category,index) =>{
        return <option  value={category}  key={index}>{category}</option>  
      })
      }
    </Form.Select>
    <Stack gap={2}>
  
      {postList.map((post) => {
        return ( 
          <Collapse in={transition} appear={transition} >
            <div>
            <ListRow post={post} search={search} />
            </div>
            </Collapse>

        )
      })}
   
    </Stack>
    <div className="d-grid mt-3 mb-5">
        {isCompleted ? (
          <button
            onClick={loadMore}
            type="button"
            className="btn btn-danger disabled"
          >
            That's It
          </button>
        ) : (
          <button onClick={loadMore} type="button" className="btn btn-danger">
            Load More +
          </button>
        )}
    </div> 
    </Stack>
    </Container>
}



export default Posts;