import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getProductDetail, getHotProduct } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'
import Loading from '../../components/Loading/Loading'

import './style.scss'
class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      currentText: '',
      showLoading: true
    }
  }
  render() {
    const { currentText, showLoading } = this.state
    return (
      <div className="m-detail">
        <div className="g-bd f-cb">
          <Bread currentText={currentText} />
          <div className="g-main">
            <div className="n-detail">
              <Loading showFlag={showLoading} />
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
      const currentText = res.product.name
      this.setState({
        currentText
      })
      this.hideLoading()
    })
  }

  _getHotProduct() {
    getHotProduct().then(res => {
      console.log(res)
    })
  }
}

export default Detail