import React from 'react'
import Link from 'next/link'
import { urlBase64ToUint8Array } from '../lib/utils'

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.register = this.register.bind(this)
  }
  register() {
    if ('serviceWorker' in navigator) {
      const sw = require('file-loader?outputPath=static&name=[name]-[hash:6].[ext]!../lib/service-worker')
      navigator.serviceWorker
        .register(sw)
        .then(async registration => {
          const subscription = await registration.pushManager.getSubscription()
          if (subscription) {
            return subscription
          }
          const response = await fetch('/push/key')
          const publicKey = await response.text()
          const convertedKey = urlBase64ToUint8Array(publicKey)

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey,
          })
        })
        .then(subscription => {
          fetch('/push/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subscription,
              email: this.state.email,
            }),
          })
        })
        .catch(e => console.warn(e))
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.email}
          name="email"
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="blue bg-white pa1 ma1"
          onClick={e => {
            e.preventDefault()
            this.register()
          }}
        >
          Click
        </button>
      </div>
    )
  }
}
