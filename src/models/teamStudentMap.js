import AV from '../libs/av-weapp-min'

export default class TeamStudentMap extends AV.Object {

  get objectId() { return this.id ? this.id : this.get('objectId') }

  get team() { return this.get('team') }
  set team(value) { this.set('team', value) }

  get student() { return this.get('student') }
  set student(value) { this.set('student', value) }

  get master() { return this.get('master') }
  set master(value) { this.set('master', value) }

}

AV.Object.register(TeamStudentMap)
