import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
const effectText = {
  '1': '元',
  '2': '折'
}
class Coupon extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      showAll: false
    }
  }
  render() {
    const { coupons } = this.props
    const { showAll } = this.state
    const len = coupons.length
    return (
      <div className="m-coupons clearfix f-pr">
        <div className="title f-pr">促销：</div>
        <ul className={showAll ? "show-all" : ""}
          onMouseOver={this.showAll.bind(this)}
          onMouseOut={this.notShowAll.bind(this)}
        >
          {
            coupons.map((item, index) => {
              return (
                <li className={index === coupons.length - 1 ? "lst" : ""} key={item.couponId}>
                  <span className="label">{item.couponLabel}</span>
                  <span>{item.effectAction.effectValue}{effectText[item.effectAction.effectType]}&nbsp;&nbsp;{item.couponName},</span>
                  <span>无门槛</span>
                  <span className="f-fcLink f-hand">领券</span>
                  {
                    (index === 0 && len > 1) ? (
                      <a href="javascript:;" className="f-fr all" onClick={this.toggleShowAll.bind(this)}>
                        全部优惠券({len})
                        <i className={showAll ? "arr up" : "arr"}></i>
                      </a>
                    ) : ''
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  showAll() {
    this.setState({
      showAll: true
    })
  }

  notShowAll() {
    this.setState({
      showAll: false
    })
  }

  toggleShowAll() {
    let showAll = !this.state.showAll
    this.setState({
      showAll
    })
  }
}

Coupon.propTypes = {
  coupons: PropTypes.array
}

Coupon.defaultProps = {
  coupons: []
}

export default Coupon