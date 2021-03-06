import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import Count from '../../components/Count/Count'
import { getTotalMoney, updateCart, delSelect, getOrderKey } from '../../api/api.js'

import './style.scss'
class ShopCart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      itemDatas: [],
      invalidItemDatas: [],
      isSelectAll: false,
      totalMoney: 0,
      showInvalid: false
    }
  }
  render() {
    const { itemDatas, invalidItemDatas, isSelectAll, totalMoney, showInvalid } = this.state
    const { selectNum, freeFreightMoney } = this.props
    let selectedTotalNum = this._getSelectedTotalNum()
    if (selectedTotalNum > 99) {
      selectedTotalNum = '99+'
    }
    const diff = freeFreightMoney - totalMoney
    return (
      <div className="m-shopcart">
        {
          itemDatas.length ? (
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
          ) : ''
        }
        {
          itemDatas.length ? (
            <ul>
              <li className="clearfix first">
                <div className="f-fl product">全部商品&nbsp;(&nbsp;{selectedTotalNum}&nbsp;)&nbsp;</div>
                <div className="f-fr f-mgr20">
                  {
                    freeFreightMoney ? (
                      diff > 0 ? (
                        <Link to={"/column?id=27001&title=凑单活动页&fmoney=" + freeFreightMoney + "&emoney=" + diff}>
                          <div className="f-fl icon"><i></i></div>
                          <div className="f-fl txt">全场满<em className="s-fcTheme">￥{freeFreightMoney}</em>免运费（还差￥{diff}）</div>
                          去凑单&nbsp;>
                        </Link>
                      ) : (
                          <div>
                            <div className="f-fl icon"><i></i></div>
                            <div className="f-fl txt">全场满<em className="s-fcTheme">￥{freeFreightMoney}</em>免运费</div>
                          </div>
                        )
                    ) : ''
                  }
                </div>
              </li>
              {
                itemDatas.map((item, index) => {
                  return (
                    <li className="clearfix" key={item.cartId}>
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
                          <Count count={item.num}
                            onChange={this.changeHandleOnCount.bind(this, index)}
                            max={Math.min(50, item.sellableNum)}
                          />
                          {
                            item.sellableNum < 10 ? (
                              <div className="store">库存紧张</div>
                            ) : ''
                          }
                        </div>
                        <div className="price line f-fl f-tc">￥{item.itemMoney}</div>
                        <div className="delete f-fl" onClick={this.clickHandleOnDelete.bind(this, index)}></div>
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
                    <div className="product f-fl">已选择 <em className="s-fcTheme">{selectedTotalNum}</em> 件商品</div>
                  </div>
                  <div className={totalMoney === 0 ? "paybtn f-fr z-dis" : "paybtn f-fr"}
                    onClick={this.clickHandleOnPay.bind(this)}
                  >结算</div>
                  <div className="f-fr">
                    <span className="s-fc4">
                      {
                        diff > 0 ? ('差' + diff + '元免运费') : ('已享受免运费')
                      }&nbsp;|&nbsp;
                  </span>
                    <span className="s-fc1">合计&nbsp;：&nbsp;</span>
                    <span className="f-fs20 s-fcTheme">￥<em>{totalMoney === 0 ? '0.00' : totalMoney}</em></span>
                  </div>
                </div>
              </li>
            </ul>
          ) : (
              <div className="empty">
                <i className="icon"></i>
                <span className="f-fs18">
                  <span className="s-fc3 f-tc">购物车还是空的，</span>
                  <Link className="s-fcLink" to="/">去逛逛 ></Link>
                </span>
              </div>
            )
        }
        {
          invalidItemDatas.length ? (
            <ul className="invalid" style={showInvalid ? {} : { border: 0 }}>
              <li className="first">
                <a className={showInvalid ? "drop" : "right"}
                  onClick={this.toggleShowInvalid.bind(this)}
                >
                  <i></i>
                  <span className="f-fs14 s-fc4">
                    失效商品&nbsp;(&nbsp;{invalidItemDatas.length}&nbsp;)&nbsp;
                </span>
                </a>
                <a className="delete s-fc4 f-fr"
                  onClick={this.clickHandleOnClearInvalid.bind(this)}
                >
                  <span className="f-fs14">
                    <i className="f-pr"></i>
                    &nbsp;清空全部失效商品
                </span>
                </a>
              </li>
              {
                showInvalid ? (
                  invalidItemDatas.map((item, index) => {
                    return (
                      <li className="clearfix f-pr" key={item.cartId}>
                        <div className="check f-fl">
                          <i className="checkbox"></i>
                        </div>
                        <div className="cnt f-fl">
                          <div className="coverwrap f-fl">
                            <Link to={"/detail/" + item.productId} className="f-pr zdex f-ib">
                              <img src={item.goodSkuData.picUrl + "?param=80y80"} />
                            </Link>
                          </div>
                          <div className="msg f-fl">
                            <Link to={"/detail/" + item.productId} className="f-pr zdex f-ib">
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
                            <Count count={item.num}
                              max={1}
                            />
                            {
                              item.sellableNum === 0 ? (
                                <div className="s-fcTheme f-mgt30 f-fs12">商品已售罄</div>
                              ) : ''
                            }
                          </div>
                          <div className="price line f-fl f-tc">￥{item.itemMoney}</div>
                          <div className="delete f-fl" onClick={this.clickHandleOnDeleteInvalid.bind(this, index)}></div>
                        </div>
                        <div className="cover f-pa"></div>
                      </li>
                    )
                  })
                ) : ''
              }
            </ul>
          ) : ''
        }
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
      this._getTotalMoney()
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
      this._getTotalMoney()
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
      this._getTotalMoney()
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
    setTimeout(() => {
      this._getTotalMoney()
    }, 20)
  }

  clickHandleOnDelete(index) {
    let itemDatas = this.state.itemDatas.slice()
    const cartId = itemDatas[index].cartId
    itemDatas = itemDatas.filter(item => {
      return item.cartId !== cartId
    })
    this.setState({
      itemDatas
    })
    delSelect(cartId).then(res => {
      this._getTotalMoney()
    })
  }

  clickHandleOnDeleteInvalid(index) {
    let invalidItemDatas = this.state.invalidItemDatas.slice()
    const cartId = invalidItemDatas[index].cartId
    invalidItemDatas = invalidItemDatas.filter(item => {
      return item.cartId !== cartId
    })
    this.setState({
      invalidItemDatas
    })
    delSelect(cartId).then(res => {
      this._getTotalMoney()
    })
  }

  clickHandleOnClearInvalid() {
    const cartIds = this._getAllInvalidCartIds()
    this.setState({
      invalidItemDatas: []
    })
    delSelect(cartIds).then(res => {
      this._getTotalMoney()
    })
  }

  clickHandleOnPay() {
    if (!this.state.totalMoney) return
    this._getOrderKey()
  }

  changeHandleOnCount(index, count) {
    console.log(index + '---' + count)
    const itemDatas = this.state.itemDatas.slice()
    const cartId = itemDatas[index].cartId
    const num = count
    itemDatas[index].num = num
    itemDatas[index].itemMoney = itemDatas[index].signleMoney * num
    this.setState({
      itemDatas
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      updateCart(cartId, num).then(res => {
        const newItemDatas = res.result.itemDatas
        itemDatas[index] = Object.assign({}, itemDatas[index], newItemDatas[index])
        this.setState({
          itemDatas
        })
        setTimeout(() => {
          this._getTotalMoney()
        }, 20)
      })
    }, 500)
  }

  toggleShowInvalid() {
    let showInvalid = !this.state.showInvalid
    this.setState({
      showInvalid
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

  _getSelectedTotalNum() {
    const { itemDatas } = this.state
    const nums = itemDatas.map(item => {
      return item.selected ? item.num : 0
    })
    console.log(nums)
    return nums.reduce((pre, cur) => {
      return pre + cur
    }, 0)
  }

  _getSelectedCartIds() {
    const { itemDatas } = this.state
    const arr = []
    itemDatas.forEach(item => {
      if (item.selected) {
        arr.push(item.cartId)
      }
    })
    return arr.join()
  }

  _getSelectedSnapShotIds() {
    const { itemDatas } = this.state
    const arr = []
    itemDatas.forEach(item => {
      if (item.selected) {
        arr.push(item.goodSkuData.snapShotId)
      }
    })
    return arr.join()
  }

  _getSelectedGoodMoneys() {
    const { itemDatas } = this.state
    const arr = []
    itemDatas.forEach(item => {
      if (item.selected) {
        arr.push(item.itemMoney)
      }
    })
    return arr.join()
  }

  _getAllInvalidCartIds() {
    const { invalidItemDatas } = this.state
    const arr = invalidItemDatas.map(item => item.cartId)
    return arr.join()
  }

  _getTotalMoney() {
    const cateIds = this._getSelectedCartIds()
    if (cateIds) {
      getTotalMoney(cateIds).then(res => {
        console.log(res)
        const { totalMoney } = res
        this.setState({
          totalMoney
        })
      })
    } else {
      this.setState({
        totalMoney: 0
      })
    }
  }

  _getOrderKey() {
    const cateIds = this._getSelectedCartIds()
    const snapshotIds = this._getSelectedSnapShotIds()
    const goodMoneys = this._getSelectedGoodMoneys()
    getOrderKey(cateIds, snapshotIds, goodMoneys).then(res => {
      console.log(res)
      browserHistory.push('/order/confirm')
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