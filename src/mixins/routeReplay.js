import wepy from 'wepy'

export default class RouteReplayMixin extends wepy.mixin {

  async onLoad () {
    let pages = getCurrentPages()
    let isRoot = pages.length === 1
    let currentPage = pages[0]
    if (isRoot) {
      try {
        let routes = JSON.parse(wx.getStorageSync('__route'))
        for (let [index, route] of routes.entries()) {
          if (index !== 0) {
            await this.$navigate(`/${route.url}`, route.query)
          } else if (route.url !== currentPage.route) {
            return
          }
        }
      } catch (error) {
        console.log(`无历史路由, ${error}`)
      }
    }
  }

}
