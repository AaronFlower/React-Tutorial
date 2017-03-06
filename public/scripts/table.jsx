var TTable = React.createClass({
	handleDeleteBook (e, id) {
		e.preventDefault()
		console.log('delete: ', id)
		let xhr = new XMLHttpRequest()
		xhr.open('DELETE', '/api/books/' + id)
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log('Delete success')
			}
		}.bind(this)
		xhr.onerror = function () {
			console.log('Delete failed')
		} 
		xhr.send()
	},
	render () {
		return (
			<table className="r-table">
				<thead>
					<tr>
						{this.props.cols.map((col => {
							return (<th className={col.className} key={col.key}>{col.name}</th>)
						}))}
					</tr>
				</thead>
				<tbody>
				  {this.props.data.map(row => {
				  	return (
				  		<tr key={row.id}>
				  			{
				  				this.props.cols.map(col => {
				  						if (row[col.key]) {
					  						return (<td className={col.className} key={col.key + row.id}>
					  							{row[col.key]}
					  						</td>)
				  						} else {
				  							return (<td key={'operation' + row.id}>
				  								<a href="#" onClick={(e) => this.handleDeleteBook(e, row.id)}>删除</a>
				  							</td>)
				  						}
				  				})
				  			}
				  		</tr>
				  	)
				  })}
				</tbody>	
			</table>
		)
	}
})


var BooksTable = React.createClass({
	getInitialState () {
		return {
			cols: [
				{
					key: 'id',
					name: 'Id',
					className: 'small'
				},
				{
					key: 'title',
					name: 'Title',
					className: 'middle'
				},
				{
					key: 'author',
					name: 'Author',
					className: 'middle'
				},
				{
					key: 'abstract',
					name: 'Abstract',
					className: 'large'
				},
				{
					key: 'operation',
					name: 'Operation',
					className: 'middle'
				}
			],
			data: []
		}
	},
	loadBooksData () {
		let xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/books')
		xhr.setRequestHeader('Content-type', 'application/json')
		xhr.onreadystatechange = function () {
			if (xhr.status == 200 && xhr.readyState == 4) {
				this.setState({data: JSON.parse(xhr.responseText)})
			}
		}.bind(this)
		xhr.onerror = function () {
			console.log('Can not load books info!')
		}.bind(this)
		xhr.send()
	},
	componentDidMount () {
		this.loadBooksData()
		setInterval(this.loadBooksData, 2000)
	},
	render () {
		return (
			<TTable cols={this.state.cols} data={this.state.data} />
		)
	}
})

ReactDOM.render(
  <BooksTable />,
  document.getElementById('comments-table')
)