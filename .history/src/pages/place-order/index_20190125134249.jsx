

import React from 'react'
import NavBar from '../common-components/nav-bar'
import thanks from '../../assets/img/thanks.gif'
import styles from './index.less'

export default class PlaceOrder extends React.Component {
  render() {
    return (
      <div className={styles['place-order']}>
        <NavBar
          title="下单"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <div className={styles.content}>
          <AddressChoose />
        </div>
      </div>
    )
  }
}
const AddressChoose = () => {
  return (
    <div> 地址选择 </div>
  )
}
