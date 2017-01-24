import React from 'react';
import {TeamsList} from '../';
import {WeeksTabs} from '../';
import {PicksByWeek} from '../';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const PicksHome = () => {
  const style = require('./PicksHome.scss');
  return (
    <div className={style.picksHome + ' container'}>
      <h2 className={style}>My Picks</h2>
      <Row>
        <Col sm={8} lg={9} key="WeeksTabs">
          <WeeksTabs />
        </Col>
        <Col sm={4} lg={3} key="PicksByWeek">
          <PicksByWeek />
        </Col>
      </Row>
      <TeamsList />
    </div>
  );
};

export default PicksHome;
