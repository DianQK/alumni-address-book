import wepy from 'wepy'

const _showLoading = (empty) => {
  if (empty) {
    wx.showLoading({
      title: '加载中'
    })
  } else {
    wx.showNavigationBarLoading()
  }
}

const _hideLoading = (empty) => {
  if (empty) {
    wx.hideLoading()
  } else {
    wx.hideNavigationBarLoading()
  }
}

export default class LoadingMixin extends wepy.mixin {
  async showLoading (empty = false, f) {
    try {
      _showLoading(empty)
      await f()
      _hideLoading(empty)
    } catch (error) {
      console.error(error)
      _hideLoading(empty)
    }
  }
}
