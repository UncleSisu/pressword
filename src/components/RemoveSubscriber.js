import React, { Component } from 'react';

export default class RemoveSubscriber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribers: null,
      alias: ''
    }
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  componentDidMount() {
    console.log('RemoveSubscriber has mountedd');
  }

  async handleRemoval(e) {
    console.log('check removal', e);
    e.preventDefault();

    let { alias } = this.props;
    console.log(`api remove request check alias:${alias}`);

    // $(`#${alias}-pressword-msgs`).empty();
    this.emptyResponses();

    try {
      const res = await fetch(pressword_ajax.ajax_url, {
        method: 'post',
        body: JSON.stringify({
          action: 'test_pressword_api',
          alias: alias
        })
      })

      this.setState({ res });
    } catch (err) {
      this.setState({
        res: `${err}`
      })
    }

      // e.preventDefault();
      // let alias = $('#pressword-remove-alias-input').val();
      // $('#pressword-remove-alias-input').val('');
      //
      // console.log(`clicked?, alias: ${alias}, ajaxUrl: ${pressword_post.ajax_url}`);
      //
      // $.ajax({
      //   url: pressword_ajax.ajax_url,
      //   type: 'POST',
      //   data: {
      //     action: 'remove_api',
      //     alias: alias // your new value variable
      //   },
      //   dataType: 'json'
      // })
      //   .done(function(res) {
      //     console.log('res remove api', res);
      //
      //     $('#pressword-api-display').find(`#${res.alias}`).remove();
      //   })
      //   .fail(function(err) {
      //   alert( "The Ajax call itself failed.", err );
      // })
  }

  render() {
    return (
      <div className='container'>
        <div id="pressword-remove-api-alias-container" className="form-inline">
          <input id="pressword-remove-api-alias-input" value="" className="form-inline" type="text"></input> &nbsp; Enter API name
        </div>
        <span id="pressword-remove-api-submit" className="api-btn" onClick={this.handleRemoval}>Remove API</span>
      </div>
    );
  }
}
