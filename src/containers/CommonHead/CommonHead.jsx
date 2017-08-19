import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link, browserHistory } from 'react-router'
import { getSearchSuggest, getSearchWord } from '../../api/api.js'
import SearchInput from '../../components/SearchInput/SearchInput'
import List from '../../components/List/List'
import SuggestList from '../../components/SuggestList/SuggestList'
import { loadSearchHistory, addSearchHistory, delSearchHistory } from '../../common/js/cache.js'

import './style.scss'

class CommonHead extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      defaultKey: '',
      configKey: [],
      searchHistory: [],
      showList: false,
      showMenu: false,
      searchWord: '',
      suggestWord: [],
      searchInputValue: ''
    }
  }

  render() {
    const configKey = this.state.configKey.slice()
    const hotItems = this._formatConfigKey(configKey)
    const searchHistory = this.state.searchHistory.slice()
    const historyItems = this._formatArray(searchHistory)
    const showMenu = this.state.showMenu

    const { showList, searchWord, suggestWord, searchInputValue } = this.state
    let list = null
    if (showList) {
      if (!searchWord) {
        list = (<div>
          <div className="f-shadow"></div>
          <List title="热门搜索"
            items={hotItems}
            clickHandle={this.goSearch.bind(this)}
          />
          {
            historyItems.length ? (<List title="最近搜索"
              items={historyItems}
              clickHandle={this.goSearch.bind(this)}
              delMode={true}
              delHandle={this.onHistoryListDel.bind(this)}
            />) : ''
          }
        </div>)
      } else {
        list = (suggestWord.length ? <SuggestList word={searchWord} items={suggestWord} clickHandle={this.goSearch.bind(this)} /> : '')
      }
    }
    return (
      <div className="common-head f-pr">
        <div className="m-head f-cb clearfix">
          <div className="m-logo f-fl">
            <Link to="/" className="f-sprite"></Link>
          </div>
          <div className="m-search f-fl">
            <div className="inputwrap" onClick={(e) => {
              e.stopPropagation()
            }}>
              <SearchInput placeholder={this.state.defaultKey}
                focusHandle={this.onSearchInputFocus.bind(this)}
                inputHandle={this.onSearchInputInput.bind(this)}
                enterHandle={this.goSearch.bind(this)}
                value={searchInputValue}
                ref={(input) => { this.searchInput = input }}
              />
            </div>
            <div className="wrap" onClick={(e) => {
              e.stopPropagation()
            }}>
              {list}
            </div>
          </div>
          <div className="m-shopcar f-fl f-pr">
            <Link to="/cart" className="f-sprite">
              <span className="num f-sprite f-pa">0</span>
            </Link>
          </div>
          <div className="m-user f-fl">
            <div className="m-select f-pr"
              onMouseOver={this.showMenu.bind(this)}
              onMouseOut={this.hideMenu.bind(this)}
            >
              <div className="login">登录</div>
              <ul style={{ display: (showMenu ? 'block' : 'none') }}>
                <li>
                  <a className="f-pr"><em className="phone"></em>手机号登录<span className="f-pa"></span></a>
                </li>
                <li>
                  <a className="f-pr"><em className="wechat f-sprite-icon"></em>微信登录<span className="f-pa"></span></a>
                </li>
                <li>
                  <a className="f-pr"><em className="qq f-sprite-icon"></em>QQ登录<span className="f-pa"></span></a>
                </li>
                <li>
                  <a className="f-pr"><em className="sina"></em>新浪微博登录<span className="f-pa"></span></a>
                </li>
                <li>
                  <a className="f-pr"><em className="netease"></em>网易邮箱账号登录<span className="f-pa"></span></a>
                </li>
              </ul>
              <i className="arr f-sprite" style={{ display: (showMenu ? 'block' : 'none') }}></i>
            </div>
          </div>
        </div>
        <div className="border f-pa"></div>
      </div>

    )
  }

  componentDidMount() {
    this._getSearchSuggest()
    this._loadSearchHistory()
    window.addEventListener('click', () => {
      this.hideList()
    })
  }

  onHotListClick(label) {
    addSearchHistory(label)
    this._loadSearchHistory()
  }

  onHistoryListDel(label) {
    delSearchHistory(label)
    this._loadSearchHistory()
  }

  onSearchInputFocus(value) {
    this.showList()
  }

  onSearchInputInput(value) {
    getSearchWord(value).then(res => {
      // console.log(res)
      const searchWord = res.data.parse_q
      const suggestWord = res.data.result.map(i => i.name)
      this.setState({
        searchWord,
        suggestWord
      })
    })
  }

  goSearch(value) {
    browserHistory.push('/search?q=' + value)
    addSearchHistory(value)
    this._loadSearchHistory()
    this.hideList()
    this.searchInput.setValue(value)
  }

  showList() {
    this.setState({
      showList: true
    })
  }

  hideList() {
    this.setState({
      showList: false
    })
  }

  showMenu() {
    this.setState({
      showMenu: true
    })
  }

  hideMenu() {
    this.setState({
      showMenu: false
    })
  }

  _getSearchSuggest() {
    getSearchSuggest().then(res => {
      // console.log(res)
      const { defaultKey, configKey } = res.data
      this.setState({
        defaultKey,
        configKey
      })
    })
  }

  _loadSearchHistory() {
    const history = loadSearchHistory()
    this.setState({
      searchHistory: history
    })
  }

  _formatConfigKey(configKey) {
    if (!configKey.length) return []
    return configKey.map((item, index) => {
      const obj = {}
      obj.label = item[index + 1]
      return obj
    })
  }

  _formatArray(arr) {
    if (!arr.length) return []
    return arr.map(item => {
      const obj = {}
      obj.label = item
      return obj
    })
  }
}

export default CommonHead