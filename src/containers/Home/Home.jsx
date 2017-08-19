import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getBanner, getHotCommonProduct } from '../../api/api.js'
import Carousel from '../../components/Carousel/Carousel'
import HomeTab from './subpages/HomeTab/HomeTab'
import SubTab from './subpages/SubTab/SubTab'
import ProductList from '../../components/ProductList/ProductList'
import { Link } from 'react-router'

import './style.scss'
class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      imgsData: [],
      hotProduct: [],
      allProduct: []
    }
  }
  render() {
    const { imgsData, hotProduct, allProduct } = this.state
    return (
      <div className="m-home">
        <Carousel imgsData={imgsData} />
        <div className="g-tab">
          <HomeTab />
        </div>
        <div className="g-bd f-cb">
          <div className="g-main">
            <SubTab />
            <div className="m-block">
              <span className="mid-txt mid-bold">编辑推荐</span>
              <div className="recmd-list">
                <ProductList products={hotProduct} />
              </div>
            </div>
            <div className="digalb f-pr f-mgt10">
              <Link to="/dgalbum">
                <div className="cnt">
                  <div className="inner">
                    <span>
                      <i></i>
                      数字专辑
                    </span>
                    <p className="f-thide">陈奕迅全新EP火热售卖中</p>
                    <div>立 即 购 买 ></div>
                  </div>
                </div>
                <div className="covers f-pa">
                  <img className="sml" src="http://p1.music.126.net/DyfTLBEV_QGhT8Nio7JwtA==/19061133579395356.jpg?param=120y120" />
                  <img className="big" src="http://p1.music.126.net/uSu6GaljUsHWgklti8FTqg==/19215065207286133.jpg?param=120y120" />
                  <i className="circle"></i>
                </div>
              </Link>
            </div>
            <div className="m-block">
              <span className="mid-txt mid-bold">热门商品</span>
              <div className="hot-list">
                <ProductList products={allProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this._getBanner()
    this._getHotCommonProduct()
  }

  _getBanner() {
    getBanner().then(res => {
      const imgsData = res.banners
      this.setState({
        imgsData
      })
    })
  }

  _getHotCommonProduct() {
    getHotCommonProduct().then(res => {
      // console.log(res)
      let { hotProduct, allProduct } = res.data
      hotProduct = this._formatHotProduct(hotProduct)
      allProduct = this._formatAllProduct(allProduct)
      this.setState({
        hotProduct,
        allProduct
      })
    })
  }

  _formatHotProduct(hotProduct) {
    return hotProduct.map(item => {
      const { name, id, coverUrl, minPrice, originalCost, tags, vipMinPrice } = item.products
      return {
        name,
        id,
        coverUrl,
        minPrice,
        originalCost,
        tags,
        vipMinPrice
      }
    })
  }

  _formatAllProduct(allProduct) {
    return allProduct.map(item => {
      const { name, id, coverUrl, minPrice, originalCost, tags, vipMinPrice } = item
      return {
        name,
        id,
        coverUrl,
        minPrice,
        originalCost,
        tags,
        vipMinPrice
      }
    })
  }
}

export default Home