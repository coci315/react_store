import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class Filter extends React.Component {
  constructor(props, context) {
    super(props, context)
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      selectedBrands: [],
      showMore: false,
      selectedKinds: [],
      selectedPrice: '',
      price_from: '',
      price_to: ''
    }
  }
  render() {
    const { brands, kinds, prices } = this.props
    const { selectedBrands, selectedKinds, selectedPrice, showMore, price_from, price_to } = this.state
    return (
      <div className="m-filter">
        <div className="g-wrap">
          <div className="tags clearfix">
            <div className="clearfix">
              <span className="title">品牌：</span>
              <ul className="brand clearfix">
                {
                  brands.map((item, index) => {
                    const { id, brandName } = item
                    return (
                      (showMore || index < 18) ? (
                        <li key={id}>
                          <a className={selectedBrands.indexOf(brandName) > -1 ? "tag z-slt" : "tag"}
                            onClick={this.handleClickOnBrand.bind(this, brandName)}
                          >{brandName}</a>
                        </li>
                      ) : ''
                    )
                  })
                }
              </ul>
              {
                brands.length > 18 ? (showMore ? (
                  <span className="less" onClick={this.showLess.bind(this)}>
                    收起
                  <i></i>
                  </span>
                ) : (
                    <span className="more" onClick={this.showMore.bind(this)}>
                      更多
                  <i></i>
                    </span>
                  )) : ''
              }
            </div>
            {
              selectedBrands.length > 1 ? (
                <div className="btnwrap">
                  <span className="btn" onClick={this.clearSelectedBrands.bind(this)}>重 置</span>
                </div>
              ) : ''
            }
          </div>
          <div className="tags clearfix">
            <div className="clearfix">
              <span className="title">分类：</span>
              <ul className="clearfix">
                {
                  kinds.map((item, index) => {
                    const { id, kindname } = item
                    return (
                      <li key={id}>
                        <a className={selectedKinds.indexOf(kindname) > -1 ? "tag z-slt" : "tag"}
                          onClick={this.handleClickOnKind.bind(this, kindname)}
                        >{kindname}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            {
              selectedKinds.length > 1 ? (
                <div className="btnwrap">
                  <span className="btn" onClick={this.clearSelectedKinds.bind(this)}>重 置</span>
                </div>
              ) : ''
            }
          </div>
          <div className="tags clearfix end">
            <div className="clearfix">
              <span className="title">价格：</span>
              <ul className="clearfix">
                {
                  prices.map((item, index) => {
                    const { id, begin, end } = item
                    const price = begin + '~' + end
                    return (
                      <li key={id}>
                        <a className={selectedPrice === price ? "tag z-slt" : "tag"}
                          onClick={this.handleClickOnPrice.bind(this, price)}
                        >{price}</a>
                      </li>
                    )
                  })
                }
                <li className="diy">
                  <span className="txt f-fl">自定义</span>
                  <span className="f-fl">
                    <input type="text"
                      placeholder="￥"
                      value={price_from}
                      onChange={this.handleChangeOnPriceFrom.bind(this)}
                    />
                  </span>
                  <span className="to f-fl">——</span>
                  <span className="f-fl">
                    <input type="text"
                      placeholder="￥"
                      value={price_to}
                      onChange={this.handleChangeOnPriceTo.bind(this)}
                    />
                  </span>
                </li>
                <li className="diy">
                  <span className={(price_from === '' || price_to === '') ? "btn z-dis" : "btn"}
                    onClick={this.handleClickOnDiyPrice.bind(this)}
                  >确定</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClickOnBrand(brandName) {
    let { selectedBrands } = this.state
    const index = selectedBrands.indexOf(brandName)
    if (index > -1) {
      selectedBrands = selectedBrands.filter((item) => {
        return item !== brandName
      })
    } else {
      selectedBrands.push(brandName)
    }
    this.setState({
      selectedBrands
    })
    this._emitChange()
  }

  handleClickOnKind(kindname) {
    let { selectedKinds } = this.state
    const index = selectedKinds.indexOf(kindname)
    if (index > -1) {
      selectedKinds = selectedKinds.filter((item) => {
        return item !== kindname
      })
    } else {
      selectedKinds.push(kindname)
    }
    this.setState({
      selectedKinds
    })
    this._emitChange()
  }

  handleClickOnPrice(price) {
    const { selectedPrice } = this.state
    let newPrice = price
    if (selectedPrice === price) {
      newPrice = ''
    }
    this.setState({
      selectedPrice: newPrice
    })
    this._emitChange()
  }

  handleClickOnDiyPrice() {
    const { price_from, price_to } = this.state
    if (price_from === '' || price_to === '') return
    const price = price_from + '~' + price_to
    this.setState({
      selectedPrice: price
    })
    this._emitChange()
  }

  handleChangeOnPriceFrom(e) {
    let price_from = e.target.value
    const last = price_from.slice(-1)
    if (!/\d/.test(last)) {
      price_from = price_from(0, -1)
    }
    this.setState({
      price_from
    })
    clearTimeout(this.timerFrom)
    this.timerFrom = setTimeout(() => {
      this._comparePrice()
    }, 500)
  }

  handleChangeOnPriceTo(e) {
    let price_to = e.target.value
    const last = price_to.slice(-1)
    if (!/\d/.test(last)) {
      price_to = price_to(0, -1)
    }
    this.setState({
      price_to
    })
    clearTimeout(this.timeTo)
    this.timeTo = setTimeout(() => {
      this._comparePrice()
    }, 500)
  }

  clearSelectedBrands() {
    this.setState({
      selectedBrands: []
    })
    this._emitChange()
  }

  clearSelectedKinds() {
    this.setState({
      selectedKinds: []
    })
    this._emitChange()
  }

  showMore() {
    this.setState({
      showMore: true
    })
  }

  showLess() {
    this.setState({
      showMore: false
    })
  }

  _emitChange() {
    setTimeout(() => {
      const { selectedBrands, selectedKinds, selectedPrice } = this.state
      this.props.onFilterChange && this.props.onFilterChange({ selectedBrands, selectedKinds, selectedPrice })
    }, 20)
  }

  _comparePrice() {
    let { price_from, price_to } = this.state
    if (price_from === '' || price_to === '') {
      return
    }
    price_from = Number(price_from)
    price_to = Number(price_to)
    if (price_from > price_to) {
      let temp = price_from
      price_from = price_to
      price_to = temp
      this.setState({
        price_from,
        price_to
      })
    }
  }
}

Filter.propTypes = {
  brands: PropTypes.array,
  kinds: PropTypes.array,
  prices: PropTypes.array,
  onFilterChange: PropTypes.func
}

Filter.defaultProps = {
  brands: [],
  kinds: [],
  prices: []
}

export default Filter