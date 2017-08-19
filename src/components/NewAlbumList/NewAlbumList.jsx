import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './style.scss'

class NewAlbumList extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const { albums } = this.props
    return (
      <ul className="new_album_list clearfix">
        {
          albums.map((item, index) => {
            return (
              <li className={index % 4 === 0 ? "nopad" : ""} key={item.albumId}>
                <div className="f-pr">
                  <Link to={'/detail/' + item.albumId}>
                    <div className="u-cover f-pr">
                      <img src={item.coverUrl + '?param=210y210'} alt={item.albumName} />
                    </div>
                    <i className="circle"></i>
                  </Link>
                </div>
                <div className="cnt f-tc">
                  <h3 className="f-thide">{item.albumName}</h3>
                  <p className="name f-thide">{item.artistName}</p>
                  <p className="txt f-thide">￥<em>{item.price}</em></p>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

NewAlbumList.propTypes = {
  albums: PropTypes.array
}

NewAlbumList.defaultProps = {
  albums: []
}

export default NewAlbumList