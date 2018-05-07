import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/Header'
import Configure from './components/Configure';
import Construct from './components/Construct';
import { getApisAction, postApiAction, bulkApiAction } from './store/actions/apisActions'

class Main extends Component {
  constructor(props) {
    super(props)
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

  handleUpdate = (apiName, prop, value, action) => {
    if (action === 'delete') {
      return this.props.bulkApi({
        bulk: apiName,
        cmd: action
      })
    }

    let apis = [];
    let apiType = Array.isArray(apiName);

    if (apiType) {
      apis = apiName.map(name => {
        return Object.assign({}, this.state.apis[name]);
      })
    } else {
      apis.push(Object.assign({}, this.state.apis[apiName]));
    }

    apis.forEach(api => {
      api[prop] = value
    })

    if (apiType) {
      this.props.bulkApi({
        bulk: apis,
        cmd: action
      })
    } else {
      this.props.postApi(apis.pop())
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
  bulkApi: input => dispatch(bulkApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
