import AV from '../libs/av-weapp-min'

export default class Student extends AV.Object {

  get objectId() { return this.id ? this.id : this.get('objectId') }

  get name() { return this.get('name') }
  set name(value) { this.set('name', value) }

  get avatarUrl() { return this.get('avatarUrl') }
  set avatarUrl(value) { this.set('avatarUrl', value) }

  get mobilePhoneNumber() { this.get('mobilePhoneNumber') }
  set mobilePhoneNumber(value) { this.set('mobilePhoneNumber', value) }

  get currentStatus() { this.get('currentStatus') }
  set currentStatus(value) { this.set('currentStatus', value) }

}

AV.Object.register(Student)
