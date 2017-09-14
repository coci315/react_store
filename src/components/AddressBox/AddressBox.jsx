import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
// import Select from '../../components/Select/Select'
// import { getAddressLevel, getNextAddress, saveAddress, cacheAddress } from '../../api/api.js'
import { loadAddress, addAddress } from '../../common/js/cache.js'
// import { Address } from '../../common/js/address.js'
import EmptyAddress from './subpages/EmptyAddress/EmptyAddress'

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
              <div>123</div>
            ) : (
                <EmptyAddress />
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
}



AddressBox.propTypes = {

}

AddressBox.defaultProps = {

}

export default AddressBox