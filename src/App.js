import React, { Component } from 'react';
import './App.css';

import InputField from './components/input-field';
import ColorSquare from './components/color-square';
import UnsplashPicture from './components/unsplash-picture';

const styles = {
    colorRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
};

const API_ACCESS_KEY = process.env.REACT_APP_apiAccessKey;

// Return some shades if color api fetch fails
const defaultColors = {
    'colors': [
        {
            'hex': { 'value': '#000000' },
            'name': { 'value': 'Black' }
        },
        {
            'hex': { 'value': '#CC0000' },
            'name': { 'value': 'Red' }
        },
        {
            'hex': { 'value': '#00CC00' },
            'name': { 'value': 'Green' }
        },
        {
            'hex': { 'value': '#0000CC' },
            'name': { 'value': 'Blue' }
        },
        {
            'hex': { 'value': '#FFFFFF' },
            'name': { 'value': 'White' }
        }
    ]
};

class App extends Component {
    constructor(props) {
        super(props);
        this.colorAPI = this.colorAPI.bind(this);
        this.pictureAPI = this.pictureAPI.bind(this);
        this.colorAPI('12ab5f');
    }

    state = {
        colors: [],
        names: [],
        urls: ['', '', '', '', '']
    };

    colorAPI(color) {
        this.setState({ urls: [] });
        fetch(
            `https://www.thecolorapi.com/scheme?hex=${color}&mode=quad&format=json`
        )
            .then((response) => {
                if (!response.ok) {
                    console.log('Issue communicating with Color API');

                    return { ...defaultColors };
                }

                return response.json();
            })
            .then((data) => {
                const colors = data.colors.map((e) => {
                    return e.hex.value;
                });
                const names = data.colors.map((e, i) => {
                    this.pictureAPI(e.name.value, i);

                    return e.name.value;
                });

                this.setState({ colors, names });
            });
    }

    pictureAPI(name, idx) {
        fetch(
            `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=${API_ACCESS_KEY}`
        )
            .then((response) => {
                if (!response.ok) {
                    console.log('Issue communicating with Unsplash API, rate limited to 50 pictures per hour');

                    return { results: [] };
                }

                return response.json();
            })
            .then((data) => {
                if (data.results[0]) {
                    const url = data.results[0].urls.small;
                    let newURLs = this.state.urls;
                    newURLs[idx] = url;
                    this.setState({ urls: newURLs });
                }
            });
    }

    render() {
        return (
            <div className="App">
                <InputField onInputSubmit={this.colorAPI} />
                <div style={styles.colorRow}>
                    {this.state.colors.map((e, i) => {
                        return <ColorSquare key={i} color={e} name={this.state.names[i]} />;
                    })}
                </div>
                <div style={styles.colorRow}>
                    {this.state.urls.map((e, i) => {
                        return <UnsplashPicture key={i} url={e} />;
                    })}
                </div>
            </div>
        );
    }
}

export default App;
