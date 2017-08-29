import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'
import { getListByCategory1Id, getSearchResult } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'
import Filter from '../../components/Filter/Filter'

import './style.scss'
class VariousKind extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      category_1: '',
      brands: [],
      kinds: [],
      prices: []
    }
  }
  render() {
    const { category_1, brands, kinds, prices } = this.state
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
          </div>
        </div>

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
  }

  onFilterChange({ selectedBrands, selectedKinds, selectedPrice }) {
    console.log(selectedBrands)
    console.log(selectedKinds)
    console.log(selectedPrice)
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
}

export default VariousKind