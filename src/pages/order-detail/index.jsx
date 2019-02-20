/* eslint-disable react/no-multi-comp */
/* eslint-disable no-script-url */

import React, { Component } from 'react'
import Countdown from 'react-countdown-now';
import cls from 'classnames'
import qs from 'query-string'
import Toast from 'components/toast'
import Scroll from 'components/scroll'
import { getImageUrl } from 'utils/utils'
import NavBar from '../common-components/nav-bar'
import { getOrderSnapshot, getOrderDesc } from '../../api'
import styles from './index.less'
import arrow_left_black from '../../assets/img/order/arrow_left_black.png'


// const cb = () => {
//   console.log('expired callback')
// }

// const OPTIONS = { endDate: '2019-03-09 10:55', prefix: 'until my birthday!', cb }

export default class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      desc: {},
      snapshot: {},
    }
  }

  componentDidMount() {
    this.initPage()
  }

  initPage = async () => {
    const query = qs.parse(this.props.location.search) || {}
    console.log(`query=========${JSON.stringify(query)}`)
    const state = { id: query.id }
    console.log(`state=========${JSON.stringify(state)}`)
    try {
      const [snapshot, desc] = await Promise.all([
        getOrderSnapshot(state),
        getOrderDesc(state),
      ])
      console.log(`desc=======>${JSON.stringify(desc)}`);
      console.log(`snapshot=======>${JSON.stringify(snapshot)}`);
      this.setState({
        desc: desc.data,
        snapshot: snapshot.data,
      })
    } catch ({ err }) {
      Toast.info(err)
    }
  }

  render() {
    const { desc, snapshot } = this.state
    const food = snapshot.basket ? snapshot.basket.group[0] : []
    const extra = snapshot.basket ? snapshot.basket.extra : []
    return (
      <div className={styles.detail}>
        <NavBar
          title="订单详情"
          iconLeft="#back"
          backtoWechat={true}
          leftClick={() => console.log} />
        <Scroll className={styles.scroll} dataSource={food}>
          <OrderHeader />
          <div className={styles.content}>

            <div className={styles.item}>
              <div className={styles.img}>
                <img src={getImageUrl(snapshot.restaurant_image_hash)} />
              </div>
              <span className={styles.text}>{snapshot.restaurant_name}</span>
            </div>

            {
              food.map((v, i) => (
                <div className={styles.item} key={i}>
                  <span className={styles.text}>{v.name}</span>
                  <span className={styles.num}>x{v.quantity}</span>
                  <span className={styles.price}>¥{v.price}</span>
                </div>
              ))
            }

            <div className={styles.item}>
              <span className={styles.text}>配送费</span>
              <span className={styles.price}>
                ¥{snapshot.basket && snapshot.basket.deliver_fee.price}
              </span>
            </div>

            {
              extra.map((v, i) => (
                <div className={styles.item} key={i}>
                  <span className={styles.text}>{v.name}</span>
                  <span
                    className={cls(styles.price, styles.red)}>
                    - ¥{v.price.toString().slice(1)}
                  </span>
                </div>
              ))
            }

            {
              snapshot.basket && snapshot.basket.hongbao ? (
                <div className={styles.item}>
                  <span className={styles.text}>{snapshot.basket.hongbao.name}</span>
                  <span
                    className={cls(styles.price, styles.red)}>
                    - ¥{snapshot.basket.hongbao.price.toString().slice(1)}
                  </span>
                </div>
              ) : null
            }

            <h1 className={styles.total}>实付 ¥{snapshot.total_amount}</h1>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>配送信息</h1>
            <div className={styles.desc}>
              <div className={styles.item}>
                <span className={styles.label}>送达时间</span>
                <span className={styles.text}>{snapshot.deliver_time}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>送货地址</span>
                <span className={styles.text}>
                  {snapshot.consignee}<br />{snapshot.phone}<br />{snapshot.address}
                </span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>配送方式</span>
                <span className={styles.text}>{desc.delivery_company}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>配送骑手</span>
                <span className={styles.text}>{desc.rider_name},{desc.rider_phone}</span>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>订单信息</h1>
            <div className={styles.desc}>
              <div className={styles.item}>
                <span className={styles.label}>订单号</span>
                <span className={styles.text}>{snapshot.id}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>支付方式</span>
                <span className={styles.text}>{snapshot.pay_method}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>下单时间</span>
                <span className={styles.text}>{snapshot.formatted_created_at}</span>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }
}
const renderer = ({
  // hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    // Render a completed state
    return <div> 支付超时 </div>;
  } return <span>{minutes}分钟{seconds}秒</span>;
};
class OrderHeader extends Component {
  render() {
    return (
      <div className={styles.orderdetail_header}>
        <img className={styles.header_img} src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1998933028,4161933866&fm=173&app=25&f=JPEG?w=218&h=146&s=1ED7885E9CFB1E9A18839EFD0300401D" />
        <div className={styles.h_payStatus_c}>
          <div className={styles.h_payStatus}>等待支付</div>
          <img src={arrow_left_black} className={styles.h_pay_arrow} />
        </div>
        <div className={styles.h_orderDesc}>逾期未支付，订单将自动取消</div>
        <div className={styles.orderBtn_c}>
          <div className={styles.cancel_left_btn}>取消订单</div>
          <div className={styles.toPay_btn}>
            <Countdown
              date={Date.now() + 4000}
              renderer={renderer}
              onComplete={() => console.log('倒计时结束')} />
          </div>
        </div>

      </div>
    );
  }
}
