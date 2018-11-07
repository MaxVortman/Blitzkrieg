import { Box, Heading, Menu } from 'grommet';
import * as React from 'react';

export default class Header extends React.Component {
    public render() {
        return (
            <Box
                tag='header'
                background='brand'
                pad='small'
                elevation='small'
                justify='between'
                direction='row'
                align='center'
                flex={"false"}
            >
                <Heading level={"3"} margin='none' color='white'>
                    <strong>My App</strong>
                </Heading>
                <Menu
                    dropAlign={{ top: 'top', right: 'right', bottom: 'top', left: 'left' }}
                    items={[{ label: 'Logout', href: '#' }]}
                    />
            </Box>
        );
    }
}