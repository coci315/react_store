import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import Select from '../../components/Select/Select'
import { getAddressLevel, getNextAddress } from '../../api/api.js'

import './style.scss'
class AddressBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      dataLevelOne: [],
      indexDataLevelOne: 0,
      dataCity: [],
      indexDataCity: 0,
      dataDistrict: [],
      indexDataDistrict: 0
    }
  }
  render() {
    const { dataLevelOne, dataCity, dataDistrict, indexDataLevelOne, indexDataCity, indexDataDistrict } = this.state
    return (
      <div className="m-address-box">
        <div className="m-address-front">
          <div className="u-addr-empty">
            <div className="bggray s-fc999">
              <span>收货地址</span>
            </div>
            <form className="addressform f-pr">
              <div className="ztr name">
                <span className="th f-ib" style={{ letterSpacing: 4 }}>收货人:</span>
                <input type="text" name="name" className="u-txt" placeholder="为了提高发货速度，请填写您的真实姓名" />
              </div>
              <div className="ztr phone f-pa">
                <span className="th f-ib">手机号码:</span>
                <input type="text" name="cellphone" className="u-txt" />
              </div>
              <div className="ztr address indexh">
                <div>
                  <span className="th f-ib">收货地区:</span>
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
            </form>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._getAddressLevel(1)
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
}

AddressBox.propTypes = {
  currentText: PropTypes.string,
  indexText: PropTypes.string,
  indexLink: PropTypes.string
}

AddressBox.defaultProps = {
  currentText: '',
  indexText: '首页',
  indexLink: '/'
}

export default AddressBox