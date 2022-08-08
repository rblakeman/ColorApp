import React from 'react';
import Card from '@material-ui/core/Card';

type Props = {
    color: string;
    name: string;
};

export default function ColorSquare(props: Props) {
    const reverse = (str: string): string => {
        if (str === '') {
            return '';
        }

        return reverse(str.substr(1)) + str.charAt(0);
    };

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
                backgroundColor: props.color,
                textAlign: 'center'
            }}>
            {props.name}
        </Card>
    );
}
