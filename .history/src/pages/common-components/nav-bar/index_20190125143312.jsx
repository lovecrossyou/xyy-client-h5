

import React from 'react'
import Proptypes from 'prop-types'
import cls from 'classnames'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default class NavBar extends React.PureComponent {
  /* eslint-disable */
  static proptypes = {
    iconLeft: Proptypes.string,
    iconRight: Proptypes.string,
    leftClick: Proptypes.func,
    rightClick: Proptypes.func,
    title: Proptypes.string,
    className: Proptypes.string,
    // leftIconStyle: Proptypes.string,
    // titleStyle: Proptypes.string,

  }
  /* eslint-enable */

  static defaultProps = {
    iconLeft: '',
    iconRight: '',
    leftClick: () => {},
    rightClick: () => {},
    title: '',
  }

  render() {
    const {
      iconLeft,
      iconRight,
      leftClick,
      rightClick,
      title,
      className,
      titleStyle,
      leftIconStyle,
    } = this.props
    return (
      <div className={cls(styles.nav, className)}>
        {
          iconLeft ? (
            <div className={cls(styles.icon, leftIconStyle)} onClick={leftClick}>
              <SvgIcon name={iconLeft} />
            </div>
          ) : null
        }
        <div className={cls(titleStyle)}>{title}</div>
        {
          iconRight ? (
            <div className={styles.icon} onClick={rightClick}>
              <SvgIcon name={iconRight} />
            </div>
          ) : null
        }
      </div>
    )
  }
}
