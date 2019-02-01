import React from 'react'
import numeral from 'numeral'
import Rate from 'components/rate'
import Badge from '../badge'
import styles from './index.less'

export default class ShopListRow extends React.PureComponent {
  state = {
    showAll: false,
  }

  showAll = (e) => {
    e.stopPropagation()
    // 刷新 betterscroll
    const { refresh } = this.props
    this.setState({
      showAll: !this.state.showAll,
    }, () => {
      refresh && refresh()     // eslint-disable-line
    })
  }

  render() {
    const { data, handleClick } = this.props
    return (
      <div className={styles['shop-row']} onClick={handleClick}>
        <div className={styles['info-wrapper']}>
          <div className={styles.img}>
            <img alt="" src={data.imageUrl} />
            {
              data.next_business_time ? (
                <div className={styles.desc} content={`${data.next_business_time}开始配送`} />
              ) : null
            }
          </div>

          <div className={styles.describe}>
            <h1 className={styles.name}>{data.name}</h1>
            <div className={styles['rate-wrapper']}>
              <div className={styles.rate}>
                <Rate className={styles['rate-style']} value={data.score} size="1em" />
              </div>
              <span className={styles.text}>{data.rating}</span>
              <span className={styles.text}>{`月售${data.soldAmount}单`}</span>
              {
                data.delivery_mode ? (
                  <Badge className={styles.delivery} text={data.delivery_mode.text} />
                ) : null
              }
            </div>

            <div className={styles['price-info']}>
              <div className={styles.delivery}>
                <span className={styles.text}>{`¥起送${numeral(data.miniNumOrderAmount / 100).format('0.0')}`}</span>
                <span className={`${styles.line} hairline-v`} />
                <span className={styles.text}>{`配送费¥${numeral(data.deliveryFee / 100).format('0.0')}`}</span>
              </div>
              <div className={styles.address}>
                <span className={styles.text}>{`${numeral(data.distance / 1000).format('0.00')}km`}</span>
                <span className={`${styles.line} hairline-v`} />
                {/* <span className={styles.text}>{`${28}分钟`}</span> */}
              </div>
            </div>
          </div>
        </div>
        <span className={`${styles['bottom-line']} hairline-h`} />
      </div>
    )
  }
}
