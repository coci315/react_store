import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class ProductDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    const { descr } = this.props
    return (
      <div className="product-detail">
        <h2>商品详情</h2>
        <div className="n-describe">
          {
            descr.map((item, index) => {
              if (item.type === 1) {
                return (
                  <p dangerouslySetInnerHTML={{ __html: item.resource }} key={index}></p>
                )
              } else if (item.type === 2) {
                return (
                  <img src={item.resource} alt="" key={index} />
                )
              }
            })
          }
        </div>
      </div>
    )
  }
}

ProductDetail.propTypes = {
  descr: PropTypes.array
}

ProductDetail.defaultProps = {
  descr: []
}

export default ProductDetail