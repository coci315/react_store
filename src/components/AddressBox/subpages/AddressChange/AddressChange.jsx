import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'


import './style.scss'
class AddressChange extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      selectIndex: -1
    }
  }
  render() {
    const { addressList } = this.props
    const { selectIndex } = this.state
    return (
      <div className="m-addresschange">
        <div className="g-addrbox">
          {
            addressList.map((item, index) => {
              return (
                <li key={item.id}
                  className={selectIndex === index ? "z-sel" : ""}
                  onClick={this.setSelectIndex.bind(this, index)}
                >
                  <div className="m-ite">
                    <div className="f-pr">
                      <div className="mes">
                        <div className="itm name">
                          <span className="des f-fl">收 货 人&nbsp; :</span>
                          <em className="f-fl f-thide">{item.name}</em>
                        </div>
                        <div className="itm phone">
                          <span className="des f-fl">联系方式 :</span>
                          <em className="f-fl f-thide">{item.cellphone}</em>
                        </div>
                        <div className="itm detailaddr">
                          <span className="des f-fl">收货地址 :</span>
                          <em className="f-fl f-thide">{item.provinceCity + item.detailAddress}</em>
                        </div>
                      </div>
                      {
                        item.prop ? (
                          <div className="default f-pa">默认地址</div>
                        ) : ''
                      }
                    </div>
                  </div>
                </li>
              )
            })
          }
        </div>
        <div className="g-addr-btns f-tc">
          <a className="u-btn-new u-btn-new2"
            onClick={this.clickHandleOnConfirmBtn.bind(this)}
          >确定</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a className="u-btn-new u-btn-new3"
            onClick={this.clickHandleOnCancelBtn.bind(this)}
          >取消</a>
        </div>
      </div>
    )
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }


  setSelectIndex(index) {
    this.setState({
      selectIndex: index
    })
  }

  clickHandleOnConfirmBtn() {
    const { selectIndex } = this.state
    if (selectIndex > -1) {
      this.props.onConfirm && this.props.onConfirm(selectIndex)
    }
  }

  clickHandleOnCancelBtn() {
    this.props.onCancel && this.props.onCancel()
  }
}



AddressChange.propTypes = {
  addressList: PropTypes.array,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

AddressChange.defaultProps = {
  addressList: []
}

export default AddressChange