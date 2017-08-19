import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'
import { getColumnProduct } from '../../api/api.js'
import ProductList from '../../components/ProductList/ProductList'

import './style.scss'
class Column extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      bannerSrc: '',
      products: []
    }
  }
  render() {
    const { bannerSrc, products } = this.state
    return (
      <div className="m-column">
        <div className="g-bd f-cb">
          <div className="g-main">
            {
              bannerSrc ? (
                <div className="m-banner f-pr">
                  <img src={bannerSrc} alt="banner" />
                </div>
              ) : ''
            }
            <ProductList products={products} />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const id = getUrlQuery('id')
    if (id) {
      getColumnProduct(id).then(res => {
        // console.log(res)
        const bannerSrc = res.data.webPic
        const products = res.data.products
        const name = res.data.name
        if (name) {
          document.title = name
        }
        this.setState({
          bannerSrc,
          products
        })
      })
    }
  }
}

export default Column