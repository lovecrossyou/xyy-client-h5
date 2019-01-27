/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable import/first */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import NavBar from '../common-components/nav-bar'
import styles from './index.less'
import cls from 'classnames'
import arrow_right from '../../assets/img/right_arrow.png'
import address_choose_icon from '../../assets/img/order/address_icon.png'
import address_people from '../../assets/img/order/address_people.png'


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
          <div style={{ height: '10px' }} />
          <OrderInfoItem_action name="使用优惠卷" value="-¥20.00" orderInfo_item_left_style={styles.orderInfo_item_left_style} orderInfo_item_right_v_style={styles.orderInfo_item_right_v_style} />
          <OrderInfoItem_action name="支付方式" value="支付宝" />
          <div style={{ height: '10px' }} />
          <OrderInfoItem_action name="备注" value="不要辣" />
        </div>
        <BottomBar />
      </div>
    )
  }
}
const OrderInfo = () => {
  return (
    <div className={styles.orderInfo}>
      <div className={styles.orderInfo_h_t}>订单信息</div>
      <OrderInfoItem data={{ title: '农夫山泉', count: '2', money: '20' }} />
      <OrderInfoItem data={{ title: '易宝箱装', count: '1', money: '60' }} />
      <div className={styles.orderInfo_deliveryFee}>
        <div className={styles.orderInfo_deliveryFee_name}>配送费</div>
        <div className={styles.orderInfo_deliveryFee_m}>{'¥ ' + '5'}</div>
      </div>
      <div className={styles.orderInfo_line} />
      <div className={styles.orderInfo_totoal}>
        <div className={styles.orderInfo_totoal_t}>合计：</div>
        <div className={styles.orderInfo_totoal_m}>¥ 80.00</div>
      </div>
    </div>
  )
}

class OrderInfoItem_action extends Component {
  render() {
    const {
      orderInfo_item_left_style,
      orderInfo_item_right_v_style,
      name,
      value,
    } = this.props
    return (
      <div className={styles.orderInfoItem_action}>
        <div className={cls(styles.orderInfo_item_left, orderInfo_item_left_style)}> {name} </div>
        <div className={styles.orderInfo_item_right}>
          <div className={cls(styles.orderInfo_item_right_value, orderInfo_item_right_v_style)}>
            {value}
          </div>
          <img className={styles.address_choose_arrow} src={arrow_right} />
        </div>
      </div>
    )
  }
}

const OrderInfoItem = ({ data }) => {
  return (
    <div className={styles.orderInfo_item}>
      <div className={styles.orderInfo_item_title}>{data.title}</div>
      <div className={styles.orderInfo_item_count_c}>
        <div className={styles.orderInfo_item_count}>{ `x${data.count}`}</div>
        <div className={styles.orderInfo_item_money}>{`¥ ${data.money}`}</div>
      </div>
    </div>
  )
}

const AddressChoose = () => {
  return (
    <div className={styles.address_choose}>
      <div className={styles.address_choose_left}>
        <div className={styles.address_choose_item}>
          <img src={address_choose_icon} className={styles.address_choose_icon} />
          <div className={styles.address_choose_name}>任蕊芳    18301570183</div>
        </div>
        <div style={{ height: 20 }} />
        <div className={styles.address_choose_item}>
          <img src={address_people} className={styles.address_people_icon} />
          <div className={styles.address_choose_name}>北京市朝阳区安贞门胜古北里20号楼</div>
        </div>
      </div>
      <img src={arrow_right} className={styles.address_choose_arrow} />
    </div>
  )
}
const BottomBar = () => {
  return (
    <div className={styles.buttom_container}>
      <div className={styles.buttom_container_money}>
        <div className={styles.buttom_container_m_title}>总额：</div>
        <div className={styles.buttom_container_m_mark}>¥</div>
        <div className={styles.buttom_container_m_value}>
          { '20.00' }
        </div>
      </div>
      <div className={styles.buttom_container_pay}>去支付</div>
    </div>
  )
}
