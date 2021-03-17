import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ColorIcon from '@material-ui/icons/ColorLensOutlined'
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  info: {
    display: 'inline',
    flexDirection: 'column',
    minWidth: '242px',
    padding: 20
  },
  hrefs: {
    textDecoration: 'none',
    color: 'blue',
    whiteSpace: 'nowrap'
  },
  textField: {
    margin: 10
  },
  submitButton: {
    margin: 10
  }
}

export default class InputField extends Component {
  state = {
    val: '12ab5f'
  }

  inputChange = (event) => {
    this.setState({ val: event.target.value })
  }

  submitChange = (e) => {
    this.props.onInputSubmit(this.state.val)
  }

  render() {
    return (
      <div style={styles.container}>
        <ColorIcon
          style={{
            width: '10%',
            height: '10%',
            minWidth: '75px',
            minHeight: '75px'
          }}
        />
        <div style={styles.info}>
          Colors from:{' '}
          <a style={styles.hrefs} href="http://www.thecolorapi.com/">
            The Color API
          </a>{' '}
          <br />
          Pictures from:{' '}
          <a style={styles.hrefs} href="https://unsplash.com/">
            Unsplash API
          </a>{' '}
          <br />
          Max requests of ~50 pictures/hr
        </div>
        <TextField
          required={true}
          id="outlined-required"
          label="Hex Value"
          style={styles.textField}
          margin="normal"
          variant="outlined"
          onChange={this.inputChange}
          value={this.state.val}
        />
        <Button
          variant="contained"
          onClick={this.submitChange}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </div>
    )
  }
}
