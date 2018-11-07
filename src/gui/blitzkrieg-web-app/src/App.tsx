import { Box, Grommet } from 'grommet';
import * as React from 'react';
import Body from './containers/Body/Body';
import Footer from './containers/Footer/Footer';
import Header from './containers/Header/Header';

export default class App extends React.Component {
  public render() {
    return (
      <Grommet full={true}>
        <Box fill={"true"}>
            <Header/>
            <Body/>
            <Footer/>
        </Box>
      </Grommet>
    );
  }
}