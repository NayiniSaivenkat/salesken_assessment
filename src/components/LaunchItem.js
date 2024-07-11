import React from 'react';

const LaunchItem = ({ launch }) => {
  return (
    <div className="launch-item">
      <img src={launch.links.mission_patch_small} alt={launch.mission_name} />
      <h2>{launch.mission_name}</h2>
      <p>{new Date(launch.launch_date_local).toLocaleDateString()}</p>
      <p>{launch.rocket.rocket_name}</p>
      <p>{launch.launch_site.site_name}</p>
    </div>
  );
};

export default LaunchItem;
