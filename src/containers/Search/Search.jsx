import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'
import { getSearchResult } from '../../api/api.js'
import Bread from '../../components/Bread/Bread'
import NavTab from '../../components/NavTab/NavTab'

import './style.scss'
class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      key: '',
      tabs: ['综合', '价格低到高', '价格高到低']
    }
    this.onTabChange = this.onTabChange.bind(this)
  }
  render() {
    const { key, tabs } = this.state
    return (
      <div className="m-search">
        <div className="g-bd f-cb">
          <Bread currentText={key} />
          <div className="g-main">
            <div className="m-searchlist">
              <NavTab tabs={tabs} onTabChange={this.onTabChange} />
            </div>
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

  onTabChange(index) {
    console.log(index)
  }

  _getSearchResult(key, limit = 60, offset = 0) {
    getSearchResult(key, limit, offset).then(res => {
      console.log(res)
    })
  }
}

export default Search