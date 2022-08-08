import React from 'react';
import Card from '@material-ui/core/Card';

type Props = {
    url: string;
};

export default function UnsplashPicture(props: Props) {
    return (
        <Card
            style={{
                width: 250,
                height: 250
            }}>
            <img
                src={props.url}
                alt='Issue communicating with Unsplash API, likely hit the rate limit of 50 pictures per hour' />
        </Card>
    );
}
