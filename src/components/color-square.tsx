import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

export default class ColorSquare extends Component {
    reverse(str) {
        if (str === '') {
            return '';
        }

        return this.reverse(str.substr(1)) + str.charAt(0);
    }

    render() {
        // let hex = this.props.color.substr(1)
        // // hex = this.reverse(hex)
        // hex = hex[4] + hex[5] + hex[2] + hex[3] + hex[0] + hex[1]
        // hex = '#' + hex

        return (
            <Card
                style={{
                    width: 250,
                    height: 100,
                    color: 'white',
                    backgroundColor: this.props.color,
                    textAlign: 'center'
                }}>
                {this.props.name}
            </Card>
        );
    }
}
