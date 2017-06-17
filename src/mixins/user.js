import wepy from 'wepy'
import { getUser } from '../libs/getUser'

export default class UserMixin extends wepy.mixin {
  getUser = getUser
}
