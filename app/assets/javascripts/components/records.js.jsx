
var Records = React.createClass({
	

	propTypes: {
		records: React.PropTypes.array,
	},

	getInitialState: function() {
		return {
			records: this.props.data,
      		errors: {}
		}
	},

    render: function(){

    	var records_rendered = [];
		var records_rendered = this.state.records.map(function(r) {

			console.log(r.id);

			return (
				<Record key={r.id} record={r} />
			);
			// 
		});

        return (
			<div className="records">
				<h2 className="title"> Records </h2>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Visit Date</th>
							<th>Summary</th>
						</tr>
					</thead>
					<tbody>
						{records_rendered}
					</tbody>
				</table>
			</div>
        );
    }
});
