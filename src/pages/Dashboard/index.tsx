import React from 'react';
import NavBar from '../../components/NavBar';
import SnowflakeCalculator from '../../components/SnowflakeCalculator';

class Dashboard extends React.Component {
  public render() {
    return (
      <>
        <NavBar/>
        <SnowflakeCalculator/>
      </>
    );
  }
}

export default Dashboard;
