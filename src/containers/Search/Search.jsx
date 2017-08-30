import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'
import { formatHotProduct } from '../../common/js/product.js'
import { getSearchResult, getHotProduct } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'
import NavTab from '../../components/NavTab/NavTab'
import ProductList from '../../components/ProductList/ProductList'
import Page from '../../components/Page/Page'
import NoResult from '../../components/NoResult/NoResult'

import './style.scss'
const sorts = ['', 'price_asc', 'price_desc']
const limit = 60
class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      key: '',
      tabs: ['综合', '价格低到高', '价格高到低'],
      currentTabIndex: 0,
      currentPageIndex: 0,
      products: [],
      hotProducts: [],
      size: 0,
      noResult: false
    }
  }
  render() {
    const { key, tabs, products, hotProducts, currentTabIndex, currentPageIndex, size, noResult } = this.state
    const pagesNum = Math.ceil(size / limit)
    return (
      <div className="m-search">
        <div className="g-bd f-cb">
          <Bread currentText={key} />
          <div className="g-main">
            <div className="m-searchlist">
              {
                noResult ? (
                  ''
                ) : (
                    <NavTab tabs={tabs} currentIndex={currentTabIndex} onTabChange={this.onTabChange.bind(this)} />
                  )
              }
              {
                noResult ? (
                  <NoResult />
                ) : (
                    <ProductList products={products} />
                  )
              }
              {
                pagesNum > 1 ? (
                  <Page pagesNum={pagesNum} crtIndex={currentPageIndex} onPageChange={this.onPageChange.bind(this)} />
                ) : ''
              }
            </div>
            {
              hotProducts.length ? (
                <div className="m-recommendlist">
                  <div className="recommend-list">
                    <div className="mid-border">
                      <span>热门推荐</span>
                    </div>
                    <ProductList products={hotProducts} />
                  </div>
                </div>
              ) : ''
            }
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const key = getUrlQuery('q')
    this.setState({
      key
    })
    this._getSearchResult(key)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({
      products: [],
      hotProducts: [],
      currentTabIndex: 0,
      currentPageIndex: 0,
      size: 0,
      noResult: false
    })
    const key = getUrlQuery('q')
    this.setState({
      key
    })
    this._getSearchResult(key)
  }

  onTabChange(index) {
    const { key, currentPageIndex } = this.state
    this.setState({
      currentTabIndex: index
    })
    const offset = limit * currentPageIndex
    this._getSearchResult(key, sorts[index], limit, offset)
  }

  onPageChange(index) {
    const { key, currentTabIndex, currentPageIndex } = this.state
    if (currentPageIndex === index) {
      return
    } else {
      window.scrollTo(0, 0)
      const offset = limit * index
      this.setState({
        currentPageIndex: index
      })
      this._getSearchResult(key, sorts[currentTabIndex], limit, offset)
    }

  }

  _getSearchResult(key, sort, limit = 60, offset = 0) {
    getSearchResult({ key, sort, limit, offset }).then(res => {
      console.log(res)
      const { products, size, all } = res
      this.setState({
        products,
        size
      })
      if (all === 0) {
        this.setState({
          noResult: true
        })
      }
      if (size <= 4) {
        this._getHotProduct()
      }
    })
  }

  _getHotProduct() {
    getHotProduct().then(res => {
      let hotProducts = res.data
      hotProducts = formatHotProduct(hotProducts)
      this.setState({
        hotProducts
      })
    })
  }
}

export default Search