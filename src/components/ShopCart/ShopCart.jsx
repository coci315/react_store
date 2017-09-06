import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Count from '../../components/Count/Count'

import './style.scss'
class ShopCart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      itemDatas: [],
      invalidItemDatas: [],
      isSelectAll: false
    }
  }
  render() {
    const { itemDatas, invalidItemDatas, isSelectAll } = this.state
    const { selectNum, freeFreightMoney } = this.props
    return (
      <div className="m-shopcart">
        <div className="head clearfix">
          <div className="check f-fl">
            <i className={isSelectAll ? "checkbox z-checked" : "checkbox"}
              onClick={this.clickHandleOnCheckAll.bind(this)}
            ></i>
          </div>
          <div className="cnt f-fl">
            <div className="coverwrap f-fl">全选</div>
            <div className="product f-fl">商品</div>
            <div className="pri1 f-fl f-tc">金额</div>
            <div className="num f-fl f-tc">数量</div>
            <div className="pri2 f-fl f-tc">小计</div>
            <div className="man f-fl">操作</div>
          </div>
        </div>
        <ul>
          <li className="clearfix first">
            <div className="f-fl product">全部商品&nbsp;(&nbsp;{selectNum}&nbsp;)&nbsp;</div>
            <div className="f-fr f-mgr20">
              {
                freeFreightMoney ? (
                  <div>
                    <div className="f-fl icon"><i></i></div>
                    <div className="f-fl txt">全场满<em className="s-fcTheme">￥{freeFreightMoney}</em>免运费</div>
                  </div>
                ) : ''
              }
            </div>
          </li>
          {
            itemDatas.map((item, index) => {
              return (
                <li className="clearfix" key={item.productId}>
                  <div className="check f-fl">
                    <i className={item.selected ? "checkbox z-checked" : "checkbox"}
                      onClick={this.clickHandleOnCheck.bind(this, index)}
                    ></i>
                  </div>
                  <div className="cnt f-fl">
                    <div className="coverwrap f-fl">
                      <div className="cover">
                        <Link to={"/detail/" + item.productId}>
                          <img src={item.goodSkuData.picUrl + "?param=80y80"} />
                        </Link>
                      </div>
                    </div>
                    <div className="msg f-fl">
                      <Link to={"/detail/" + item.productId}>
                        <p className="tit f-thide">{item.productName}</p>
                      </Link>
                      <p className="sku f-thide">
                        {item.goodSkuData.attrs.map(attr => {
                          return attr.attrValue
                        }).join(' ')}
                      </p>
                    </div>
                    <div className="price f-fl f-tc">
                      ￥<em>{item.signleMoney}</em>
                    </div>
                    <div className="ctrl f-fl f-pr f-tc">
                      <Count />
                    </div>
                    <div className="price line f-fl f-tc">￥{item.itemMoney}</div>
                    <div className="delete f-fl"></div>
                  </div>
                </li>
              )
            })
          }
          <li className="bottom">
            <div className="clearfix s-fc4">
              <div className="check f-fl">
                <i className={isSelectAll ? "checkbox z-checked" : "checkbox"}
                  onClick={this.clickHandleOnCheckAll.bind(this)}
                ></i>
              </div>
              <div className="f-fl">
                <div className="coverwrap f-fl">全选</div>
                <div className="product f-fl">已选择 <em className="s-fcTheme">{selectNum}</em> 件商品</div>
              </div>
              <div className="paybtn f-fr">结算</div>
              <div className="f-fr">
                <span className="s-fc4">

                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  componentDidMount() {
    const { itemDatas, invalidItemDatas } = this.props
    this._initSelected(itemDatas)
    this.setState({
      itemDatas,
      invalidItemDatas
    })
    setTimeout(() => {
      this._checkIsSelectAll()
    }, 20)
  }

  componentWillReceiveProps(nextProps) {
    const { itemDatas, invalidItemDatas } = nextProps
    this._initSelected(itemDatas)
    this.setState({
      itemDatas,
      invalidItemDatas
    })
    setTimeout(() => {
      this._checkIsSelectAll()
    }, 20)
  }

  clickHandleOnCheck(index) {
    const itemDatas = this.state.itemDatas.slice()
    itemDatas[index].selected = !itemDatas[index].selected
    this.setState({
      itemDatas
    })
    setTimeout(() => {
      this._checkIsSelectAll()
    }, 20)
  }

  clickHandleOnCheckAll() {
    let { isSelectAll } = this.state
    const itemDatas = this.state.itemDatas.slice()
    if (isSelectAll) {
      itemDatas.forEach(item => item.selected = false)
      isSelectAll = false
    } else {
      itemDatas.forEach(item => item.selected = true)
      isSelectAll = true
    }
    this.setState({
      itemDatas,
      isSelectAll
    })
  }

  _initSelected(itemDatas) {
    itemDatas.forEach(item => item.selected = true)
  }

  _checkIsSelectAll() {
    const { itemDatas } = this.state
    let isSelectAll
    if (!itemDatas.length) {
      isSelectAll = false
    } else {
      isSelectAll = itemDatas.every(item => { return item.selected })
    }
    this.setState({
      isSelectAll
    })
  }
}

ShopCart.propTypes = {
  selectNum: PropTypes.number,
  freeFreightMoney: PropTypes.number,
  itemDatas: PropTypes.array,
  invalidItemDatas: PropTypes.array
}

ShopCart.defaultProps = {
  selectNum: 0,
  freeFreightMoney: 0,
  itemDatas: [],
  invalidItemDatas: []
}

export default ShopCart