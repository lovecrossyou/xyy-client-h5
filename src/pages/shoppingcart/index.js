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
import DocumentTitle from 'react-document-title';

import SvgIcon from 'components/icon-svg'
import Scroll from 'components/scroll'
import withTabBar from '../common-components/tab-bar'

import styles from './index.less';
import { shoppingCartUpdate } from '../../stores/shopping-cart'
// import NavBar from '../common-components/nav-bar'

const mapStateToPros = ({ shoppingCart }) => {
  return {
    cart: shoppingCart.cart,
  }
}

const mapDispatchToPrps = dispatch => bindActionCreators({ shoppingCartUpdate }, dispatch)


const Product = ({ data }) => {
  return (
    <div className={styles.shoppingcart_product_info}>
      <img className={styles.shoppingcart_product_icon} src="" alt="" />
      <div className={styles.p_name}>{data.name}</div>
      <div className={styles.p_price}>¥ {data.price}</div>
    </div>
  )
}

const Cart = ({ cart }) => {
  return (
    <div className={styles.shoppingcart_wrapper}>
      <div className={styles.shoppingcart_shopInfo_wrapper}>
        <div className={styles.shoppingcart_shopInfo}>
          <img src="" alt="" className={styles.shoppingcart_shop_icon} />
          <div className={styles.shoppingcart_shop_name}>{cart.name}</div>
        </div>
        <div>
          <SvgIcon name="#right" className={styles['icon-right']} />
        </div>
      </div>

      <div className={styles.products}>
        {
          cart.items.slice(0, 3).map((p, index) => {
            return <Product data={p} key={`${index}#`} />
          })
        }
      </div>
    </div>
  );
};

@connect(mapStateToPros, mapDispatchToPrps)
@withTabBar
export default class ShoppingCart extends React.Component {
  // 购物车根据店铺ID分组
  split_cart_group(arr) {
    const map = {}
    const carts = []
    for (let i = 0; i < arr.length; i++) {
      const ai = arr[i];
      if (!map[ai.restaurant_id]) {
        carts.push({
          id: ai.restaurant_id,
          name: ai.name,
          items: [ai],
        });
        map[ai.restaurant_id] = ai;
      } else {
        for (let j = 0; j < carts.length; j++) {
          const dj = carts[j];
          if (dj.id === ai.restaurant_id) {
            dj.items.push(ai);
            break;
          }
        }
      }
    }
    return carts.filter(cart => cart.id !== undefined);
  }
  render() {
    // eslint-disable-next-line no-unused-vars
    const { history, cart } = this.props
    const carts = this.split_cart_group(cart)
    console.log('carts #', carts);
    const scrollProps = {
      className: styles.scroll,
      dataSource: carts,
      pullUpLoad: true,
      pullingUp: this.props.shoppingCartUpdate,
    }
    return (
      <DocumentTitle title="购物车" >
        <div className={styles.shoppingcart}>
          {/* <NavBar
            title="购物车"
            iconLeft="#back"
            leftClick={() => history.goBack()} /> */}
          <Scroll {...scrollProps}>
            {
              carts.map((d, index) => <Cart cart={d} key={`${index}#`} />)
            }
          </Scroll>
        </div>
      </DocumentTitle>
    );
  }
}
