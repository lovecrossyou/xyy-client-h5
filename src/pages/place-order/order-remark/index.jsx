/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import styles from './index.less'
import NavBar from '../../common-components/nav-bar';
import { orderRemark } from '../../../stores/orderConfirm'

class OrderRemark extends Component {
  state=({
    textareaValue: '',
  })
  handleTextareaChange(event) {
    this.setState({
      textareaValue: event.target.value,
    })
  }
  render() {
    return (
      <div className={styles.container}>
        <NavBar
          title="订单备注"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <div className={styles.textarea_cotainer}>
          <textarea
            id="remarkArea"
            value={this.state.textareaValue}
            className={styles.textarea}
            onChange={this.handleTextareaChange.bind(this)} />
        </div>
        <div
          className={styles.sure_btn}
          onClick={() => {
            this.props.orderRemark(this.state.textareaValue)
            this.props.history.goBack()
          }} >
          确定
        </div>
      </div>
    )
  }
}

const mapActionsToProps = dispatch => bindActionCreators({
  orderRemark,
}, dispatch)
export default connect(null, mapActionsToProps)(OrderRemark)
