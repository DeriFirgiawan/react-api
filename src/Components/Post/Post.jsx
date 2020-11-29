import React from 'react'

const Post = (props) => {
  return (
    <div className="card">
      <div className="list-image">
        <img src="https://placeimg.com/200/150/arch" alt="Dummy" />
      </div>
      <div className="content">
        <h2 className="title">{ props.data.title }</h2>
        <p className="description">{ props.data.body }</p>
      </div>
      <button className="btn btn-warning" onClick={() => {props.update(props.data)}}>Update</button>
      <button className="btn remove" onClick={() => {props.remove(props.data.id)}}>Delete</button>
    </div>
  )
}

export default Post
