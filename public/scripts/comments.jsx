var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState () {
    return {author: '', text: ''}
  },
  handleAuthorChange (e) {
    this.setState({author: e.target.value})
  },
  handleTextChange (e) {
    this.setState({text: e.target.value})
  },
  handleFormSubmit (e) {
    e.preventDefault()
    let text = this.state.text.trim()
    let author = this.state.author.trim()
    if (!text || !author) {
      console.log('author and text cant not be empty!')
      return
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },
  render () {
    return (
      <form className="commentForm" onSubmit={this.handleFormSubmit}>
        <input 
          type="text" 
          placeholder="Please input your name..." 
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input 
          type="text" 
          placeholder="Please input your comment..." 
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" />
        <p>{this.state.author} || {this.state.text}</p>
      </form>
    )
  }
})

var CommentBox = React.createClass({
  // 组件初始化状态。
  getInitialState () {
    return {data: [
      {id: 1, author: 'Easonzhan', text: 'We are not enough to getting older'},
      {id: 2, author: 'Andrew Ng', text: 'Machine learning '}
    ]}
  },
  handleCommentSubmit (data) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', this.props.url)
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('Add comment success')
      }
    }.bind(this)
    // let formData = new FormData()
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key])
    // })
    console.log(data)
    xhr.send(JSON.stringify(data))
  },
  // 从服务器加载数据。
  loadFromCommentsServer () {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', this.props.url)
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        console.log(JSON.parse(xhr.responseText))
        this.setState({data: JSON.parse(xhr.responseText)})
      }
    }.bind(this)
    xhr.send()
  },
  // 组件挂载之前触发
  componentDidMount () {
    this.loadFromCommentsServer()
    setInterval(this.loadFromCommentsServer, this.props.pollInterval)
  },
  render () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
})


ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);