import Toast from 'components/toast'
import { postConfirmOrder } from '../api';

/* eslint-disable import/prefer-default-export */
const CHOOSETICKET = 'CHOOSETICKET'
const GETCHOOSELIST = 'GETCHOOSELIST'
const ticketClick = 'ticketClick'
const CHOOSEADDRESS = 'chooseAddress_order'
const CONFIRMINFO = 'saveconfirminfo'


const mytickets = [{ name: '新人首单立减', money: 20 },
  { name: '新人首单立减', money: 30 },
  { name: '新人首单立减', money: 20 },
  { name: '新人首单立减', money: 20 },
  { name: '新人首单立减', money: 20 }];

const initState = {
  info: { productItemList: [] },
  tickets: [],
  ticketChooseIndex: -1,
  ticket: {},
  address: {},
}


export const orderConfirm = (state = initState, action) => {
  switch (action.type) {
    case CHOOSETICKET:
      return {
        ...state,
        ticket: action.payload,
      }
    case GETCHOOSELIST:
      return {
        ...state,
        tickets: mytickets,
      }
    case ticketClick:
      return {
        ...state,
        ticketChooseIndex: action.payload,
      }
    case CHOOSEADDRESS:
      return {
        ...state,
        address: action.payload,
      }
    case CONFIRMINFO:
      return {
        ...state,
        info: action.payload,
      }
    default:
      return state
  }
}
export const getTicketsList = (params) => {
  return {
    payload: params,
    type: GETCHOOSELIST,
  }
}
export const chooseTicket = (params) => {
  return {
    payload: params,
    type: CHOOSETICKET,
  }
}

export const saveOrderInfo = (params) => {
  return {
    payload: params,
    type: CONFIRMINFO,
  }
}

export const ticketClickAction = (chooseIndex) => {
  return {
    payload: chooseIndex,
    type: ticketClick,
  }
}
export const chooseAddress = (params) => {
  return {
    payload: params,
    type: CHOOSEADDRESS,
  }
}
export const getConfirmOrderInfo = (callback) => {
  return async (dispatch, getState) => {
    const { cart } = getState().shoppingCart
    console.log('cart======')
    console.log(JSON.stringify(cart))
    const params = {
      shopId: 13,
      userId: 2,
      products: [
        {
          quantity: 2,
          productId: 10,
        },
        {
          quantity: 7,
          productId: 13,
        },
        {
          quantity: 1,
          productId: 14,
        },
      ],
    }
    try {
      const orderInfo = await postConfirmOrder(params)
      dispatch(saveOrderInfo(orderInfo))
      callback && callback()     // eslint-disable-line
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
