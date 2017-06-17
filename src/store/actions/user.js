import { UPDATE_PROFILE } from '../types'
import { createAction } from 'redux-actions'
import AV from '../../libs/av-weapp-min'
import Student from '../../models/student'
import { getUser } from '../../libs/getUser'

export const updateProfile = createAction(UPDATE_PROFILE, async ({ name, mobilePhoneNumber, currentStatus }) => {
  let user = await getUser()
  let studentId = user.get('studentId')
  let student = await new AV.Query(Student).get(studentId)
  student.name = name
  student.mobilePhoneNumber = mobilePhoneNumber
  student.currentStatus = currentStatus
  await student.save()
  student = await new AV.Query(Student).get(studentId)
  return student.toJSON()
})
