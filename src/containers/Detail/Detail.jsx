import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getProductDetail, getHotProduct } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'

import './style.scss'
class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      currentText: ''
    }
  }
  render() {
    const { currentText } = this.state
    return (
      <div className="m-detail">
        <div className="g-bd f-cb">
          <Bread currentText={currentText} />
        </div>
      </div>
    )
  }
  componentDidMount() {
    this._getProductDetail()
    this._getHotProduct()
  }

  _getProductDetail() {
    const id = this.props.params.id
    getProductDetail(id).then(res => {
      console.log(res)
      const currentText = res.product.name
      this.setState({
        currentText
      })
    })
  }

  _getHotProduct() {
    getHotProduct().then(res => {
      console.log(res)
    })
  }
}

export default Detail