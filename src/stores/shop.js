

import Toast from 'components/toast'
import { getShopInfo, getShopRatings } from '../api'

const UPDATE = 'SHOP_UPDATE'
const scoreInfo = {
  compare_rating: 0.47238855622089154,
  deliver_time: 42,
  food_score: 4.818913480885312,
  item_good_score: 0.9763313609467456,
  order_rating_amount: 675,
  overall_score: 4.781368821292776,
  package_score: 4.818913480885312,
  rider_score: 4.7924151696606785,
  service_score: 4.774647887323944,
  shop_score: 4.781368821292776,
  taste_score: 4.774647887323944,
}
const tags = [
  {
    count: 675,
    name: '全部',
    unsatisfied: false,
  },
  {
    count: -1,
    name: '最新',
    unsatisfied: false,
  },
  {
    count: 646,
    name: '好评',
    unsatisfied: false,
  },
  {
    count: 15,
    name: '差评',
    unsatisfied: true,
  },
  {
    count: 37,
    name: '有图',
    unsatisfied: false,
  },
  {
    count: 18,
    name: '味道好',
    unsatisfied: false,
  },
]
const initState = {
  loading: true,
  info: {
    info: {
      imageUrl: '',
    },
  },
  menu: [],
  tags: [],
  tagIndex: '',
  foodMenuIndex: 0,
  ratings: [],
  restaurant_id: null,
}

export const shop = (state = initState, action) => {
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

export const shopUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const shopDestroy = () => {
  return {
    payload: initState,
    type: UPDATE,
  }
}

export const shopInit = () => {
  return async (dispatch) => {
    // const { restaurant_id } = params
    const restaurant_id = 'E8769309642570958353'
    try {
      // const [info, menu, ratings, tags, scores] = await Promise.all([
      const [info, ratings] = await Promise.all([
        // getShopInfo({
        //   ...params,
        //   terminal: 'h5',
        //   extras: ['activities', 'albums', 'license', 'identification', 'qualification'],
        // }),
        getShopInfo({
          id: 13,
        }),
        // getShopFood({ restaurant_id }),
        getShopRatings({
          shopId: 13,
          page: 1,
          pageSize: 8,
        }),
        // getShopRatings({
        //   restaurant_id,
        //   has_content: true,
        //   offset: 0,
        //   limit: 8,
        // }),
        // getRatingTags({ restaurant_id }),
        // getRatingScores({ restaurant_id }),
      ])

      dispatch(shopUpdate({
        restaurant_id,
        loading: false,
        // info: info.data,
        info,
        menu: info.products,
        ratings: ratings.content,
        tags,
        tagIndex: tags.length ? tags[0].name : '',
        scores: scoreInfo,
      }))
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}

export const changeRatingTag = (params) => {
  return async (dispatch, getState) => {
    const { restaurant_id } = getState().shop
    Toast.loading('加载中...', 0)
    try {
      const { data } = await getShopRatings({
        restaurant_id,
        has_content: true,
        tag_name: params,
        offset: 0,
        limit: 8,
      })
      dispatch(shopUpdate({
        ratings: data,
        tagIndex: params,
      }))
      setTimeout(() => Toast.hide(), 400)
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
