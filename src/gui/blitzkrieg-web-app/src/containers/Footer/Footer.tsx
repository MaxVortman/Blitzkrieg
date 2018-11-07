import { Box, Button } from 'grommet';
import * as React from 'react';

export default class Footer extends React.Component {
    public render() {
        return (
            <Box
                tag='footer'
                direction='row'
                justify='end'
                pad='medium'
                border={{ side: 'top' }}
                gap='small'
                flex={"false"}
            >
                <Button label='Cancel' color='border' />
                <Button label='Add' primary={true} />
            </Box>
        );
    }
}