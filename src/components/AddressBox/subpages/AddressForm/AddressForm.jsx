import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import Select from '../../../../components/Select/Select'
import { getAddressLevel, getNextAddress, saveAddress, cacheAddress, lookupAddress } from '../../../../api/api.js'
import { loadAddress, addAddress, editAddress } from '../../../../common/js/cache.js'
import { Address } from '../../../../common/js/address.js'

import './style.scss'
class AddressForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      dataLevelOne: [],
      indexDataLevelOne: 0,
      dataCity: [],
      indexDataCity: 0,
      dataDistrict: [],
      indexDataDistrict: 0,
      name: '',
      cellphone: '',
      detailAddress: '',
      showNameErr: false,
      nameErrText: '',
      showPhoneErr: false,
      phoneErrText: '',
      showAddressErr: false,
      addressErrText: '',
      isSetDefault: false
    }
  }
  render() {
    const { address } = this.props
    const { dataLevelOne, dataCity, dataDistrict, indexDataLevelOne, indexDataCity, indexDataDistrict, name, cellphone, detailAddress, showNameErr, showPhoneErr, showAddressErr, nameErrText, phoneErrText, addressErrText, isSetDefault } = this.state
    return (
      <form className="m-addressform">
        <div className="ztr name">
          <span className="th f-ib">收 货 人</span>
          <input type="text"
            name="name"
            className={showNameErr ? "u-txt u-txt-err" : "u-txt"}
            placeholder="为了提高发货速度，请填写您的真实姓名"
            value={name}
            onChange={this.changeHandleOnName.bind(this)}
          />
          {
            showNameErr ? (
              <div className="err">
                <i className="f-ib"></i>
                {nameErrText}
              </div>
            ) : ''
          }
        </div>
        <div className="ztr phone">
          <span className="th f-ib">手机号码</span>
          <input type="text"
            name="cellphone"
            className={showPhoneErr ? "u-txt u-txt-err" : "u-txt"}
            value={cellphone}
            onChange={this.changeHandleOnCellPhone.bind(this)}
          />
          {
            showPhoneErr ? (
              <div className="err">
                <i className="f-ib"></i>
                {phoneErrText}
              </div>
            ) : ''
          }
        </div>
        <div className="ztr addr indexh">
          <div>
            <span className="th f-ib">收货地区</span>
            <Select data={dataLevelOne}
              curIndex={indexDataLevelOne}
              onSelect={this.onSelectDataLevelOne.bind(this)} />
            <Select data={dataCity}
              curIndex={indexDataCity}
              onSelect={this.onSelectDataCity.bind(this)} />
            <Select data={dataDistrict}
              curIndex={indexDataDistrict}
              onSelect={this.onSelectDataDistrict.bind(this)} />
          </div>
        </div>
        <div className="ztr detail">
          <span className="th f-ib">详细地址</span>
          <textarea name="detailAddress"
            placeholder="无需重复填写省市区，小于120字"
            cols="30"
            rows="10"
            className="u-txt area"
            autoComplete="false"
            value={detailAddress}
            onChange={this.changeHandleOnDetailAddress.bind(this)}
          ></textarea>
          {
            showAddressErr ? (
              <div className="err">
                <i className="f-ib"></i>
                {addressErrText}
              </div>
            ) : ''
          }
          {
            (address && address.prop) ? '' : (
              <div className="setdefault">
                <label>
                  <i className={isSetDefault ? "u-icn u-icn-checked" : "u-icn u-icn-nochecked"}
                    onClick={this.toggleDefault.bind(this)}
                  ></i>
                  <span>设为默认地址</span>
                </label>
              </div>
            )
          }
        </div>
        <div className="pdh">
          <a href="javascript:;"
            className="u-btn-new u-btn-new160"
            onClick={this.clickHandleOnSaveBtn.bind(this)}
          >保存新地址</a>
          <a href="javascript:;" className="u-btn-hide"
            onClick={this.clickHandleOnCancelBtn.bind(this)}
          >取消</a>
        </div>
      </form>
    )
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      const { address } = this.props
      if (address) {
        console.log(address)
        const { cellphone, detailAddress, name, addressId } = address
        this.setState({
          name,
          cellphone,
          detailAddress
        })
        this._lookupAddress(addressId)
      } else {
        this._getAddressLevel(1)
      }
    }, 20)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  onSelectDataLevelOne(index) {
    this.setState({
      indexDataLevelOne: index
    })
    const { dataLevelOne } = this.state
    this._getCity(dataLevelOne[index].id)
  }

  onSelectDataCity(index) {
    this.setState({
      indexDataCity: index
    })
    const { dataCity } = this.state
    this._getDistrict(dataCity[index].id)
  }

  onSelectDataDistrict(index) {
    this.setState({
      indexDataDistrict: index
    })
  }

  changeHandleOnName(e) {
    this.setState({
      name: e.target.value
    })
  }

  changeHandleOnCellPhone(e) {
    this.setState({
      cellphone: e.target.value
    })
  }

  changeHandleOnDetailAddress(e) {
    this.setState({
      detailAddress: e.target.value
    })
  }

  clickHandleOnSaveBtn() {
    const isNameValid = this._checkName()
    const isPhoneValid = this._checkPhone()
    const isAddressValid = this._checkAddress()
    if (isNameValid && isPhoneValid && isAddressValid) {
      console.log('ok')
      this._editAddress()
      this.props.onSave && this.props.onSave()
    } else {
      console.log('not ok')
    }
  }

  clickHandleOnCancelBtn() {
    this.props.onCancel && this.props.onCancel()
  }

  toggleDefault() {
    const { isSetDefault } = this.state
    this.setState({
      isSetDefault: !isSetDefault
    })
  }

  _lookupAddress(addressId) {
    lookupAddress(addressId).then(res => {
      console.log(res)
      const dataLevelOne = res.data[1]
      const dataCity = res.data[2]
      const dataDistrict = res.data[3]
      this.setState({
        dataLevelOne,
        dataCity,
        dataDistrict
      })
    })
  }

  _getAddressLevel(level) {
    getAddressLevel(level).then(res => {
      console.log(res)
      const dataLevelOne = res.data
      this.setState({
        dataLevelOne
      })

      this._getCity(dataLevelOne[0].id)

    })
  }

  _getCity(id) {
    getNextAddress(id).then(res => {
      console.log(res)
      const dataCity = res.data
      this.setState({
        dataCity,
        indexDataCity: 0
      })

      this._getDistrict(dataCity[0].id)

    })
  }

  _getDistrict(id) {
    getNextAddress(id).then(res => {
      console.log(res)
      const dataDistrict = res.data
      this.setState({
        dataDistrict,
        indexDataDistrict: 0
      })
    })
  }

  _checkName() {
    const { name } = this.state
    if (!name) {
      this.setState({
        showNameErr: true,
        nameErrText: '请输入收货人姓名'
      })
      return false
    } else if (name.length < 2 || name.length > 25) {
      this.setState({
        showNameErr: true,
        nameErrText: '姓名应该为2~25个字符'
      })
      return false
    } else {
      this.setState({
        showNameErr: false,
        nameErrText: ''
      })
      return true
    }
  }

  _checkPhone() {
    const { cellphone } = this.state
    if (!cellphone) {
      this.setState({
        showPhoneErr: true,
        phoneErrText: '请输入手机号'
      })
      return false
    } else if (!/^\d{11}$/.test(cellphone)) {
      this.setState({
        showPhoneErr: true,
        phoneErrText: '手机号应该为11位数字'
      })
      return false
    } else {
      this.setState({
        showPhoneErr: false,
        phoneErrText: ''
      })
      return true
    }
  }

  _checkAddress() {
    const { detailAddress } = this.state
    if (!detailAddress) {
      this.setState({
        showAddressErr: true,
        addressErrText: '请输入地址'
      })
      return false
    } else if (detailAddress.length < 5) {
      this.setState({
        showAddressErr: true,
        addressErrText: '地址不能少于5个字符'
      })
      return false
    } else {
      this.setState({
        showAddressErr: false,
        addressErrText: ''
      })
      return true
    }
  }

  // _saveAddress() {
  //   const { name, cellphone, detailAddress, dataDistrict, indexDataDistrict } = this.state
  //   saveAddress(name, cellphone, detailAddress, dataDistrict[indexDataDistrict].id).then(res => {
  //     console.log(res)
  //     const { id } = res
  //     cacheAddress(id).then(res => {
  //       console.log(res)
  //     })
  //   })
  // }

  _editAddress() {
    const { address } = this.props
    const { name, cellphone, detailAddress, dataLevelOne, indexDataLevelOne, dataCity, indexDataCity, dataDistrict, indexDataDistrict, isSetDefault } = this.state
    const provinceCity = dataLevelOne[indexDataLevelOne].locationName + dataCity[indexDataCity].locationName + dataDistrict[indexDataDistrict].locationName
    const addressId = dataDistrict[indexDataDistrict].id
    const prop = +isSetDefault
    const newAddr = { name, cellphone, detailAddress, provinceCity, addressId }
    if (!address.prop) {
      newAddr.prop = prop
    }
    const newAddress = Object.assign(address, newAddr)
    editAddress(newAddress)
  }
}



AddressForm.propTypes = {
  address: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func
}

AddressForm.defaultProps = {
  address: null
}

export default AddressForm