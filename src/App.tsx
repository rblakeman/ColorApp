import { Component } from 'react';

import './App.css';
import ColorSquare from './components/color-square';
import InputField from './components/input-field';
import UnsplashPicture from './components/unsplash-picture';

const styles = {
    colorRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center',
    },
};

const API_ACCESS_KEY = import.meta.env.VITE_apiAccessKey;

// Return some shades if color api fetch fails
const defaultColors = {
    colors: [
        {
            hex: { value: '#000000' },
            name: { value: 'Black' },
        },
        {
            hex: { value: '#CC0000' },
            name: { value: 'Red' },
        },
        {
            hex: { value: '#00CC00' },
            name: { value: 'Green' },
        },
        {
            hex: { value: '#0000CC' },
            name: { value: 'Blue' },
        },
        {
            hex: { value: '#FFFFFF' },
            name: { value: 'White' },
        },
    ],
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};
type State = {
    colors: string[];
    names: string[];
    urls: string[];
};

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.colorAPI = this.colorAPI.bind(this);
        this.pictureAPI = this.pictureAPI.bind(this);
        this.colorAPI('12ab5f');

        console.log('last updated: Oct 19, 2025');
    }

    state = {
        colors: [],
        names: [],
        urls: ['', '', '', '', ''],
    };

    colorAPI(color: string) {
        this.setState({ urls: [] });
        fetch(
            `https://www.thecolorapi.com/scheme?hex=${color}&mode=quad&format=json`,
        )
            .then((response) => {
                if (!response.ok) {
                    console.log('Issue communicating with Color API');

                    return { ...defaultColors };
                }

                return response.json();
            })
            .then((data) => {
                const colors = data.colors.map(
                    (e: { hex: { value: string } }) => {
                        return e.hex.value;
                    },
                );
                const names = data.colors.map(
                    (e: { name: { value: string } }, i: number) => {
                        this.pictureAPI(e.name.value, i);

                        return e.name.value;
                    },
                );

                this.setState({ colors, names });
            });
    }

    pictureAPI(name: string, idx: number) {
        fetch(
            `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=${API_ACCESS_KEY}`,
        )
            .then((response) => {
                if (!response.ok) {
                    console.log(
                        'Issue communicating with Unsplash API, rate limited to 50 pictures per hour',
                    );

                    return { results: [] };
                }

                return response.json();
            })
            .then((data) => {
                if (data.results[0]) {
                    const url = data.results[0].urls.small;
                    const newURLs = this.state.urls;
                    newURLs[idx] = url;
                    this.setState({ urls: newURLs });
                }
            });
    }

    render() {
        return (
            <div className='App'>
                <InputField onInputSubmit={this.colorAPI} />
                <div style={styles.colorRow}>
                    {this.state.colors.map((e, i) => {
                        return (
                            <ColorSquare
                                key={i}
                                color={e}
                                name={this.state.names[i]}
                            />
                        );
                    })}
                </div>
                <div style={styles.colorRow}>
                    {this.state.urls.map((e, i) => {
                        return (
                            <UnsplashPicture
                                key={i}
                                url={e}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default App;
