/* eslint-disable react/jsx-no-bind */


import React from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { bindActionCreators } from 'redux';
import Toast from 'components/toast'
import SvgIcon from 'components/icon-svg'
import Scroll from 'components/scroll'
import Loading from 'components/loading'
import NavBar from '../common-components/nav-bar'
import NoData from '../common-components/no-data'
import AuthError from '../common-components/auth-err'
import AddressRow from './address-row'
import { getAddress } from '../../api'
import { chooseAddress } from '../../stores/orderConfirm';
import styles from './index.less'

class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
    }
  }

  componentDidMount() {
    this.props.isLogin && this.getAddress()    // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && !this.state.loading) {
      this.getAddress()
    }
  }

  getAddress = async () => {
    try {
      this.setState({ loading: true })
      const { data } = await getAddress()
      this.setState({
        list: data,
        loading: false,
      })
    } catch ({ err }) {
      this.setState({ loading: false })
      Toast.info(err)
    }
  }

  goEdit = (val = false) => {
    this.props.history.push({
      pathname: '/address-edit',
      state: val,
    })
  }
  chooseAdd(address) {
    console.log(address)
    const query = qs.parse(this.props.location.search) || {}
    console.log(`query=========${JSON.stringify(query)}`)
    if (query.choose === '1') {
      this.props.chooseAddress(address)
      this.props.history.goBack();
    }
  }
  render() {
    const { isLogin } = this.props
    const { list, loading } = this.state

    return !isLogin ? <AuthError /> : (
      <div className={styles.address}>
        <NavBar
          title="我的地址"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        {
          loading ? <Loading style={{ marginTop: 20 }} /> : list.length ? (
            <div className={styles.list}>
              <Scroll dataSource={list} className={styles.scroll}>
                {
                  list.map(v => (
                    <AddressRow
                      key={v.id}
                      data={v}
                      handleClick={() => this.goEdit(v)}
                      choose={() => this.chooseAdd(v)} />
                  ))
                }
              </Scroll>
            </div>
          ) : <NoData />
        }
        <button className={styles.add} onClick={() => this.goEdit()}>
          <div className={styles.icon}>
            <SvgIcon name="#round_add" />
          </div>
          <span>新增收获地址</span>
        </button>
      </div>
    )
  }
}
const mapStateToProps = ({ globalState }) => ({
  isLogin: globalState.isLogin,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseAddress,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Address)
