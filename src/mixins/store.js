import wepy from 'wepy'
import { getStore } from 'wepy-redux'

const store = getStore()

export default class StoreMixin extends wepy.mixin {
  $store = store
}
