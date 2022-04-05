import React from 'react';
import { Fragment } from 'react';
import NavBar from '../NavBar'
import SnowflakeCalculator from '../SnowflakeCalculator'


class AppWrapper extends React.Component {
  public render() {
    return (
      <Fragment>
      <NavBar></NavBar>    
      <SnowflakeCalculator></SnowflakeCalculator>
      </Fragment>
    );
  }

}

export default AppWrapper;

 