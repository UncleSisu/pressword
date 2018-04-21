import React, { Component } from 'react';

export default class AddSubscriber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribers: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('AddSubscriber has mounted');
  }

  handleSubmit(e) {
    console.log('check submit', e);

      // e.preventDefault();
      // let alias = $('#pressword-alias-input').val();
      // let endpoint = $('#pressword-url-input').val();
      // $('#pressword-alias-input').val('');
      // $('#pressword-url-input').val('');
      //
      // console.log(`clicked?, alias: ${alias}, url: ${endpoint}, ajaxUrl: ${pressword_post.ajax_url}`);
      //
      // $.ajax({
      //   url: pressword_ajax.ajax_url,
      //   type: 'POST',
      //   data: {
      //     action: 'set_new_api',
      //     alias: alias, // your new value variable
      //     endpoint: endpoint
      //   },
      //   dataType: 'json'
      // })
      //   .done(function(res) {
      //     console.log('res add api', res);
      //
      //     // $('#pressword-api-display').append(`<h2>PressWord API Endpoints:</h2>`);
      //     $('#pressword-api-display').append(`<p id=${res.alias}>Newly added - API alias: ${res.alias}, &nbsp; API endpoint: ${res.endpoint}</p>`);
      //   })
      //   .fail(function(err) {
      //     alert( "The Ajax call itself failed.", err );
      //   })
  }

  render() {
    return (
      <div className='container'>
        <div id="pressword-new-api-alias-container" className="form-inline">
          <input id="pressword-new-api-alias-input" value="" className="form-inline" type="text"></input> &nbsp; Add API name
        </div>
        <div id="pressword-new-api-url-container" className="form-inline">
          <input type="text" id="pressword-new-api-url-input" value=""/> &nbsp; Enter API url for PressWord broadcasting
        </div>
        <span id="pressword-new-api-submit" className="api-btn" onClick={this.handleSubmit}>Add API</span>
      </div>
    );
  }
}
