import omit from 'lodash.omit'
import Toast from 'components/toast'
// eslint-disable-next-line no-unused-vars
import { getBanner, getShopList } from '../api'

const UPDATE = 'HOME_UPDATE'

const initState = {
  init: false,
  topBarShrink: false,
  locationInfo: {},
  banner: [],
  entry: [],
  shoplist: [],
  rank_id: undefined,
}

export const home = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const homeUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const homeInit = () => {
  return async (dispatch, getState) => {
    const { init } = getState().home
    // const { locationInfo } = getState().home
    if (init) return
    try {
      // 定理位置
      // if (!locationInfo.latitude && !locationInfo.longitude) {
      //   const geoInfo = await getGeolocation()
      //   dispatch(homeUpdate({ locationInfo: geoInfo.data }))
      //   locationInfo = geoInfo.data      // eslint-disable-line
      // }
      // const location = { ...omit(locationInfo, ['address']) }

      const location = {
        latitude: 20.111111,
        longitude: 113.09091,
      }
      // 获取banner entry
      const [banner, list] = await Promise.all([
        getBanner(location),
        getShopList({
          ...location,
          page: 1,
          pageSize: 8,
        }),
      ])
      console.log('banner ', banner)
      console.log('list ', list)
      dispatch(homeUpdate({
        banner: banner || [],
        shoplist: [] || list,
        init: true,
      }))
    } catch (e) {
      Toast.info(e.err, 3, false)
      // console.log('e ', e)
    }
  }
}

export const homeList = (callback) => {
  return async (dispatch, getState) => {
    const {locationInfo, shoplist} = getState().home         // eslint-disable-line
    const location = { ...omit(locationInfo, ['address']) }
    try {
      const list = await getShopList({
        ...location,
        page: 1,
        pageSize: 8,
      })
      dispatch(homeUpdate({
        shoplist: [...shoplist, ...list.data.content],
      }))
      callback && callback()       // eslint-disable-line
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
