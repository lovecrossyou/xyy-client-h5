/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable import/first */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { chooseTicket } from '../../stores/orderConfirm'
import NavBar from '../common-components/nav-bar'
import styles from './index.less'
import cls from 'classnames'
import arrow_right from '../../assets/img/right_arrow.png'
import address_choose_icon from '../../assets/img/order/address_icon.png'
import address_people from '../../assets/img/order/address_people.png'
import ali_pay_icon from '../../assets/img/platform/ali_pay_icon.png';
import wechat_pay_icon from '../../assets/img/platform/wechat_pay_icon.png';
// import asyncLoad from 'components/async-loade'
// import Loading from '../../components/loading';
import Modal from '../../components/modal';

class PlaceOrder extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className={styles['place-order']}>
        <NavBar
          title="下单"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <div className={styles.content}>
          <div style={{ height: '10px' }} />
          <AddressChoose data={this.props.address} chooseAddAction={() => history.push('/address?choose=1')} />
          <div style={{ height: '10px' }} />
          <OrderInfo />
          <div style={{ height: '10px' }} />
          <OrderInfoItem_action
            name="使用优惠卷"
            value={this.props.ticket.money}
            orderInfo_item_left_style={styles.orderInfo_item_left_style}
            orderInfo_item_right_v_style={styles.orderInfo_item_right_v_style}
            callBack={() => history.push('/tickets')} />
          <OrderInfoItem_action name="支付方式" value="支付宝" />
          <div style={{ height: '10px' }} />
          <OrderInfoItem_action name="备注" value="不要辣" />
        </div>
        <BottomBar />
        <PayChooseModal />
      </div>
    )
  }
}
const pays = [
  { name: '微信', icon: wechat_pay_icon },
  { name: '支付宝', icon: ali_pay_icon },
]
class PayChooseModal extends Component {
  state=({
    visible: false,
  })

  modalOpen() {
    this.setState({
      visible: true,
    })
  }
  modalCancel() {
    this.setState({
      visible: false,
    })
  }
  PayItem(value, index, itemClick) {
    return (
      <div key={`#${index}`} className={styles.pay_choose_item} onClick={() => itemClick()}>
        <div className={styles.pay_name_c}>
          <img src={value.icon} className={styles.pay_img} />
          <div className={styles.pay_name}>{value.name}</div>
        </div>
        <div className={styles.pay_choose_icon} />
      </div>
    )
  }
  render() {
    return (
      <Modal visible={this.state.visible}>
        <div className={styles.pay_choose} key="food" onClick={() => this.modalCancel()} >
          <div className={styles.pay_choose_body}>
            {
              pays.map((value, index) => {
                return this.PayItem(value, index, () => { this.modalCancel() });
              })
            }
          </div>
        </div>
      </Modal>
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
      callBack,
    } = this.props
    return (
      <div className={styles.orderInfoItem_action}>
        <div className={cls(styles.orderInfo_item_left, orderInfo_item_left_style)}> {name} </div>
        <div className={styles.orderInfo_item_right} onClick={() => callBack && callBack()}>
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

const AddressChoose = ({ data, chooseAddAction }) => {
  return (
    <div className={styles.address_choose} onClick={() => chooseAddAction()} >
      <div className={styles.address_choose_left}>
        <div className={styles.address_choose_item}>
          <img src={address_choose_icon} className={styles.address_choose_icon} />
          <div className={styles.address_choose_name}>{data.name || ''}    {data.phone || ''}</div>
        </div>
        <div style={{ height: 20 }} />
        <div className={styles.address_choose_item}>
          <img src={address_people} className={styles.address_people_icon} />
          <div className={styles.address_choose_name}>{data.address}</div>
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
const mapStateToProps = ({ orderConfirm }) => ({
  info: orderConfirm.info,
  tickets: orderConfirm.tickets,
  ticket: orderConfirm.ticket,
  address: orderConfirm.address,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseTicket,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)
