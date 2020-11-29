// ^ Import React dan Fragment
import React, { Fragment } from 'react'
// ^ Import BlogSpot style
import './BlogSpot.css'
// ^ Import Component Post
import Post from '../../Components/Post/Post'
// ^ Import AXIOS
import axios from 'axios'

// ^ Create Class BlogPost
class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // !Membuat state post dengan array kosong untuk nantinya di update nilai statenya dengan data dari api
      post: [],
      // !State formBlogPost Untuk menyimpan data dari yang di input dari form
      formBlogPost: {
        id: 1,
        title: '',
        body: '',
        userId: 1
      },
      // !Nilai awal untuk handleSubmit
      isUpdate: false
    }
  }


  // *Ketika component di mounting maka akan GET API
  componentDidMount() {
    // *Panggil method getPostApi()
    this.getPostApi()
  }

  // !Method untuk menghapus component blog post
  handleRemove = (data) => {
    axios.delete(`http://localhost:3004/posts/${data}`)
      .then(result => {
        this.getPostApi()
      })
  }

  // ! Get API 
  getPostApi = () => {
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
      .then(result => {
        // * Ketika data telah berhasil diambil lalu kita ubah state post yang berisi array kosong dengan result data
        this.setState({
        post: result.data
      })
    })
  }

  // !Method untuk Post Blog / membuat content 
  postDataToApi = () => {
    // POST BlogPost
    axios.post('http://localhost:3004/posts', this.state.formBlogPost)
      .then(result => {
        // * Panggil method getPostApi() ketika membuat data baru agar mendapat data terkini
        this.getPostApi()
        // *Bila data baru telah di update maka ubah state formBlogPost kenilai default
        this.setState({
          formBlogPost: {
            id: 1,
            title: '',
            body: '',
            userId: 1
          }
        })
        return result
      }, (err) => {
        console.error(err)
      })
  }

  // ! Handle form
  handleFormChange = (event) => {
    // !Mengambil semua state formBlogPost
    let formBlogPostNew = { ...this.state.formBlogPost }
    // !Mengambil waktu saat ini
    let timeStamp = new Date().getTime()
    // * Jika state isUpdate bernilai tidak bernilai true maka formBlogPostNew[id] = timeStamp yang akan ditampilkan 
    if (!this.state.isUpdate) {
      // ^Target Id lalu ganti dengan timeStamp
      formBlogPostNew['id'] = timeStamp
    }
    // !Mentarget semua state
    formBlogPostNew[event.target.name] = event.target.value
    this.setState({
      formBlogPost: formBlogPostNew
    })
  }

  // !Handle Submit Button
  handleSubmit = () => {
    // * Jika state isUpdate bernilai true maka panggil method putDataToApi() yang berfungis untuk merubah data content berdasarkan id
    if (this.state.isUpdate) {
      this.putDataToApi()
    }
    // ^ Namun bila nilai state isUpdate === false maka method postDataToApi() yang akan dijalankan
    return this.postDataToApi()
  }

  // ! Mehod PUT untuk merubah isi content
  putDataToApi = () => {
    axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost)
      .then(result => {
        // ! jika content telah di update maka panggil method getPostApi() untuk mendapatkan data content yang telah di update
        this.getPostApi()
        // ^ Lalu merubah state isUpdate dan formBlogPost menjadi ke default
        this.setState({
          isUpdate: false,
          formBlogPost: {
            id: 1,
            title: '',
            body: '',
            userId: 1
          }
        })
      })
  }

  // ! Method handleUpdate Button
  handleUpdate = (data) => {
    // ! Ketika button update di klik maka akan Update State FormBlogPost
    this.setState({
      formBlogPost: data,
      isUpdate: true
    })

  }
  render() {
    return (
      <Fragment>
        <h1 className="title-heading">Post Content</h1>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" value={this.state.formBlogPost.title} name="title" id="title" onChange={ (event) => {this.handleFormChange(event)}}/>
        </div>
        <div className="form-control">
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" cols="30" rows="10" value={this.state.formBlogPost.body} onChange={ (event) => {this.handleFormChange(event)}}></textarea>
        </div>
        <div className="submit-btn">
          <input type="submit" value="POST" className="btn btn-success" onClick={this.handleSubmit} />
        </div>
        <ul>
          {
            /* Looping state */
            this.state.post.map(result => {
              return (
                /*  Menyiapkan Component */
                <li key={result.id}>
                  <Post data={result} remove={this.handleRemove} update={this.handleUpdate}/>
                </li>
              )
            })
          }
          
        </ul>
      </Fragment>
    )
  }
}

export default BlogPost
