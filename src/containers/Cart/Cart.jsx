import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { formatHotProduct } from '../../common/js/product.js'
import { getCart, getHotProduct } from '../../api/api.js'
import ShopCart from '../../components/ShopCart/ShopCart'
import ProductList from '../../components/ProductList/ProductList'
import ToTop from '../../components/ToTop/ToTop'

import './style.scss'
class Cart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      products: [],
      selectNum: 0,
      freeFreightMoney: 0,
      itemDatas: [],
      invalidItemDatas: []
    }
  }
  render() {
    const { products, selectNum, freeFreightMoney, itemDatas, invalidItemDatas } = this.state
    return (
      <div className="m-cart">
        <div className="g-bd f-cb">
          <div className="m-bread">
            <div className="block">
              <span>购物车</span>
            </div>
          </div>
          {
            itemDatas.length ? (
              <ShopCart selectNum={selectNum}
                freeFreightMoney={freeFreightMoney}
                itemDatas={itemDatas}
                invalidItemDatas={invalidItemDatas}
              />
            ) : ''
          }
          <div className="mid-border">
            <span className="mid-txt2">热门推荐</span>
          </div>
          <ProductList products={products} />
        </div>
        <ToTop noCart />
      </div>
    )
  }

  componentDidMount() {
    this._getCart()
    this._getHotProduct()
  }

  _getCart() {
    getCart().then(res => {
      console.log(res)
      const { selectNum, freeFreightMoney, itemDatas, invalidItemDatas } = res.result
      this.setState({
        selectNum,
        freeFreightMoney,
        itemDatas,
        invalidItemDatas
      })
    })
  }

  _getHotProduct() {
    getHotProduct().then(res => {
      const products = formatHotProduct(res.data)
      this.setState({
        products
      })
    })
  }
}

export default Cart