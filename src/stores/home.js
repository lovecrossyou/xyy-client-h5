import omit from 'lodash.omit'
import Toast from 'components/toast'
// eslint-disable-next-line no-unused-vars
import { getGeolocation, getBanner, getShopList } from '../api'

const UPDATE = 'HOME_UPDATE'

const entries = [
  {
    activity_id: 10016665,
    activity_ids: [
      10016665,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133249,
    image_url: 'http://qnimage.xiteng.com/night_food_90*90.png',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10016665&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B209%2C212%2C213%2C214%2C215%2C216%2C217%2C219%2C265%2C266%2C267%2C268%2C269%2C221%2C222%2C223%2C224%2C225%2C226%2C227%2C228%2C231%2C232%2C263%2C218%2C234%2C235%2C236%2C237%2C238%2C211%2C229%2C230%2C264%5D%7D%2C%22restaurant_category_id%22%3A%5B209%2C212%2C213%2C214%2C215%2C216%2C217%2C219%2C265%2C266%2C267%2C268%2C269%2C221%2C222%2C223%2C224%2C225%2C226%2C227%2C228%2C231%2C232%2C263%2C218%2C234%2C235%2C236%2C237%2C238%2C211%2C229%2C230%2C264%5D%7D&navType=0&color_type=1&target_name=%E7%BE%8E%E9%A3%9F&entry_id=20133249&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '夜宵',
    name_color: '',
    position: 1,
    sub_entries: [],
  },
  {
    activity_id: 10180553,
    activity_ids: [
      10180553,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133169,
    image_url: 'http://qnimage.xiteng.com/supermarket_90*90.png',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://offline?navColor=&title=&navType=0&target_name=&pluginId=bdwm.plugin.newretail&url=https%3A%2F%2Fh5-newretail.faas.ele.me%2Fstatic%2Fh5_newretail%2Fpages%2Fchannel.html%3Fchannel%3Dsupermarket&animation_type=1&pageName=channel&pageData=%7B%22channel%22%3A%22supermarket%22%7D',
    more: '{"tags":null}',
    name: '商超便利',
    name_color: '',
    position: 3,
    sub_entries: [],
  },
  {
    activity_id: 10018873,
    activity_ids: [
      10018873,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133017,
    image_url: 'http://qnimage.xiteng.com/fruit_90*90.png',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10018873&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B245%5D%7D%2C%22restaurant_category_id%22%3A%5B245%5D%7D&navType=0&color_type=1&target_name=%E6%9E%9C%E8%94%AC%E7%94%9F%E9%B2%9C&entry_id=20133017&page_type=1&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '水果',
    name_color: '',
    position: 4,
    sub_entries: [],
  },
  {
    activity_id: 10180561,
    activity_ids: [
      10180561,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133185,
    image_url: 'http://qnimage.xiteng.com/water90x90.png',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://offline?navColor=&title=&navType=0&target_name=&pluginId=bdwm.plugin.newretail&url=https%3A%2F%2Fh5-newretail.faas.ele.me%2Fstatic%2Fh5_newretail%2Fpages%2Fchannel.html%3Fchannel%3Dhealth&animation_type=1&pageName=channel&pageData=%7B%22channel%22%3A%22health%22%7D',
    more: '{"tags":null}',
    name: '桶装水',
    name_color: '',
    position: 5,
    sub_entries: [],
  },
  {
    activity_id: 10123265,
    activity_ids: [
      10123265,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133081,
    image_url: 'http://qnimage.xiteng.com/water_check90x90.png',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10123265&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B234%2C237%5D%7D%2C%22restaurant_category_id%22%3A%5B234%2C237%5D%7D&navType=0&color_type=1&target_name=%E7%82%B8%E9%B8%A1%E7%82%B8%E4%B8%B2&entry_id=20133081&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '水质检测',
    name_color: '',
    position: 10,
    sub_entries: [],
  },
]

const initState = {
  init: false,
  topBarShrink: false,
  locationInfo: {},
  banner: [],
  entry: entries,
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
    let { locationInfo } = getState().home
    if (init) return
    try {
      // 定理位置
      if (!locationInfo.latitude && !locationInfo.longitude) {
        const geoInfo = await getGeolocation()
        dispatch(homeUpdate({ locationInfo: geoInfo.data }))
        locationInfo = geoInfo.data      // eslint-disable-line
      }
      const location = { ...omit(locationInfo, ['address']) }

      // const location = {
      //   latitude: 20.111111,
      //   longitude: 113.09091,
      // }
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
        shoplist: list.content,
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
        shoplist: [...shoplist, ...list.content],
      }))
      callback && callback()       // eslint-disable-line
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
