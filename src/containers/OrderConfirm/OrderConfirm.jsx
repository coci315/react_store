import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AddressBox from '../../components/AddressBox/AddressBox'

import './style.scss'
class Confirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="m-orderconfirm">
        <div className="g-bd f-cb">
          <div className="m-bread">
            <div className="block">
              <span>订单确认</span>
            </div>
          </div>
          <div className="g-main">
            <div className="n-order">
              <AddressBox />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirm