
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

	_addRecord: function(record) {

		records = React.addons.update(this.state.records, { $push: [record] });
        this.setState({ records: records });

	},

	_updateRecord: function(old_record, new_record) {


		index = this.state.records.indexOf(old_record);
		updated_records = React.addons.update(this.state.records, { $splice: [[index, 1, new_record]] });
		this.replaceState({ records: updated_records });
	},


	_deleteRecord: function(record) {

		index = this.state.records.indexOf(record);
		records = React.addons.update(this.state.records, { $splice: [[index, 1]] });	

        this.replaceState({records: records});
	},

    render: function(){

    	var records_rendered = [];
    	
    	var _this  = this;
		var records_rendered = this.state.records.map(function(obj) {
			return (
				<Record key={obj.id} record={obj} 
					recordUpdateHandler={ _this._updateRecord } 
					recordDeleteHandler={ _this._deleteRecord } />
			);
		});

        return (
			<div className="records">
				<h2 className="title"> Records</h2>

				<table>
					<tbody>
						<RecordForm recordAddHandler={ this._addRecord } />
					</tbody>
				</table>
				<hr/>

				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Entry No.</th>
							<th>Visit Date</th>
							<th>Summary</th>
							<th>Action</th>
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
