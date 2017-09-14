import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import BaseLayer from '../../../BaseLayer/BaseLayer'
import AddressForm from '../AddressForm/AddressForm'

import './style.scss'
class AddressDisplay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      addressList: []
    }
  }
  render() {
    const { addressList } = this.state
    const defaultAddress = addressList.filter(item => {
      return item.prop === 1
    })[0]
    console.log(defaultAddress)
    return (
      <div className="m-address f-pr">
        <div className="bggray">
          <span>收货信息</span>
        </div>
        {
          defaultAddress ? (
            <div className="head">
              {
                defaultAddress.prop ? (
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
          defaultAddress ? (
            <div className="msg">
              <span className="f-ib f-thide">
                <em style={{ letterSpacing: 6 }}>收货人:</em>
                {defaultAddress.name}
              </span>
              <span className="phone f-ib f-thide">
                <em>联系方式 : </em>
                {defaultAddress.cellphone}
              </span>
            </div>
          ) : ''
        }
        {
          defaultAddress ? (
            <div className="address">
              <p className="txt f-thide">
                <em>收货地址 : </em>
                {defaultAddress.provinceCity + defaultAddress.detailAddress}
              </p>
            </div>
          ) : ''
        }
        <div className="line f-pa"></div>
        <div className="modify f-pa">
          <a href="javascript:;" className="s-fcff f-blk">更换收货地址</a>
          <a href="javascript:;" className="btn-b f-mgt5 f-blk">新建地址</a>
        </div>
        <BaseLayer ref={(layer) => { this.layerEdit = layer }} title="修改收货地址">
          <AddressForm />
        </BaseLayer>
      </div>
    )
  }

  componentDidMount() {
    const { addressList } = this.props
    this.setState({
      addressList
    })
  }

  componentWillReceiveProps(nextProps) {
    const { addressList } = nextProps
    this.setState({
      addressList
    })
  }

  clickHandleOnEdit() {
    this.layerEdit.show()
  }
}

AddressDisplay.propTypes = {
  addressList: PropTypes.array
}

AddressDisplay.defaultProps = {
  addressList: []
}

export default AddressDisplay