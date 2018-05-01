import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/Header'
import Configure from './components/Configure';
import Construct from './components/Construct';
import { getApisAction } from './subscribersActions'
// import Apis from './components/Pressword';
// import Services from './components/Pressword';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.subscribers);
  }

  componentDidMount() {
    // initial pull of api object
    this.props.getApis();
  }

  // operator(route) {
  //   const { subscribers } = this.state;
  //   switch(route) {
  //     case 'construct':
  //       return <Construct subscribers={subscribers}/>;
  //     case 'configure':
  //       return <Configure subscribers={subscribers}/>;
  //     default:
  //       return <Construct subscribers={subscribers}/>;
  //   }
  // }

  render() {
    const { subscribers } = this.state;
    return (
      <section className="main-container">
        {/* <Header /> */}
        {/* this.operator(this.props.ui.routeVisible) */}
        <Construct />
        <Configure subscribers={subscribers}/>
      </section>
    )
  }
};

const mapStateToProps = ({ ui, subscribers }) => ({
  ui,
  subscribers
})

const mapDispatchToProps = dispatch => ({
  getApis: () => dispatch(getApisAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
