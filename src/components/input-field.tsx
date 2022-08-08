import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ColorIcon from '@material-ui/icons/ColorLensOutlined';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap' as 'wrap'
    },
    info: {
        display: 'inline',
        flexDirection: 'column' as 'column',
        minWidth: '242px',
        padding: 20
    },
    hrefs: {
        textDecoration: 'none',
        color: 'blue',
        whiteSpace: 'nowrap' as 'nowrap'
    },
    textField: {
        margin: 10
    },
    submitButton: {
        margin: 10
    }
};

type Props = {
    onInputSubmit: (value: string) => void;
};

export default function InputField(props: Props) {
    const [val, setVal] = useState('12ab5f');

    const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVal(event.target.value);
    };

    const submitChange = () => {
        props.onInputSubmit(val);
    };

    return (
        <div style={styles.container}>
            <ColorIcon
                style={{
                    width: '10%',
                    height: '10%',
                    minWidth: '75px',
                    minHeight: '75px'
                }} />
            <div style={styles.info}>
                {'Colors from: '}
                <a style={styles.hrefs} href="http://www.thecolorapi.com/">
                    The Color API
                </a>
                <br />
                {'Pictures from: '}
                <a style={styles.hrefs} href="https://unsplash.com/">
                    Unsplash API
                </a>
                <br />
                (Max requests of ~50 pictures/hr)
            </div>
            <TextField
                required={true}
                id="outlined-required"
                label="Hex Value"
                style={styles.textField}
                margin="normal"
                variant="outlined"
                onChange={inputChange}
                value={val} />
            <Button
                variant="contained"
                onClick={submitChange}
                style={styles.submitButton}>
            Submit
            </Button>
        </div>
    );
}
