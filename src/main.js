import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/Header'
import Configure from './components/Configure';
import Construct from './components/Construct';
import { getApisAction, postApiAction, deleteApiAction} from './store/actions/apisActions'

class Main extends Component {
  constructor(props) {
    super(props)
    // this.state = props;
    this.state = this.getInitialState(props);
  }

  getInitialState = (props) => {
    return props;
  }

  resetState = () => {
    this.setState(this.getInitialState());
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.apis);
  }

  componentDidMount() {
    this.props.getApis();
  }

  handleUpdate = (apiName, name, value, action, type) => {
    let payload;
    const api = this.state.apis[apiName];

    if (name !== null && value !== null) {
      payload = Object.keys(api)
        .reduce((acc, curr) => {
          if (curr === name) {
            acc[curr] = value;
          } else {
            acc[curr] = api[curr];
          }
          return acc;
        }, {});
    }

    switch(action) {
      case 'update':
      case 'post':
        this.props.postApi(payload)
        break;
      case 'delete':
        this.props.deleteApi(apiName)
      case 'get':
        this.props.getApis()
        break;
      default:
        break;
    }
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
  postApi: input => dispatch(postApiAction(input)),
  deleteApi: input => dispatch(deleteApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
