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

var CommentBox = React.createClass({
  // 组件初始化状态。
  getInitialState () {
    return {data: [
      {id: 1, author: 'Easonzhan', text: 'We are not enough to getting older'},
      {id: 2, author: 'Andrew Ng', text: 'Machine learning '}
    ]}
  },
  // 组件挂载之前触发
  componentDidMount () {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/comments')
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        console.log(JSON.parse(xhr.responseText).concat())
        console.log(this.setState)
        this.setState({data: JSON.parse(xhr.responseText).concat()})
      }
    }.bind(this)
    xhr.send()
  },
  render () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
      </div>
    )
  }
})


ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);