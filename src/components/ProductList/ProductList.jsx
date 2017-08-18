import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './style.scss'

class ProductList extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const { products } = this.props
    return (
      <div className="m-product">
        <ul className="list clearfix">
          {
            products.map((item, index) => {
              return (
                <li key={item.id} className={(index + 1) % 4 === 0 ? "nopad" : ""}>
                  <Link to={'/detail/' + item.productId} className="cover f-pr">
                    <img src={item.products.coverUrl} alt={item.name} />
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
                      {' ' + item.name}
                    </h3>
                    <p className="txt f-thide">￥<em>{item.products.minPrice}</em></p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

ProductList.propTypes = {
  products: PropTypes.array
}

ProductList.defaultProps = {
  products: []
}

export default ProductList