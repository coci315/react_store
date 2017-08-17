import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getUrlQuery } from '../../common/js/util.js'

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      word: ''
    }
  }
  render() {
    return (
      <h1>Search{this.state.word}</h1>
    )
  }
  componentDidMount() {
    const word = getUrlQuery('q')
    this.setState({
      word
    })
  }
}

export default Search