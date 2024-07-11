import React from 'react';
import LaunchItem from './LaunchItem';

const LaunchList = ({ launches }) => {
  return (
    <div className="launch-list">
      {launches.map(launch => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </div>
  );
};

export default LaunchList;
