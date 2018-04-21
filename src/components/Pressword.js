import React, { Component } from 'react';
import AddSubscriber from './AddSubscriber';
import Subscribers from './Subscribers';
// import RemoveSubscriber from './RemoveSubscriber';

export default class Pressword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      apis: []
    }
  }

  // async componentDidMount() {
  componentDidMount() {
    const response = fetch(pressword_ajax.ajax_url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `action=get_pressword_apis&_wpnonce=${window.custom_nonce}`,
      credentials: 'same-origin'
    })

    response.then(res => res.json())
      .then(res => {
        const apis = res.apis;
        console.log('wtf apis', apis);
        const formatted = Object.keys(apis).map(api => {
          return {
            alias: api,
            endpoint: apis[api]
          }
        });
        this.setState({ apis: formatted });
      })
      .catch(err => console.log('pull apis error', err))
  }

  render() {
    return (
      <div className='container'>
        <AddSubscriber />
        { this.state.apis && <Subscribers apis={this.state.apis}/> }
      </div>
    );
  }
}
