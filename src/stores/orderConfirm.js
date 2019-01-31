/* eslint-disable import/prefer-default-export */
const CHOOSETICKET = 'CHOOSETICKET'
const GETCHOOSELIST = 'GETCHOOSELIST'
const ticketClick = 'ticketClick'

const mytickets = [{ name: '新人首单立减', money: 20 },
  { name: '新人首单立减', money: 30 },
  { name: '新人首单立减', money: 20 },
  { name: '新人首单立减', money: 20 },
  { name: '新人首单立减', money: 20 }];

const initState = {
  info: {},
  tickets: [],
  ticketChooseIndex: -1,
  ticket: {},
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
export const ticketClickAction = (chooseIndex) => {
  return {
    payload: chooseIndex,
    type: ticketClick,
  }
}
