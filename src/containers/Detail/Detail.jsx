import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getProductDetail, getHotProduct } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'
import Loading from '../../components/Loading/Loading'
import ImgDisplay from './subpages/ImgDisplay/ImgDisplay'
import Count from '../../components/Count/Count'
import ProductDetail from './subpages/ProductDetail/ProductDetail'

import './style.scss'
class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      currentText: '',
      showLoading: true,
      product: null,
      picUrls: [],
      skus: [],
      currentSkuIndex: 0,
      coupons: [],
      descr: []
    }
  }
  render() {
    const { currentText, showLoading, product, picUrls, skus, currentSkuIndex, coupons, descr } = this.state
    const attrs = this._getAttrs(skus)
    return (
      <div className="m-detail">
        <div className="g-bd f-cb">
          <Bread currentText={currentText} />
          <div className="g-main">
            <div className="n-detail">
              <Loading showFlag={showLoading} />
              {
                product ? (
                  <div className="wrap clearfix">
                    <div className="n-display f-fl">
                      <ImgDisplay picUrls={picUrls} />
                    </div>
                    <div className="n-info f-fr">
                      <div className="basic f-pr">
                        <h2 className="f-ff2">{product.name}</h2>
                        {
                          product.suggestWord ? (
                            <p className="sellpoint">{product.suggestWord}</p>
                          ) : ''
                        }
                        <p className="price">
                          <span className="rmb">￥</span>
                          <em>{product.discount ? skus[currentSkuIndex].spePrice : skus[currentSkuIndex].price}</em>
                          {
                            product.discount ? (
                              <sub className="dis">￥{skus[currentSkuIndex].price}</sub>
                            ) : ''
                          }
                        </p>
                        {
                          coupons.length ? (
                            <div className="m-coupons clearfix f-pr">
                              <div className="title f-pr">促销：</div>
                              <ul>
                                {
                                  coupons.map((item, index) => {
                                    return (
                                      <li className={index === coupons.length - 1 ? "lst" : ""} key={item.couponId}>
                                        <span className="label">{item.couponLabel}</span>
                                        <span>{item.effectAction.effectValue}折&nbsp;&nbsp;{item.couponName},</span>
                                        <span>无门槛</span>
                                        <span className="f-fcLink f-hand">领券</span>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </div>
                          ) : ''
                        }
                        {
                          attrs.length ? (
                            <div>
                              {
                                attrs.map((attr, index) => {
                                  return (
                                    <div className="select clearfix" key={attr.attrId}>
                                      <div className="title f-pr">
                                        {attr.attr}：
                                      </div>
                                      <ul className="clearfix">
                                        {
                                          attr.values.map((value, index) => {
                                            return (
                                              <li key={value.attrValueId}>
                                                <p className="f-ff2">{value.attrValue}</p>
                                              </li>
                                            )
                                          })
                                        }
                                      </ul>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          ) : ''
                        }
                        <Count />
                      </div>
                      <div className="m-services f-pr">
                        <p>服务：</p>
                        <div className="cnt">
                          <a className="server">7天无理由退货</a>
                          <a className="server">15天无忧换货</a>
                          <a className="server">满119包邮</a>
                          <a className="server">顺丰发货</a>
                          <a className="server">云音乐自营</a>
                        </div>
                      </div>
                      {
                        product.status === -1 ? (
                          <p className="buyorjoin clearfix">
                            <a href="javascript:;" className="u-btn u-btn-gray">已下架</a>
                          </p>
                        ) : (
                            <p className="buyorjoin clearfix">
                              <a href="javascript:;" className="f-fl u-btn u-btn-white f-mgr10">立即购买</a>
                              <a href="javascript:;" className="f-fl u-btn u-btn-red u-btn-red-1">
                                <i className="u-icn u-icn-7"></i>
                                加入购物车
                              </a>
                            </p>
                          )
                      }
                    </div>
                  </div>
                ) : ''
              }
              {
                product ? (
                  <div className="n-content">
                    <div className="n-content-left clearfix">
                      <ProductDetail descr={descr} />
                    </div>
                    <div className="n-hotrecommend">

                    </div>
                  </div>
                ) : ''
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this._getProductDetail()
    this._getHotProduct()
  }

  showLoading() {
    this.setState({
      showLoading: true
    })
  }

  hideLoading() {
    this.setState({
      showLoading: false
    })
  }

  _getProductDetail() {
    this.showLoading()
    const id = this.props.params.id
    getProductDetail(id).then(res => {
      console.log(res)
      const product = res.product
      const skus = res.product.skus
      console.log(this._getAttrs(skus))
      const picUrls = res.product.picUrls
      const currentText = res.product.name
      const coupons = res.coupons
      const descr = res.product.descr
      this.setState({
        currentText,
        product,
        picUrls,
        skus,
        coupons,
        descr
      })
      this.hideLoading()
    })
  }

  _getHotProduct() {
    getHotProduct().then(res => {
      console.log(res)
    })
  }

  _getAttrs(skus) {
    const attrs = []
    skus.forEach(sku => {
      sku.attrs.forEach(attr => {
        const index = attrs.findIndex((item) => {
          return item.attrId === attr.attrId
        })
        if (index > -1) {
          const valueIndex = attrs[index].values.findIndex((item) => {
            return item.attrValueId === attr.attrValueId
          })
          if (valueIndex < 0) {
            attrs[index].values.push({
              attrValueId: attr.attrValueId,
              attrValue: attr.attrValue
            })
          }
        } else {
          attrs.push({
            attrId: attr.attrId,
            attr: attr.attr,
            values: [
              {
                attrValueId: attr.attrValueId,
                attrValue: attr.attrValue
              }
            ]
          })
        }
      })
    })
    attrs.forEach(attr => {
      attr.values.sort((a, b) => {
        return a.attrValueId - b.attrValueId
      })
    })
    attrs.sort((a, b) => {
      return a.attrId - b.attrId
    })
    return attrs
  }
}

export default Detail