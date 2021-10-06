import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  let notification = props.notification
  console.log(notification)

  if (notification === false) {
    return null
  }
  else {
    return (
      <div className="notification">
        {notification}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification