import React, { Component } from 'react'
import Card from '@material-ui/core/Card'

export default class UnsplashPicture extends Component {
  render() {
    return (
      <Card
        style={{
          width: 250,
          height: 250
        }}
      >
        <img src={this.props.url} alt='Issue communicating with Unsplash API' />
      </Card>
    )
  }
}
