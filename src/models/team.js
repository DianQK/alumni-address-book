import AV from '../libs/av-weapp-min'

export default class Team extends AV.Object {

  get objectId() { return this.id ? this.id : this.get('objectId') }

  get name() { return this.get('name') }
  set name(value) { this.set('name', value) }

  get intro() { return this.get('intro') }
  set intro(value) { this.set('intro', value) }

}

AV.Object.register(Team)
