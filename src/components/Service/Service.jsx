import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
const serviceText = {
  '1': '7天无理由退货',
  '2': '不支持7天无理由退货',
  '3': '15天无忧换货',
  '5': '满119包邮',
  '6': '包邮',
  '7': '顺丰发货',
  '8': '商家发货',
  '10': '云音乐自营',
  '11': '品牌联合定制',
  '12': '商家认证',
  '13': '部分地区无法配送'
}

const serviceDetail = {
  '1': '该商品支持7天无理由退货，买家在商品签收日起7天内可在线发起退货申请',
  '2': '该商品不支持7天无理由退货',
  '3': '该商品支持15天无忧换货，买家在商品签收之日起15天内可在线发起换货申请',
  '5': '单笔订单金额（不含运费）满119元享受包邮服务',
  '6': '该商品支持包邮服务',
  '7': '该商品物流由顺丰提供服务，24小时内发货，法定节假日顺延',
  '8': '该商品由{businessName}发货，2个工作日内发货，法定节假日顺延',
  '10': '该商品为云音乐自营，从源头严格把关商品生产，保障品质',
  '11': '该商品由"云音乐"&"{brandName}"联合开发，特供定制，保障品质',
  '12': '严格审核商家资质，100%正规渠道商品',
  '13': '该商品部分地区无法配送，请查阅详情页详细说明'
}
class Service extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.serviceText = serviceText
    this.serviceDetail = serviceDetail
  }
  render() {
    const { serviceType } = this.props
    return (
      <div className="m-services f-pr">
        <p>服务：</p>
        <div className="cnt">
          {
            serviceType.map((item, index) => {
              return (
                <a className="server" key={item}>{this.serviceText[item]}</a>
              )
            })
          }
        </div>
      </div>
    )
  }
  componentDidMount() {
    const { businessName, brandName } = this.props
    this.serviceDetail['8'] = this.serviceDetail['8'].replace('{businessName}', businessName)
    this.serviceDetail['11'] = this.serviceDetail['11'].replace('{brandName}', brandName)
  }
}

Service.propTypes = {
  serviceType: PropTypes.array,
  businessName: PropTypes.string,
  brandName: PropTypes.string
}

Service.defaultProps = {
  serviceType: [],
  businessName: '',
  brandName: ''
}

export default Service