import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getBanner, getHotCommonProduct } from '../../api/api.js'
import Carousel from '../../components/Carousel/Carousel'
import HomeTab from './subpages/HomeTab/HomeTab'
import SubTab from './subpages/SubTab/SubTab'
import ProductList from '../../components/ProductList/ProductList'

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
      console.log(res)
      const { hotProduct, allProduct } = res.data
      this.setState({
        hotProduct,
        allProduct
      })
    })
  }
}

export default Home