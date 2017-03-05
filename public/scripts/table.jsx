var TTable = React.createClass({
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
				  					return (
				  						<td className={col.className} key={col.key + row.id}>
				  							{row[col.key]}
				  						</td>
				  					)
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
				}
			],
			data: []
		}
	},
	componentDidMount () {
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