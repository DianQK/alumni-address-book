import wepy from 'wepy'

export default class RouteMixin extends wepy.mixin {

  onRoute () {
    let json = JSON.stringify(getCurrentPages().map(page => {
      return { url: page.route, query: page.options }
    }))
    wx.setStorage({
      key: '__route',
      data: json
    })
  }

}
