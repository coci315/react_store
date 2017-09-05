import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getNewAlbum, getSaleAlbum } from '../../api/api.js'
import NewAlbumList from '../../components/NewAlbumList/NewAlbumList'
import SaleAlbumList from '../../components/SaleAlbumList/SaleAlbumList'
import ToTop from '../../components/ToTop/ToTop'

import './style.scss'
class Dgalbum extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      newAlbums: [],
      saleAlbums: []
    }
  }
  render() {
    const { newAlbums, saleAlbums } = this.state
    return (
      <div className="m-dgalbum">
        <div className="g-bd f-cb">
          <div className="m-newalbum">
            <h3 className="f-fs24">新碟上架</h3>
            <NewAlbumList albums={newAlbums} />
          </div>
          <div className="m-albumrank">
            <h3 className="f-fs24">畅销排行</h3>
            <SaleAlbumList albums={saleAlbums} />
          </div>
        </div>
        <ToTop />
      </div>
    )
  }
  componentDidMount() {
    this._getNewAlbum()
    this._getSaleAlbum()
  }
  _getNewAlbum() {
    getNewAlbum().then(res => {
      console.log(res)
      const newAlbums = res.products.slice(0, 8)
      this.setState({
        newAlbums
      })
    })
  }
  _getSaleAlbum() {
    getSaleAlbum().then(res => {
      console.log(res)
      const saleAlbums = res.product
      this.setState({
        saleAlbums
      })
    })
  }
}

export default Dgalbum