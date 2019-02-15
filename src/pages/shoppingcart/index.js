/* eslint-disable react/jsx-closing-tag-location */
/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:37
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SvgIcon from 'components/icon-svg'
import Scroll from 'components/scroll'
import withTabBar from '../common-components/tab-bar'

import styles from './index.less';
import { shoppingCartUpdate } from '../../stores/shopping-cart'
import NavBar from '../common-components/nav-bar'

const mapStateToPros = ({ shoppingCart }) => {
  return {
    cart: shoppingCart.cart,
  }
}

const mapDispatchToPrps = dispatch => bindActionCreators({ shoppingCartUpdate }, dispatch)


const Product = () => {
  return (
    <div className={styles.shoppingcart_product_info}>
      <img className={styles.shoppingcart_product_icon} src="" alt="" />
      <div className={styles.p_name}>农夫山泉</div>
      <div className={styles.p_price}>¥ 18.00</div>
    </div>
  )
}

const Cart = () => {
  return (
    <div className={styles.shoppingcart_wrapper}>
      <div className={styles.shoppingcart_shopInfo_wrapper}>
        <div className={styles.shoppingcart_shopInfo}>
          <img src="" alt="" className={styles.shoppingcart_shop_icon} />
          <div className={styles.shoppingcart_shop_name}>家乐福</div>
        </div>
        <div>
          <SvgIcon name="#right" className={styles['icon-right']} />
        </div>
      </div>

      <div className={styles.products}>
        <Product />
        <Product />
      </div>
    </div>
  );
};

@connect(mapStateToPros, mapDispatchToPrps)
@withTabBar
export default class ShoppingCart extends React.Component {
  render() {
    const { history, cart } = this.props

    const scrollProps = {
      className: styles.scroll,
      dataSource: cart,
      pullUpLoad: true,
      pullingUp: this.props.shoppingCartUpdate,
    }

    console.log('cart ', cart);

    return (
      <div className={styles.shoppingcart}>
        <NavBar
          title="购物车"
          iconLeft="#back"
          leftClick={() => history.goBack()} />
        <Scroll {...scrollProps}>
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </Scroll>
      </div>
    );
  }
}
