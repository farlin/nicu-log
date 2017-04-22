
var Record = React.createClass({


	propTypes: {
		record: React.PropTypes.object,
	},

	getInitialState: function() {
		return {
			record: {
				visited_at: this.props.record.visited_at,
				summary: this.props.record.summary,
			}
		}
	},

    render: function(){
        return (
			<tr className="record">
				<td>{this.state.record.visited_at}</td>
				<td>{this.state.record.summary}</td>
			</tr>
        );
    }
});
