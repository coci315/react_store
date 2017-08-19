import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './style.scss'

class SaleAlbumList extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const { albums } = this.props
    return (
      <ul className="sale_album_list f-fs14">
        <li className="title">
          <span className="col1">名次</span>
          <span className="col2"></span>
          <span className="col3">专辑</span>
          <span className="col4"></span>
          <span className="col5">歌手</span>
          <span className="col6"></span>
          <span className="col7">销量</span>
        </li>
        {
          albums.map((item, index) => {
            return (
              <li className="content" key={item.albumId}>
                <Link to={'/detail/' + item.productId}>
                  <span className="col1">{index + 1}</span>
                  <span className="col2">
                    <div className="cover f-pr">
                      <div className="u-cover f-pr">
                        <img src={item.coverUrl + '?param=100y100'} alt={item.albumName} />
                      </div>
                      <i className="circle"></i>
                    </div>
                  </span>
                  <span className="col3 f-thide">{item.albumName}</span>
                  <span className="col4"></span>
                  <span className="col5 f-thide">{item.artistName}</span>
                  <span className="col6"></span>
                  <span className="col7">{item.saleNum} 张</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

SaleAlbumList.propTypes = {
  albums: PropTypes.array
}

SaleAlbumList.defaultProps = {
  albums: []
}

export default SaleAlbumList