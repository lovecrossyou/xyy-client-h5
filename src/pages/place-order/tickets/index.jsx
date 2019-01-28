import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { chooseTicket } from '../../../stores/orderConfirm'
import styles from './index.less'
import NavBar from '../../common-components/nav-bar'


class Tickets extends Component {
  render() {
    return (
      <div className={styles.tickets_container}>
        <NavBar
          title="选择优惠券"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
      </div>
    )
  }
}
const mapStateToProps = ({ state }) => ({
  info: state.info,
  tickets: state.tickets,
})

const mapActionsToProps = dispatch => bindActionCreators({
  chooseTicket,
}, dispatch)

export default connect(mapStateToProps, mapActionsToProps)(Tickets)

