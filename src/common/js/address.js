import { getAddressId } from './util'
export class Address {
  constructor(name, cellphone, detailAddress, prop, provinceCity) {
    this.name = name
    this.cellphone = cellphone
    this.detailAddress = detailAddress
    this.prop = prop
    this.provinceCity = provinceCity
    this.id = getAddressId()
  }
}