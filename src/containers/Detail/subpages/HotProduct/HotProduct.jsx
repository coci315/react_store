import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './style.scss'
class HotProduct extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    const { hotProduct } = this.props
    return (
      <div className="hot-product">
        <h2 className="f-ff2">热门商品</h2>
        <div className="product-wrap">
          <ul className="list clearfix">
            {
              hotProduct.map((item, index) => {
                return (
                  <li key={item.productId}>
                    <div>
                      <Link className="cover f-pr" to={'/detail/' + item.productId}>
                        <img src={item.products.coverUrl + '?param244y244'} alt="" />
                        {
                          item.products.tags.indexOf('特价') > -1 ? (
                            <span className="spec f-pa">
                              <span className="origin f-pa">￥{item.products.minPrice}</span>
                              <span className="cut f-pa"><del>￥{item.products.originalCost}</del></span>
                            </span>
                          ) : ''
                        }
                      </Link>
                      <div className="cnt f-tc">
                        <h3 className="f-thide2">
                          {
                            item.products.tags.map(tag => {
                              return (
                                <span className="tag tag-red" key={tag}><em>{tag}</em></span>
                              )
                            })
                          }
                          {' ' + item.products.name}
                        </h3>
                        <p className="txt f-thide">
                          ￥<em>{item.products.minPrice}</em>
                          {item.products.vipMinPrice !== undefined ? <em className="vip">(豪华会员￥{item.products.vipMinPrice})</em> : ''}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

HotProduct.propTypes = {
  hotProduct: PropTypes.array
}

HotProduct.defaultProps = {
  hotProduct: []
}

export default HotProduct