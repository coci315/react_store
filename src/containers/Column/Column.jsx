import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'
import { getColumnProduct } from '../../api/api.js'
import ProductList from '../../components/ProductList/ProductList'
import ToTop from '../../components/ToTop/ToTop'
import Bread from '../../components/Bread/Bread'

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
    const id = getUrlQuery('id')
    const fmoney = getUrlQuery('fmoney')
    const emoney = getUrlQuery('emoney')
    return (
      <div className="m-column">
        <div className="g-bd f-cb">
          <div className="g-main">
            {
              id === '27001' ? (
                <Bread indexLink="/cart" indexText="购物车" currentText="活动凑单">
                  <span className="f-fr right">
                    <span className="f-fl icon">
                      <i className="f-pr"></i>
                    </span>
                    <span className="f-fl f-fs14">
                      全场满
                      <em className="s-fcTheme">￥{fmoney}</em>
                      免运费
                      {emoney ? (' ( 还差￥' + emoney + ' )') : ''}
                    </span>
                  </span>
                </Bread>
              ) : ''
            }
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
        <ToTop />
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