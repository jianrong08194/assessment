import React, { useEffect, useState } from "react";
import {getPosts,getCategories} from '../../api.js'
import { Container,Collapse,Form, Stack } from "react-bootstrap";
import { slice } from 'lodash'
import ListRow  from './ListRow'

function Posts(){

  const [posts,setPosts] = useState([])
  const [index, setIndex] = useState(5)
  const [search, setSearch] = useState('');
  const [postList, setPostList] = useState([])
  const [categories,setCategories] = useState([])
  const [transition, setTransition] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [filteredPost, setFilteredPost] = useState([])


  const setData = () =>{
    // get posts data from api.js
    getPosts().then((result) => {
      setPosts(result.posts)
      setPostList(slice(result.posts, 0, index))
      setFilteredPost(result.posts);
    })
    // get all categories from api.js, for fitler select option
    getCategories().then((result) => {
      setCategories(result)
    })
  }

  const loadMore = () => {
      if (index >= filteredPost.length) {
        //disable load more if list index already exceed fitlered post length
        setIsCompleted(true)
      } else { 
        setIsCompleted(false)
        setIndex(index+5);
        // list load additional 5 more post
        setPostList(slice(filteredPost, 0, index+5))
      }
    }

  const searchByCategory = (value) => { 
    setSearch(value);
    setIndex(5)

    if(value === 'All'){ 
      // if selected 'All' reset everything
      setPostList(slice(posts, 0, 5))
      setIsCompleted(false)
      setFilteredPost(posts);
    }else{
      // Display List of post that include category selected 
      setPostList(slice(posts.filter((post) => {
        return post.categories.map((category) => {
          /* category is an object array of post
             return true whenever a post's category include selected category
          */
          if(category.name.toLowerCase().includes(value.toLowerCase()))
            return true
          return false
        }).includes(true)  
        // slide 0 to 5 is to reset list whenever category changes
      }), 0, 5))

      // Similar logic , for loadMore  
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
    {/* Load More button */}
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