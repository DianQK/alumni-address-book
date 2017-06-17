import wepy from 'wepy'

export default class PullDownRefreshMixin extends wepy.mixin {
  async pullDownRefresh () {

  }
  async onPullDownRefresh () {
    await this.pullDownRefresh()
    wx.stopPullDownRefresh()
  }
}
