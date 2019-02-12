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
    image_url: '7d8a867c870b22bc74c87c348b75528djpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10016665&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B209%2C212%2C213%2C214%2C215%2C216%2C217%2C219%2C265%2C266%2C267%2C268%2C269%2C221%2C222%2C223%2C224%2C225%2C226%2C227%2C228%2C231%2C232%2C263%2C218%2C234%2C235%2C236%2C237%2C238%2C211%2C229%2C230%2C264%5D%7D%2C%22restaurant_category_id%22%3A%5B209%2C212%2C213%2C214%2C215%2C216%2C217%2C219%2C265%2C266%2C267%2C268%2C269%2C221%2C222%2C223%2C224%2C225%2C226%2C227%2C228%2C231%2C232%2C263%2C218%2C234%2C235%2C236%2C237%2C238%2C211%2C229%2C230%2C264%5D%7D&navType=0&color_type=1&target_name=%E7%BE%8E%E9%A3%9F&entry_id=20133249&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '美食',
    name_color: '',
    position: 1,
    sub_entries: [],
  },
  {
    activity_id: 10020905,
    activity_ids: [
      10020905,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133217,
    image_hash: '92160ac33f023d9074e13cd78f9b5964jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10020905&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B209%2C212%2C213%2C214%2C215%2C217%2C219%2C221%2C231%2C232%2C263%2C218%2C234%2C235%2C236%2C237%2C238%2C240%2C211%2C230%5D%7D%2C%22restaurant_category_id%22%3A%5B209%2C212%2C213%2C214%2C215%2C217%2C219%2C221%2C231%2C232%2C263%2C218%2C234%2C235%2C236%2C237%2C238%2C240%2C211%2C230%5D%7D&navType=0&color_type=1&target_name=%E5%A4%9C%E5%AE%B5&entry_id=20133217&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '夜宵',
    name_color: '',
    position: 2,
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
    image_hash: 'c7e76a23eb90dada42528bc41499d6f8jpeg',
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
    image_hash: '0d0dd7c960f08cdc756b1d3ad54978fdjpeg',
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
    image_hash: '70aaf108e256ebc9f02db599592ae655jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://offline?navColor=&title=&navType=0&target_name=&pluginId=bdwm.plugin.newretail&url=https%3A%2F%2Fh5-newretail.faas.ele.me%2Fstatic%2Fh5_newretail%2Fpages%2Fchannel.html%3Fchannel%3Dhealth&animation_type=1&pageName=channel&pageData=%7B%22channel%22%3A%22health%22%7D',
    more: '{"tags":null}',
    name: '医药健康',
    name_color: '',
    position: 5,
    sub_entries: [],
  },
  {
    activity_id: 10180577,
    activity_ids: [
      10180577,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133193,
    image_hash: '301c888acb2c8ba9e0c813f36ec9e90ajpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://offline?navColor=&title=&navType=0&target_name=&pluginId=bdwm.plugin.newretail&url=https%3A%2F%2Fh5-newretail.faas.ele.me%2Fstatic%2Fh5_newretail%2Fpages%2Fchannel.html%3Fchannel%3Dflower&animation_type=1&pageName=channel&pageData=%7B%22channel%22%3A%22flower%22%7D',
    more: '{"tags":null}',
    name: '浪漫鲜花',
    name_color: '',
    position: 6,
    sub_entries: [],
  },
  {
    activity_id: 10223259,
    activity_ids: [
      10223259,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133041,
    image_hash: 'e58bceb19258e3264e64fb856722c3c1jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://web?navColor=&target_name=&url=https%3A%2F%2Fpt.ele.me%2Fpaotui%2Fh5%2Fh5index%3Factivity_ids%3D%255B10223259%255D%23pageData%3D%257B%2522entrance%2522%253A%2522yinhangqudao%2522%257D&title=&navType=0&animation_type=1',
    more: '{"tags":null}',
    name: '跑腿代购',
    name_color: '',
    position: 7,
    sub_entries: [],
  },
  {
    activity_id: 10123281,
    activity_ids: [
      10123281,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133065,
    image_hash: 'b7f432619fb21a40b05cd25d11eca02djpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10123281&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B212%2C211%5D%7D%2C%22restaurant_category_id%22%3A%5B212%2C211%5D%7D&navType=0&color_type=1&target_name=%E6%B1%89%E5%A0%A1%E6%8A%AB%E8%90%A8&entry_id=20133065&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '汉堡披萨',
    name_color: '',
    position: 8,
    sub_entries: [],
  },
  {
    activity_id: 10234403,
    activity_ids: [
      10234403,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20159899,
    image_hash: 'c21e42997b86b232161a5a16ab813ae8jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://web?navColor=&target_name=&url=https%3A%2F%2Fh5.ele.me%2Fnewretail%2Fp%2Fchannel%2F%3Factivity_ids%3D%255B10234403%255D%26channel%3Dkitchen&title=&navType=0&animation_type=1',
    more: '{"tags":null}',
    name: '厨房生鲜',
    name_color: '',
    position: 9,
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
    image_hash: 'a780fb469b2da210827ec16896e00420jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10123265&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B234%2C237%5D%7D%2C%22restaurant_category_id%22%3A%5B234%2C237%5D%7D&navType=0&color_type=1&target_name=%E7%82%B8%E9%B8%A1%E7%82%B8%E4%B8%B2&entry_id=20133081&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '炸鸡炸串',
    name_color: '',
    position: 10,
    sub_entries: [],
  },
  {
    activity_id: 10021281,
    activity_ids: [
      10021281,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133161,
    image_hash: 'a8aec21096d528b7cfd23cdd894f01c6jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10021281&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B221%2C222%2C223%2C224%2C225%2C226%2C227%2C228%2C231%2C232%2C263%5D%7D%2C%22restaurant_category_id%22%3A%5B221%2C222%2C223%2C224%2C225%2C226%2C227%2C228%2C231%2C232%2C263%5D%7D&navType=0&color_type=1&target_name=%E5%9C%B0%E6%96%B9%E8%8F%9C%E7%B3%BB&entry_id=20133161&page_type=1&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '地方菜系',
    name_color: '',
    position: 11,
    sub_entries: [],
  },
  {
    activity_id: 10021297,
    activity_ids: [
      10021297,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133145,
    image_hash: 'ec7b7ba9547aa700bd20d0420e1794a8jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10021297&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B214%5D%7D%2C%22restaurant_category_id%22%3A%5B214%5D%7D&navType=0&color_type=1&target_name=%E9%BA%BB%E8%BE%A3%E7%83%AB&entry_id=20133145&page_type=1&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '麻辣烫',
    name_color: '',
    position: 12,
    sub_entries: [],
  },
  {
    activity_id: 10121817,
    activity_ids: [
      10121817,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133033,
    image_hash: '01a314b6da88ab6c7ae9828f91652d40jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10121817&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B265%2C266%2C267%2C268%2C269%5D%7D%2C%22restaurant_category_id%22%3A%5B265%2C266%2C267%2C268%2C269%5D%7D&navType=0&color_type=1&target_name=%E9%80%9F%E9%A3%9F%E7%AE%80%E9%A4%90&entry_id=20133033&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '速食简餐',
    name_color: '',
    position: 13,
    sub_entries: [],
  },
  {
    activity_id: 10021705,
    activity_ids: [
      10021705,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133209,
    image_hash: '7d66f2631288a44ec177204e05cbcb93jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10021705&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B234%2C235%2C237%5D%7D%2C%22restaurant_category_id%22%3A%5B234%2C235%2C237%5D%7D&navType=0&color_type=1&target_name=%E5%9C%B0%E6%96%B9%E5%B0%8F%E5%90%83&entry_id=20133209&page_type=1&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '地方小吃',
    name_color: '',
    position: 14,
    sub_entries: [],
  },
  {
    activity_id: 10128913,
    activity_ids: [
      10128913,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133105,
    image_hash: 'a7bb02bd836411c016935d258b300cfejpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10128913&target=%7B%22is_premium%22%3A1%2C%22specified_attributes%22%3A%5B8%5D%2C%22support_ids%22%3A%5B8%5D%7D&navType=0&color_type=1&target_name=%E5%A4%A7%E7%89%8C%E6%83%A0%E5%90%83&banner_type=0&entry_id=20133105&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '大牌惠吃',
    name_color: '',
    position: 15,
    sub_entries: [],
  },
  {
    activity_id: 10123353,
    activity_ids: [
      10123353,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133137,
    image_hash: 'e89185f7259ebda19e16123884a60ef2jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10123353&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B213%5D%7D%2C%22restaurant_category_id%22%3A%5B213%5D%7D&navType=0&color_type=1&target_name=%E7%B1%B3%E7%B2%89%E9%9D%A2%E9%A6%86&entry_id=20133137&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '米粉面馆',
    name_color: '',
    position: 16,
    sub_entries: [],
  },
  {
    activity_id: 10123241,
    activity_ids: [
      10123241,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133089,
    image_hash: '51adc885d2ce022d2ee60495acafb795jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10123241&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B215%2C216%2C217%5D%7D%2C%22restaurant_category_id%22%3A%5B215%2C216%2C217%5D%7D&navType=0&color_type=1&target_name=%E5%8C%85%E5%AD%90%E7%B2%A5%E5%BA%97&entry_id=20133089&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '包子粥店',
    name_color: '',
    position: 17,
    sub_entries: [],
  },
  {
    activity_id: 10121817,
    activity_ids: [
      10121817,
    ],
    background_color: 'FF5D2F',
    business_flag: 0,
    description: '',
    id: 20133121,
    image_hash: 'd387bddb07503aea4b711236348e2632jpeg',
    is_in_serving: true,
    is_need_bind_taobao: true,
    is_personalized: false,
    link: 'eleme://restaurants?search_source=1&activity_id=10121817&target=%7B%22delivery_mode%22%3A%5B%5D%2C%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B265%2C266%2C267%2C268%2C269%5D%7D%2C%22restaurant_category_id%22%3A%5B265%2C266%2C267%2C268%2C269%5D%7D&navType=0&color_type=1&target_name=%E9%80%9F%E9%A3%9F%E7%AE%80%E9%A4%90&entry_id=20133121&page_type=2&business_flag=0&animation_type=1',
    more: '{"tags":null}',
    name: '速食简餐',
    name_color: '',
    position: 18,
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
