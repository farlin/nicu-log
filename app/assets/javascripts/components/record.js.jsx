
var Record = React.createClass({


	propTypes: {
		record: React.PropTypes.object,
		recordDeleteHandler: React.PropTypes.func,
		recordUpdateHandler: React.PropTypes.func,
		is_editable: React.PropTypes.bool,
	},

	getInitialState: function() {
		return {
			record: {
				id: this.props.record.id,
				visited_at: this.props.record.visited_at,
				summary: this.props.record.summary,
			},
			is_editable: false
		}
	},

    // 
    _handleToggle: function(event){
		
		this.setState({
			is_editable: !this.state.is_editable
		});
    },

	_recordDelete: function(event){

        // Removing a line
        var _this = this;

        $.ajax({
          type: 'DELETE',
          dataType: 'json',
          url: '/records/' + _this.props.record.id,
        }).success(function( response ) {

          // when a order line is deleted
          _this.props.recordDeleteHandler( _this.props.record );

        });

	},

	_recordEdit: function(event){
        // Removing a line
        var _this = this;

    	var data = {
			"visited_at": ReactDOM.findDOMNode(this.refs.visited_at).value,
			"summary": ReactDOM.findDOMNode(this.refs.summary).value,
        };

        $.ajax({
          type: 'PUT',
          dataType: 'json',
          url: '/records/' + _this.props.record.id,
          data: {record: data }
        }).success(function( response ) {

          _this.props.recordUpdateHandler( _this.props.record, response);
          _this.setState({ is_editable: false });
          
        });

	},

    _renderRecordForm: function(){
        return (

			<tr className="record">
				<td></td>
				<td>
					<input type="text" className="form-control" placeholder="Visited At" name="visited_at" 
						defaultValue={ this.props.record.visited_at}
            			ref='visited_at'
            			onChange={this._handleChange}
            		/>
				</td>
				<td>
					<input type="text" className="form-control" placeholder="Summary" name="summary" 
						defaultValue={ this.props.record.summary }
            			ref='summary'
            			onChange={this._handleChange}
            		/>
				</td>
				<td>
					<button type="button" 
						onClick={ this._recordEdit }
						className="btn btn-default">Update</button>
					
					&nbsp;

					<button type="button" 
						onClick={ this._handleToggle } 
						className="btn btn-danger" >Cancel</button>
				</td>
			</tr>
        );
    },

    _renderRecordRow: function(){
        return (
			<tr className="record">
				<td>{this.props.record.id}</td>
				<td>{this.props.record.visited_at}</td>
				<td>{this.props.record.summary}</td>
				<td>
					<button type="button" 
						onClick={ this._handleToggle }
						className="btn btn-default">Edit</button>
					
					&nbsp;

					<button type="button" 
						onClick={ this._recordDelete } 
						className="btn btn-danger" >Delete</button>
				</td>
			</tr>
        );
    },

    render: function(){
		if (this.state.is_editable){
			return this._renderRecordForm();
		} else {
			return this._renderRecordRow();
		}

    }


});
