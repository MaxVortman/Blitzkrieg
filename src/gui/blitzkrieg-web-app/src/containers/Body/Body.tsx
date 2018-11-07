import { Box, FormField, Heading, Select, TextInput } from 'grommet';
import * as React from 'react';

export default class Body extends React.Component {
    public render() {
        return (
            <Box flex={"true"} pad='medium' overflow='auto'>
                <Box flex={"false"}>
                    <Heading level={"3"} margin='none'>
                        <strong>User Information</strong>
                    </Heading>
                    <Box pad={{ top: 'medium' }} gap='small'>
                        <FormField
                            label='Name'
                            htmlFor='name-input'
                        >
                            <TextInput
                                id='name-input'
                                placeholder='Enter your name'
                            />
                        </FormField>
                        <FormField
                            label='Street'
                            htmlFor='street-input'
                        >
                            <TextInput
                                id='street-input'
                                placeholder='Enter your street'
                            />
                        </FormField>
                        <Box direction='row' gap='small'>
                            <FormField
                                label='City'
                                htmlFor='city-input'
                            >
                                <TextInput
                                    id='city-input'
                                    placeholder='Enter your city'
                                />
                            </FormField>
                            <FormField
                                label='State'
                                htmlFor='state-input'
                            >
                                <Select
                                    placeholder='Select your state'
                                    options={['CA', 'FL', 'OR']}
                                />
                            </FormField>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}