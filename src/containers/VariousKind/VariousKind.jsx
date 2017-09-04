import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'
import { getListByCategory1Id, getSearchResult } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'
import Filter from '../../components/Filter/Filter'
import NavTab from '../../components/NavTab/NavTab'
import ProductList from '../../components/ProductList/ProductList'
import Page from '../../components/Page/Page'
import NoResult from '../../components/NoResult/NoResult'
import ToTop from '../../components/ToTop/ToTop'

import './style.scss'
const limit = 60
class VariousKind extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      category_1: '',
      brands: [],
      kinds: [],
      prices: [],
      tabs: ['综合', '价格低到高', '价格高到低'],
      sorts: ['', 'price_asc', 'price_desc'],
      currentTabIndex: 0,
      products: [],
      size: 0,
      currentPageIndex: 0,
      selectedBrands: [],
      selectedKinds: [],
      selectedPrice: '',
      noResult: false
    }
  }
  render() {
    const { category_1, brands, kinds, prices, tabs, sorts, currentTabIndex, products, size, currentPageIndex, noResult } = this.state
    const pagesNum = Math.ceil(size / limit)
    return (
      <div className="m-variouskind">
        <div className="g-bd f-cb">
          <Bread currentText={category_1} />
          <div className="g-main">
            <Filter brands={brands}
              kinds={kinds}
              prices={prices}
              onFilterChange={this.onFilterChange.bind(this)}
            />
            <div className="m-productlist">
              <NavTab tabs={tabs}
                currentIndex={currentTabIndex}
                onTabChange={this.onTabChange.bind(this)}
              />
              {
                noResult ? (
                  <NoResult />
                ) : (
                    <ProductList products={products} />
                  )
              }

              {
                pagesNum > 1 ? (
                  <Page pagesNum={pagesNum}
                    crtIndex={currentPageIndex}
                    onPageChange={this.onPageChange.bind(this)}
                  />
                ) : ''
              }
            </div>
          </div>
        </div>
        <ToTop />
      </div>
    )
  }

  componentDidMount() {
    const category1Id = getUrlQuery('cid')
    const category_1 = getUrlQuery('title')
    this.setState({
      category_1
    })
    this._getListByCategory1Id(category1Id)
    this._getSearchResult({ category_1 })
  }

  onFilterChange({ selectedBrands, selectedKinds, selectedPrice }) {
    console.log(selectedBrands)
    console.log(selectedKinds)
    console.log(selectedPrice)
    this.setState({
      selectedBrands,
      selectedKinds,
      selectedPrice,
      size: 0,
      currentPageIndex: 0
    })
    this._reGetSR()
  }

  onTabChange(index) {
    this.setState({
      currentTabIndex: index
    })
    this._reGetSR()
  }

  onPageChange(index) {
    const { currentPageIndex } = this.state
    if (currentPageIndex === index) {
      return
    } else {
      window.scrollTo(0, 0)
      this.setState({
        currentPageIndex: index
      })
      this._reGetSR()
    }
  }


  _getListByCategory1Id(category1Id) {
    getListByCategory1Id(category1Id).then(res => {
      console.log(res)
      const data = res.data
      let brandsIndex = data.findIndex(item => { return item.title === "品牌" })
      const brands = data[brandsIndex].value
      let kindsIndex = data.findIndex(item => { return item.title === "分类" })
      const kinds = data[kindsIndex].value
      let pricesIndex = data.findIndex(item => { return item.title === "价格" })
      const prices = data[pricesIndex].value
      this.setState({
        brands,
        kinds,
        prices
      })
    })
  }

  _getSearchResult({ key, sort, category_1, category_2, brand, price_from, price_to, limit, offset }) {
    getSearchResult({ key, sort, category_1, category_2, brand, price_from, price_to, limit, offset }).then(res => {
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
    })
  }

  _reGetSR() {
    this.setState({
      noResult: false
    })
    setTimeout(() => {
      const { category_1, sorts, currentTabIndex, currentPageIndex, selectedBrands, selectedKinds, selectedPrice } = this.state
      const sort = sorts[currentTabIndex]
      const offset = limit * currentPageIndex
      const brand = selectedBrands.join()
      const category_2 = selectedKinds.join()
      const price_from = selectedPrice.split('~')[0]
      const price_to = selectedPrice.split('~')[1]
      getSearchResult({ sort, category_1, category_2, brand, price_from, price_to, limit, offset }).then(res => {
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
      })
    }, 20)
  }
}

export default VariousKind