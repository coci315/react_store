import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { loadAddress, addAddress } from '../../common/js/cache.js'
import EmptyAddress from './subpages/EmptyAddress/EmptyAddress'
import AddressDisplay from './subpages/AddressDisplay/AddressDisplay'

import './style.scss'
class AddressBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      addressList: []
    }
  }
  render() {
    const { addressList } = this.state
    console.log(addressList)
    return (
      <div className="m-address-box">
        <div className="m-address-front">
          {
            addressList.length ? (
              <AddressDisplay addressList={addressList} />
            ) : (
                <EmptyAddress onSave={this.onSaveEmptyAddress.bind(this)} />
              )
          }
        </div>
      </div>
    )
  }
  componentDidMount() {
    const addressList = loadAddress()
    this.setState({
      addressList
    })
  }

  onSaveEmptyAddress() {
    const addressList = loadAddress()
    this.setState({
      addressList
    })
  }
}



AddressBox.propTypes = {

}

AddressBox.defaultProps = {

}

export default AddressBox