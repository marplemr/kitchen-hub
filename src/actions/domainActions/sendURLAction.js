import axios from 'axios'
import endpoint from '../../utils/endpoint'
import config from '../../utils/headers'

export const REQUEST_SEND_URL = 'REQUEST_SEND_URL'
export function requestSendURL(){
  console.log('requestSendRecipes')
  return{
    type: REQUEST_SEND_URL,
    fetching: true
  }
}

export const SEND_URL_SUCCESS = 'SEND_URL_SUCCESS';
export function sendURLSuccess(payload){
  console.log('sendURLSuccess',payload)
  return{
    type: SEND_URL_SUCCESS,
    fetching: false,
    messageClass: 'success',
    message: payload.message
  }
}

export const SEND_URL_REJECTED = 'SEND_URL_REJECTED';
export function sendURLRejected(payload){
  return{
    type: SEND_URL_REJECTED,
    fetching: false,
    messageClass: 'error',
    message: payload.message
  } 
}

export const SEND_URL = 'SEND_URL';
export function sendURL(url){
  console.log('sendURL')
  return dispatch =>{
    dispatch(requestSendURL())
    axios.post(endpoint, {url: url}, config)
      .then(response => response.data)
      .then(json => dispatch(sendURLSuccess(json)))
      .catch(err => dispatch(sendURLRejected({message: err.toString()})))
    }
}