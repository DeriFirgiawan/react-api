import React from 'react'
import BlogPost from '../BlogPost/BlogPost'
import './Home.css'
class Home extends React.Component {
  render() {
    return (
      <main className="container">
        <BlogPost />
      </main>
    )
  }
}

export default Home
