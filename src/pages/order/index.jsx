

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DocumentTitle from 'react-document-title';
import qs from 'query-string'
import { fetchOrderList } from 'stores/order'
import Scroll from 'components/scroll'
// import NavBar from '../common-components/nav-bar'
// import withTabBar from '../common-components/tab-bar'
import OrderRow from '../common-components/order-list-row'
import AuthErr from '../common-components/auth-err'
import RowSk from '../common-components/skeleton/row'
import styles from './index.less'
import NavBar from '../common-components/nav-bar';

const mapStateToProps = ({ globalState, order }) => ({
  isLogin: globalState.isLogin,
  init: order.init,
  orderList: order.orderList,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrderList,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
// @withTabBar
export default class Order extends React.PureComponent {
  componentDidMount() {
    const { isLogin, init } = this.props
    if (isLogin && !init) {
      this.props.fetchOrderList(true, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && !nextProps.init) {
      this.props.fetchOrderList(true, false)
    }
  }

  handlePullingDown = () => {
    this.props.fetchOrderList(true, () => {
      this.scroll && this.scroll.forceUpdate()     // eslint-disable-line
    })
  }

  handlePullingUp = () => {
    this.props.fetchOrderList(false, () => {
      this.scroll && this.scroll.forceUpdate()     // eslint-disable-line
    })
  }

  rowClick = (id) => {
    console.log(`id===========>${id}`)
    this.props.history.push(`/order-detail?id=${id}`)
  }

  render() {
    const {
      orderList,
      isLogin,
      init,
    } = this.props
    const scrollProps = {
      className: styles.scroll,
      dataSource: orderList,
      pullDownRefresh: { stop: 40 },
      pullUpLoad: true,
      pullingDown: this.handlePullingDown,
      pullingUp: this.handlePullingUp,
    }
    const query = qs.parse(this.props.location.search) || {}
    const isHiddenNav = query.hiddenNav === 'hidden';

    return (
      <DocumentTitle title="订单" >
        <div className={styles.order}>
          {
            isHiddenNav ? null : <NavBar
              className={styles.nav}
              title="订单"
              iconLeft="#back"
              leftClick={() => this.props.history.goBack()} />
          }
          {
            isLogin ? (
              <Scroll {...scrollProps} ref={c => this.scroll = c}>
                {
                  // this.rowClick(v.unique_id)
                  init ? orderList.map(v => (
                    <OrderRow key={v.id} data={v} handleClick={() => this.rowClick(v.unique_id)} />
                  )) : Array.from({ length: 10 }, (v, i) => i).map(v => (
                    <RowSk key={v} style={{ backgroundColor: '#fff', marginBottom: 10 }} />
                  ))
                }
              </Scroll>
            ) : <AuthErr />
          }
        </div>
      </DocumentTitle>
    )
  }
}
