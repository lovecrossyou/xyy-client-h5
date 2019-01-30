

import React from 'react'
import { connect } from 'react-redux'
import cls from 'classnames'
import SvgIcon from 'components/icon-svg'
import { formatPhone, getImageUrl } from 'utils/utils'
import NavBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import styles from './index.less'

@connect(({ globalState }) => ({
  isLogin: globalState.isLogin,
  userInfo: globalState.userInfo,
}))
@withTabBar
export default class Profile extends React.Component {
  render() {
    const { history, userInfo, isLogin } = this.props
    const {
      username,
      mobile,
      avatar,
      balance,
      brand_member_new,
      gift_amount,
    } = userInfo
    const avatarUrl = getImageUrl(avatar)
    const changePage = path => history.push(path)

    const getItemContent = (icon, style, count, unit) => {
      if (isLogin) {
        return (
          <div className={cls(styles.count, style)}>
            <span>{count}</span>
            <span className={styles.unit}>{unit}</span>
          </div>
        )
      }
      return (
        <div className={styles.icon}>
          <SvgIcon name={icon} />
        </div>
      )
    }

    const goDetail = () => {
      console.log('123123')
    }

    return (
      <div className={styles.root}>
        <NavBar
          title="我"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />

        <div className={styles['profile-info']} onClick={!isLogin ? () => changePage('/login') : goDetail}>
          <div className={styles.avatar}>
            {
              avatarUrl ? (
                <img src={avatarUrl} className={styles.img} />
              ) : <SvgIcon name="#avatar" className={styles.icon} />
            }
          </div>
          <div className={styles.desc}>
            <p className={styles.info}>
              {
                !isLogin ? '登陆/注册' : username
              }
            </p>
            <p className={styles.text}>
              <SvgIcon name="#iphone" className={styles.icon} />
              <span>
                {
                  !isLogin ? '登陆后可享受更多特权' : formatPhone(mobile)
                }
              </span>
            </p>
          </div>
          <SvgIcon name="#right" className={styles['icon-right']} />
        </div>

        <div className={styles.column}>
          <div className={styles.item}>
            {
              getItemContent('#wallet', styles.blue, balance, '元')
            }
            <p className={styles.desc}>钱包</p>
          </div>
          <div className={styles.item} onClick={() => changePage('/benefit')}>
            {
              getItemContent('#conpon', styles.red, gift_amount, '个')
            }
            <p className={styles.desc}>优惠券</p>
          </div>
          <div className={styles.item}>
            {
              getItemContent('#jifen', styles.green, brand_member_new, '个')
            }
            <p className={styles.desc}>积分</p>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.item} onClick={() => changePage('/order')}>
            <div className={styles.icon}>
              <SvgIcon name="#order" />
            </div>
            <p className={styles.desc}>我的订单</p>
            <SvgIcon name="#right" className={styles['icon-right']} />
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.item} onClick={() => changePage('/address')}>
            <div className={styles.icon}>
              <SvgIcon name="#me-address" />
            </div>
            <p className={styles.desc}>我的地址</p>
            <SvgIcon name="#right" className={styles['icon-right']} />
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.item} onClick={() => changePage('/address')}>
            <div className={styles.icon}>
              <SvgIcon name="#feedback" />
            </div>
            <p className={styles.desc}>意见反馈</p>
            <SvgIcon name="#right" className={styles['icon-right']} />
          </div>
        </div>


        <div className={styles.list}>
          <div className={styles.item} onClick={() => changePage('/address')}>
            <div className={styles.icon}>
              <SvgIcon name="#more" />
            </div>
            <p className={styles.desc}>更多</p>
            <SvgIcon name="#right" className={styles['icon-right']} />
          </div>
        </div>

      </div>
    )
  }
}
