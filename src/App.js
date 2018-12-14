import React, { Component } from 'react'
import './App.css'

import InputField from './components/input-field'
import ColorSquare from './components/color-square'
import UnsplashPicture from './components/unsplash-picture'
const styles = {
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.colorAPI = this.colorAPI.bind(this)
    // this.pictureAPI = this.pictureAPI.bind(this)
    this.colorAPI('12ab5f')
  }

  state = {
    colors: [],
    names: [],
    urls: ['', '', '', '', '']
  }

  colorAPI(color) {
    this.setState({ urls: [] })
    fetch(
      `http://www.thecolorapi.com/scheme?hex=${color}&mode=quad&format=json`
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const colors = data.colors.map((e) => {
          return e.hex.value
        })
        const names = data.colors.map((e, i) => {
          this.pictureAPI(e.name.value, i)
          return e.name.value
        })

        this.setState({ colors, names })
      })
  }

  pictureAPI(name, idx) {
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=***REMOVED***`
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.results[0]) {
          const url = data.results[0].urls.small
          let newURLs = this.state.urls
          newURLs[idx] = url
          this.setState({ urls: newURLs })
        }
      })
  }

  render() {
    return (
      <div className="App">
        <InputField onInputSubmit={this.colorAPI} />
        <div style={styles.colorRow}>
          {this.state.colors.map((e, i) => {
            return <ColorSquare key={i} color={e} name={this.state.names[i]} />
          })}
        </div>
        <div style={styles.colorRow}>
          {this.state.urls.map((e, i) => {
            return <UnsplashPicture key={i} url={e} />
          })}
        </div>
      </div>
    )
  }
}

export default App
