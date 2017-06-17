import wepy from 'wepy'
import Avatar from '../components/avatar'
import TeamItem from '../components/teamItem'
import AV from '../libs/av-weapp-min'
import Student from '../models/student'
import TeamStudentMap from '../models/teamStudentMap'
import { UPDATE_PROFILE } from '../store/types'
import { getStore, connect } from 'wepy-redux'

const store = getStore()

export const getUser = async () => {
  var user = AV.User.current()
  var shouldLogin = true
  if (user) {
    var isAuthenticated = await user.isAuthenticated()
    if (isAuthenticated) {
      shouldLogin = false
    }
  }

  if (shouldLogin) {
    await AV.User.loginWithWeapp()
  }

  var userInfo = await wepy.getUserInfo()
  user = AV.User.current()
  user = await user.set(userInfo).save()
  var avatarUrl = user.toJSON().userInfo.avatarUrl
  var nickName = user.toJSON().userInfo.nickName
  var studentId = user.get('studentId')
  if (!studentId) {
    var student = new Student()
    student.name = nickName
    student.avatarUrl = avatarUrl
    student.currentStatus = '目前还没有设置状态'
    student.mobilePhoneNumber = ''
    var acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(false)
    acl.setWriteAccess(user, true)
    student = await student.setACL(acl).save()
    studentId = student.objectId
    await user.set('studentId', studentId).save()
  }
  var student = await new AV.Query(Student).get(studentId)
  store.dispatch({ type: UPDATE_PROFILE, payload: student.toJSON() })
  return user
}
