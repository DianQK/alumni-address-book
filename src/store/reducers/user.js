import { handleActions } from 'redux-actions'
import { UPDATE_PROFILE } from '../types'

export default handleActions({
  [UPDATE_PROFILE] (state, action) {
    return {
      ...state,
      name: action.payload.name,
      mobilePhoneNumber: action.payload.mobilePhoneNumber,
      currentStatus: action.payload.currentStatus,
      avatarUrl: action.payload.avatarUrl
    }
  }
}, {
  avatarUrl: '',
  name: '',
  mobilePhoneNumber: '',
  currentStatus: ''
})
