/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable import/first */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { chooseTicket, getConfirmOrderInfo } from '../../stores/orderConfirm'
import NavBar from '../common-components/nav-bar'
import styles from './index.less'
import cls from 'classnames'
import qs from 'query-string'
import Toast from 'components/toast'
import arrow_right from '../../assets/img/right_arrow.png'
import ali_pay_icon from '../../assets/img/platform/ali_pay_icon.png';
import wechat_pay_icon from '../../assets/img/platform/wechat_pay_icon.png';


// import asyncLoad from 'components/async-loade'
// import Loading from '../../components/loading';
import Modal from '../../components/modal';
import Scroll from '../../components/scroll';
import { postkeplerPayConfirm } from '../../api';
// postkeplerPayConfirm
// postshopOrderCreate
const payinfo = {
  shopId: 13,
  userId: 2,
  deliverAddressId: 1,
  products: [
    {
      quantity: 2,
      productId: 10,
    },
    {
      quantity: 7,
      productId: 13,
    },
    {
      quantity: 1,
      productId: 14,
    },
  ],
}

class PlaceOrder extends React.Component {
  componentDidMount() {
    this.props.getConfirmOrderInfo(() => {
      // eslint-disable-line
    })
  }
  toPayAction = async () => {
    const query = qs.parse(this.props.location.search) || {}
    console.log(query)
    // const createParams = {
    //   shopId: 13,
    //   userId: 2,
    //   deliverAddressId: 1,
    //   products: [
    //     {
    //       quantity: 2,
    //       productId: 10,
    //     },
    //     {
    //       quantity: 7,
    //       productId: 13,
    //     },
    //     {
    //       quantity: 1,
    //       productId: 14,
    //     },
    //   ],
    // }
    const confirmParams = {
      openId: 'oLtGG5N9Q6MudlWkU1O4fVavNQGg',
      payChannel: 'WeixinMiniProgramPay',
      payOrderNo: '20190213191419096316',
    }
    try {
      // const orderInfo = await postshopOrderCreate(createParams)
      const confirmRes = await postkeplerPayConfirm(confirmParams)
      console.log(`confirmRes====${JSON.stringify(confirmRes)}`)
      const id = '2104305524043915418'
      this.props.history.push(`/order-detail?id=${id}`)
    } catch ({ err }) {
      Toast.info(err)
    }
  }
  render() {
    const { history, info } = this.props;
    const { productItemList } = info;
    return (
      <div className={styles['place-order']}>
        <NavBar
          title="下单"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <Scroll className={styles.confirm_scroll} dataSource={this.props.info} >
          <div className={styles.content}>
            <AddressChoose data={this.props.address} chooseAddAction={() => history.push('/address?choose=1')} />
            <ArriveAndPay title="送达时间" value="尽快送达(15:10送达)" />
            <ArriveAndPay title="支付方式" value="在线支付" />
            <WaterStoreInfo productItemList={productItemList} />
            <div className={styles.bottom_white}>
              <OrderInfoItem_action
                name="使用优惠卷"
                value={this.props.ticket.money}
                callBack={() => history.push('/tickets')} />
              <OrderInfoItem_action name="立减优惠" value="-¥6" hideArrow={true} orderInfo_item_right_v_style={styles.orderInfo_color_red} />
              <div style={{ height: '30px' }} />
              <OrderInfoItem_action
                name="订单备注"
                value={this.props.remark}
                orderInfo_item_right_v_style={styles.orderInfo_color_gray9}
                orderInfo_item_left_style={styles.orderInfo_color_gray2e}
                callBack={() => history.push('/orderRemark')}
              />
            </div>
          </div>
        </Scroll>
        <BottomBar data={JSON.stringify(payinfo)} toPay={() => { this.toPayAction() }} />
        <PayChooseModal />

      </div>
    )
  }
}
const ArriveAndPay = ({ title, value }) => {
  return (
    <div className={styles.arrive_pay_c}>
      <div className={styles.arrive_pay_c_title}>{title}</div>
      <div className={styles.arrive_pay_c_value}>{value}</div>
    </div>
  )
}
const pays = [
  { name: '微信', icon: wechat_pay_icon },
  { name: '支付宝', icon: ali_pay_icon },
]
class PayChooseModal extends Component {
  state = ({
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

// const WaterStoreInfos = [
//   {
//     title: '农夫山泉', count: '2', money: '15', img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=153185588,3077905438&fm=27&gp=0.jpg',
//   },
//   {
//     title: '乐百氏', count: '2', money: '12', img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2044731858,1878235851&fm=27&gp=0.jpg',
//   },
//   {
//     title: '哇哈哈', count: '2', money: '16', img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2447413415,3983146968&fm=179&app=42&f=JPEG?w=242&h=242',
//   },
//   {
//     title: '怡宝', count: '1', money: '10', img: 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1316944245,1173320322&fm=85&s=49A01D724303614B1EF5E1CF0300C0A2',
//   },
// ];
const WaterStoreInfo = ({ productItemList }) => {
  return (
    <div className={styles.water_store_info}>
      <div className={styles.water_store_h_t}>水站信息</div>
      {
        productItemList.map((value, index) => {
          return <WaterStoreItem data={value} key={index} />
        })
      }
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
      hideArrow,
    } = this.props
    return (
      <div className={styles.orderInfoItem_action}>
        <div className={cls(styles.orderInfo_item_left, orderInfo_item_left_style)}> {name} </div>
        <div className={styles.orderInfo_item_right} onClick={() => callBack && callBack()}>
          <div className={cls(styles.orderInfo_item_right_value, orderInfo_item_right_v_style)}>
            {value}
          </div>
          {
            hideArrow ? null : <img className={styles.address_choose_arrow} src={arrow_right} />
          }
        </div>
      </div>
    )
  }
}

const WaterStoreItem = ({ data }) => {
  const { shopProduct } = data;
  return (
    <div className={styles.water_store_item}>
      <div className={styles.water_store_item_title_c}>
        <img className={styles.water_store_item_img} src={shopProduct.headImage} />
        <div className={styles.water_store_item_title}>{shopProduct.headName}</div>
      </div>
      <div className={styles.water_store_item_count_c}>
        <div className={styles.water_store_item_count}>{`x${shopProduct.spec}`}</div>
        <div className={styles.water_store_item_money}>{`¥ ${shopProduct.price / 100}`}</div>
      </div>
    </div>
  )
}

const AddressChoose = ({ data, chooseAddAction }) => {
  return (
    <div className={styles.address_choose} onClick={() => chooseAddAction()} >
      <div className={styles.address_choose_left}>
        <div className={styles.address_choose_mark_c}>
          <div className={styles.address_choose_mark_t}>订单配送至</div>
          <div className={styles.address_choose_mark}>公司</div>
        </div>
        <div className={styles.address_choose_detail}>{data.address}{data.address_detail}</div>
        <div className={styles.address_people}>
          <div className={styles.address_p_name}>{data.name || ''}</div>
          <div className={styles.address_p_phone}>{data.phone || ''}</div>
        </div>
      </div>
      <img src={arrow_right} className={styles.address_choose_arrow} />

    </div>
  )
}
const BottomBar = ({ data, toPay }) => {
  return (
    <div className={styles.buttom_container}>
      <div className={styles.buttom_container_money}>
        <div className={styles.buttom_container_m_title}>总额：</div>
        <div className={styles.buttom_container_m_mark}>¥</div>
        <div className={styles.buttom_container_m_value}>
          {'20.00'}
        </div>
        <div className={styles.buttom_container_m_ex}>已优惠¥6</div>
      </div>
      <div data={data} className="buttom_container_pay" onClick={() => toPay()} >去支付</div>
    </div>
  )
}
const mapStateToProps = ({ orderConfirm, shoppingCart }) => ({
  info: orderConfirm.info,
  tickets: orderConfirm.tickets,
  ticket: orderConfirm.ticket,
  address: orderConfirm.address,
  cart: shoppingCart.cart,
  remark: orderConfirm.remark,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseTicket,
  getConfirmOrderInfo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)
