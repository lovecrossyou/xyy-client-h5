

import React from 'react'
import NavBar from '../common-components/nav-bar'
import styles from './index.less'
import arrow_right from '../../assets/img/right_arrow.png'

export default class PlaceOrder extends React.Component {
  render() {
    return (
      <div className={styles['place-order']}>
        <NavBar
          title="下单"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <div className={styles.content}>
          <div style={{ height: '10px' }} />
          <AddressChoose />
          <div style={{ height: '10px' }} />
          <OrderInfo />
        </div>
      </div>
    )
  }
}
const OrderInfo = () => {
  return (
    <div className={styles.orderInfo}>
      <div className={styles.orderInfo_h_t}>订单信息</div>
      <OrderInfoItem data={{ title: '农夫山泉', count: '1', money: '20' }} />
    </div>
  )
}
const OrderInfoItem = ({ data }) => {
  return (
    <div className={styles.orderInfo_item}>
      <div>{data.title}</div>
      <div>{ `x${data.count}`}</div>
      <div>{`¥ ${data.money}`}</div>
    </div>
  )
}
const AddressChoose = () => {
  return (
    <div className={styles.address_choose}>
      <div className={styles.address_choose_left}>
        <div className={styles.address_choose_item}>
          <img src={arrow_right} className={styles.address_choose_icon} />
          <div className={styles.address_choose_name}>任蕊芳    18301570183</div>
        </div>
        <div style={{ height: 20 }} />
        <div className={styles.address_choose_item}>
          <img src={arrow_right} className={styles.address_choose_icon} />
          <div className={styles.address_choose_name}>北京市朝阳区安贞门胜古北里20号楼</div>
        </div>
      </div>
      <img src={arrow_right} className={styles.address_choose_arrow} />
    </div>
  )
}
