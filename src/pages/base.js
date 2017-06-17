import wepy from 'wepy'
import LoadingMixin from '../mixins/loading'
import StoreMixin from '../mixins/store'
import PullDownRefreshMixin from '../mixins/pullDownRefresh'
import UserMixin from '../mixins/user'
import RouteMixin from '../mixins/route'
import RouteReplayMixin from '../mixins/routeReplay'
import Config from '../config'

let mixins = [LoadingMixin, StoreMixin, PullDownRefreshMixin, UserMixin]
if (Config.dev) {
  mixins =  [...mixins, RouteMixin, RouteReplayMixin]
}

export default class BasePage extends wepy.page {
  mixins = mixins
}
