import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/Header'
import Configure from './components/Configure';
import Construct from './components/Construct';
import { getApisAction, postApiAction } from './store/actions/apisActions'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = props;
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.apis);
  }

  componentDidMount() {
    // initial pull of api object
    this.props.getApis();
  }

  handleUpdate(api, name, value) {
    const payload = Object.keys(api).reduce((acc, curr) => {
      if (curr === name) {
        acc[curr] = value;
      } else {
        acc[curr] = api[curr];
      }
      return acc;
    }, {})

    console.log('whoa handleUpdate', payload)
    this.props.postApi(payload)
  }
  // operator(route) {
  //   const { apis } = this.state;
  //   switch(route) {
  //     case 'construct':
  //       return <Construct apis={apis}/>;
  //     case 'configure':
  //       return <Configure apis={apis}/>;
  //     default:
  //       return <Construct apis={apis}/>;
  //   }
  // }

  render() {
    const { apis } = this.state;
    return (
      <section className="main-container">
        {/* <Header /> */}
        {/* this.operator(this.props.ui.routeVisible) */}
        <Construct />
        <Configure apis={apis} handleUpdate={this.handleUpdate}/>
      </section>
    )
  }
};

const mapStateToProps = ({ ui, apis }) => ({
  ui,
  apis
})

const mapDispatchToProps = dispatch => ({
  getApis: () => dispatch(getApisAction()),
  postApi: input => dispatch(postApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
