/* eslint-disable import/prefer-default-export */
const CHOOSETICKET = 'CHOOSETICKET'

const initState = {
  info: {},
  tickets: [],
}


export const orderConfirm = (state = initState, action) => {
  switch (action.type) {
    case CHOOSETICKET:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
export const chooseTicket = (params) => {
  return {
    payload: params,
    type: CHOOSETICKET,
  }
}
