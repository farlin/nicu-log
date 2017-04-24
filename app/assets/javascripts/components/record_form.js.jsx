
var RecordForm = React.createClass({


	propTypes: {
		// record: React.PropTypes.object,
		visited_at:  React.PropTypes.instanceOf(Date),
		summary:  React.PropTypes.string,
		recordAddHandler: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			visited_at: '',
			summary: '',
		}
	},

	_recordCreate: function(event){


        // Adding a line
        var _this = this;

        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: '/records.json',
          data: { record: this.state },
        }).done(function( response ) {

          // when a new order line is added
          _this.props.recordAddHandler(response);
          _this.setState(_this.getInitialState());

        });
	},

    _handleChange: function(event){

    	var name = event.target.name;
    	var value = event.target.value;
    	
    	if(name=='visited_at'){
    		this.setState({ visited_at: value });
		}
    	
    	if(name=='summary'){
    		this.setState({ summary: value });
		}
    },

	_valid: function(){
      var res = this.state.summary && this.state.visited_at;
      return res;
	},

    render: function(){
        return (
			<tr className="record">
				<td></td>
				<td>
					<input type="text" className="form-control" placeholder="Visited At" name="visited_at" value={this.state.visited_at}
            			onChange={this._handleChange}
            		/>
				</td>
				<td>
					<input type="text" className="form-control" placeholder="Summary" name="summary" value={this.state.summary}
            			onChange={this._handleChange}
            		/>
				</td>
				<td>
					<button type="button" 
						onClick={ () => { this._recordCreate() } }
						disabled={!this._valid()}
						className="btn btn-default">Add</button>
				</td>
			</tr>
        );
    }
});
