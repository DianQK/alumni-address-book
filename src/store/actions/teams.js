import {
  UPDATE_TEAMS,
  CREATE_TEAM,
  UPDATE_MEMBERS
} from '../types'
import { createAction } from 'redux-actions'
import AV from '../../libs/av-weapp-min'
import TeamStudentMap from '../../models/teamStudentMap'
import Student from '../../models/student'
import Team from '../../models/team'
import { getUser } from '../../libs/getUser'

export const updateTeams = createAction(UPDATE_TEAMS, async () => {
  var user = await getUser()
  let student = AV.Object.createWithoutData('Student', user.get('studentId'))
  let teamStudentMaps = await new AV.Query(TeamStudentMap)
  .equalTo('student', student)
  .find()
  let rawTeams = teamStudentMaps.map(teamStudentMap => { return teamStudentMap.team })
  let teams = await AV.Object.fetchAll(rawTeams)
  return { teams }
})

export const createTeam = createAction(CREATE_TEAM, async ({ name, intro }) => {
  let user = await getUser()
  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(false)
  acl.setWriteAccess(user, true)
  let student = await new AV.Query(Student).get(user.get('studentId'))
  let team = await new Team({
    name: name,
    user: user,
    intro: intro
  })
  .setACL(acl).save()
  await new TeamStudentMap({
    team: team,
    student: student,
    master: true
  })
  .setACL(acl).save()
  return { team }
})

export const updateMembers = createAction(UPDATE_MEMBERS, async (teamId) => {
  let team = AV.Object.createWithoutData('Team', teamId)
  let teamStudentMaps = await new AV.Query(TeamStudentMap).equalTo('team', team).find()
  let rawMembers = teamStudentMaps.map(teamStudentMap => { return teamStudentMap.student })
  let members = await AV.Object.fetchAll(rawMembers)
  return { teamId, members }
})
