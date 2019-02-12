import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post.js';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios
      .get(`https://practiceapi.devmountain.com/api/posts`)
      .then( (res) => {
        let data = res.data;
        console.log(data);
        this.setState({
          posts: data
        })
      })
  }

  updatePost(id, text) {
    // Basically, the id and text of a post is unique, we need to use that specificity to update only certain posts. The {text} is what we want to update it to, so that goes in as a second parameter to the .put request.
    axios
    .put(`https://practiceapi.devmountain.com/api/posts/id=${id}/`, {text})
    .then( (res) => {
      this.setState({ posts: res.data })
    })


  }

  deletePost() {

  }

  createPost() {

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          {
            posts.map( post => {
              <Post key={ post.id } text={post.text} date={post.date} updatePostFn = {this.updatePost} id={post.id}/>
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
