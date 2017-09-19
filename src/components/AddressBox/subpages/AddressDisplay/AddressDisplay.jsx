import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import BaseLayer from '../../../BaseLayer/BaseLayer'
import AddressForm from '../AddressForm/AddressForm'
import AddressChange from '../AddressChange/AddressChange'

import './style.scss'
class AddressDisplay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      addressList: [],
      curIndex: 0
    }
  }
  render() {
    const { addressList, curIndex } = this.state
    const curAddress = addressList[curIndex]
    return (
      <div className="m-address f-pr">
        <div className="bggray">
          <span>收货信息</span>
        </div>
        {
          curAddress ? (
            <div className="head">
              {
                curAddress.prop ? (
                  <span className="f-ib">
                    <i></i>
                    <em>默认地址</em>
                  </span>
                ) : ''
              }
              <a className="btn btn-b f-mgl20 f-ib f-fs12" onClick={this.clickHandleOnEdit.bind(this)}>修改</a>
            </div>
          ) : ''
        }
        {
          curAddress ? (
            <div className="msg">
              <span className="f-ib f-thide">
                <em style={{ letterSpacing: 6 }}>收货人:</em>
                {curAddress.name}
              </span>
              <span className="phone f-ib f-thide">
                <em>联系方式 : </em>
                {curAddress.cellphone}
              </span>
            </div>
          ) : ''
        }
        {
          curAddress ? (
            <div className="address">
              <p className="txt f-thide">
                <em>收货地址 : </em>
                {curAddress.provinceCity + curAddress.detailAddress}
              </p>
            </div>
          ) : ''
        }
        <div className="line f-pa"></div>
        <div className="modify f-pa">
          <a href="javascript:;" className="s-fcff f-blk"
            onClick={this.clickHandleOnChange.bind(this)}
          >更换收货地址</a>
          <a href="javascript:;" className="btn-b f-mgt5 f-blk">新建地址</a>
        </div>
        <BaseLayer ref={(layer) => { this.layerEdit = layer }} title="修改收货地址">
          <AddressForm address={curAddress}
            onSave={this.saveHandleOnAddrForm.bind(this)}
            onCancel={this.cancelHandleOnAddrForm.bind(this)} />
        </BaseLayer>
        <BaseLayer ref={(layer) => { this.layerChange = layer }} title="更换收货地址">
          <AddressChange addressList={addressList}
            onCancel={this.cancelHandleOnAddrChange.bind(this)}
            onConfirm={this.confirmHandleOnAddrChange.bind(this)}
          />
        </BaseLayer>
      </div>
    )
  }

  componentDidMount() {
    const { addressList } = this.props
    const curIndex = addressList.findIndex(item => {
      return item.prop === 1
    })
    this.setState({
      addressList,
      curIndex
    })
  }

  componentWillReceiveProps(nextProps) {
    const { addressList } = nextProps
    const curIndex = addressList.findIndex(item => {
      return item.prop === 1
    })
    this.setState({
      addressList,
      curIndex
    })
  }

  clickHandleOnEdit() {
    this.layerEdit.show()
  }

  clickHandleOnChange() {
    this.layerChange.show()
  }

  cancelHandleOnAddrForm() {
    this.layerEdit.hide()
  }

  cancelHandleOnAddrChange() {
    this.layerChange.hide()
  }

  saveHandleOnAddrForm() {
    this.layerEdit.hide()
    this.props.onSave && this.props.onSave()
  }

  confirmHandleOnAddrChange(selectIndex) {
    this.layerChange.hide()
    this.setState({
      curIndex: selectIndex
    })
  }
}

AddressDisplay.propTypes = {
  addressList: PropTypes.array,
  onSave: PropTypes.func
}

AddressDisplay.defaultProps = {
  addressList: []
}

export default AddressDisplay