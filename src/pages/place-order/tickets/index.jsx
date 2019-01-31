/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getTicketsList, ticketClickAction, chooseTicket } from '../../../stores/orderConfirm'
import styles from './index.less'
import NavBar from '../../common-components/nav-bar'
import Scroll from '../../../components/scroll';
import arrow_ticket_down from '../../../assets/img/order/arrow_ticket_down.png';
import arrow_ticket_up from '../../../assets/img/order/arrow_ticket_up.png';

class Tickets extends Component {
  componentDidMount() {
    this.props.getTicketsList({});
  }
  render() {
    const {
      tickets,
    } = this.props
    const scrollProps = {
      className: styles.scroll,
      dataSource: tickets,
      pullUpLoad: false,
    }

    return (
      <div className={styles.tickets_container}>
        <NavBar
          title="选择优惠券"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <Scroll {...scrollProps}>
          {
            tickets.map((v, i) => (<Ticket
              key={`#${i}`}
              isChoose={i === this.props.chooseIndex}
              chooseAction={() => { this.props.ticketClickAction(i) }} />))
          }
        </Scroll>
        <BottomSaveBtn ticketChoose={() => {
          const ticket = tickets[this.props.chooseIndex];
          this.props.chooseTicket(ticket);
          this.props.history.goBack();
          }} />
      </div>
    )
  }
}
class Ticket extends Component {
  state = ({
    isShow: false,
  })
  render() {
    const { isChoose, chooseAction } = this.props;
    return (
      <div className={styles.ticket_container}>
        <div className={styles.ticket_container_sub1}>
          <div className={styles.ticket_container_sub2}>
            <div className={styles.ticket_container_sub_show_c} >
              <div className={styles.ticket_container_sub_show_l}>
                <div className={styles.ticket_sale_money}>立减20</div>
                <div className={styles.vertical_line} />
                <div className={styles.ticket_sale_des_c}>
                  <div className={styles.ticket_des}>新人首单免减</div>
                  <div className={styles.ticket_date}>有效期至2019-01-21</div>
                </div>
              </div>
              <div className={styles.ticket_choose_icon_container} onClick={() => chooseAction()}>
                <div
                  className={isChoose ? styles.ticket_choose_icon_s : styles.ticket_choose_icon} />
              </div>
              <div
                className={styles.ticket_show_rule}
                onClick={() => this.setState({ isShow: !this.state.isShow })}>
                <div className={styles.ticket_rule_btn}>使用规则</div>
                <img
                  rc={this.state.isShow ? arrow_ticket_up : arrow_ticket_down}
                  className={styles.ticket_rule_icon} />
              </div>
            </div>
            {
              this.state.isShow ? <TicketHiddenContent /> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

const BottomSaveBtn = ({ ticketChoose }) => {
  return (
    <div className={styles.bottomBtn_c}>
      <div className={styles.bottomBtn} onClick={() => ticketChoose()}>保存</div>
    </div>
  )
}
const TicketHiddenContent = () => {
  return (
    <div className={styles.ticket_show_content_c}>
      <div className={styles.horizontal_line} />
      <div className={styles.ticket_show_content}>
      本优惠为新人专享，不限任何商品，订单金额满减免金额即可，自领取日起30天有效
      </div>
    </div>
  )
}
const mapStateToProps = ({ orderConfirm }) => ({
  tickets: orderConfirm.tickets,
  chooseIndex: orderConfirm.ticketChooseIndex,
})

const mapActionsToProps = dispatch => bindActionCreators({
  getTicketsList,
  ticketClickAction,
  chooseTicket,
}, dispatch)

export default connect(mapStateToProps, mapActionsToProps)(Tickets)

