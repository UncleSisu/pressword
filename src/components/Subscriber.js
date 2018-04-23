import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Subscriber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: null,
      res: null
    }
    this.handleTest = this.handleTest.bind(this);
  }

  componentDidMount() {
    console.log('Subscriber has mounted');
  }

  emptyResponses() {
    return this.state.res ? this.setState({ res: null }) : null;
  }

  handleTest(e) {
    console.log('check test', e);
    // e.preventDefault();
    // let { alias } = this.props;
    // console.log(`api clicked check alias:${alias}`);
    //
    // // $(`#${alias}-pressword-msgs`).empty();
    // this.emptyResponses();
    //
    // try {
    //   const res = await fetch(pressword_ajax.ajax_url, {
    //     method: 'post',
    //     body: JSON.stringify({
    //       action: 'test_pressword_api',
    //       alias: alias
    //     })
    //   })
    //
    //   this.setState({ res });
    // } catch (err) {
    //   this.setState({
    //     res: `${err}`
    //   })
    // }

    // console.log('res', response);
  //   let msgs = $(`#${res.alias}-pressword-msgs`);
  //   msgs.append(`<h2>data:</h2>`);
  //   if (res.alias === 'hugo') {
  //     res.data.routes.split(' ').forEach((point, idx) => {
  //       if (point.length) {
  //         msgs.append(`<p> ${idx}: ${point}</p>`);
  //       }
  //     })
  //   } else {
  //     msgs.append(`<p>${res.data}</p>`);
  //   }
  // })
  }

  handleRemoval(e) {
    // console.log('check removal', e);
    // e.preventDefault();
    //
    // let { alias } = this.props;
    // console.log(`api remove request check alias:${alias}`);
    //
    // // $(`#${alias}-pressword-msgs`).empty();
    // this.emptyResponses();
    //
    // try {
    //   const res = await fetch(pressword_ajax.ajax_url, {
    //     method: 'post',
    //     body: JSON.stringify({
    //       action: 'test_pressword_api',
    //       alias: alias
    //     })
    //   })
    //
    //   this.setState({ res });
    // } catch (err) {
    //   this.setState({
    //     res: `${err}`
    //   })
    // }

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
    const { name, endpoint } = this.props;
    const resMessages = msgs => (
      <div id={`response-msgs-${name}`}>
        {msgs}
      </div>
    );

    return (
      <div className="pressword-api-item">
        <p id={name}>API name: {name}, &nbsp; API endpoint: {name}</p>
      <div className="api-item-actions">
        <span id={`${name}-submit`} className="api-btn pressword-test-btn" onClick={this.handleTest}>Test</span>
        <span id="pressword-remove-api-submit" className="api-btn" onClick={this.handleRemoval}>Remove API</span>
      </div>
        <div id ={`${name}-pressword-msgs`}>{resMessages(this.state.res)}</div>
      </div>
    );
  }
}

Subscriber.propTypes = {
  name: PropTypes.string,
  endpoint: PropTypes.string
};

export default Subscriber;
