import React from 'react';
import useMissions from './useMissions.mock';

const MissionsList = () => {
  const { missions, loading } = useMissions();

  if (loading) {
    return <p>Loading</p>;
  }

  if (missions.length === 0) {
    return <p>No data</p>;
  }

  return (
    <div>
      {missions.map((mission, index) => (
        <p key={index}>
          #{mission.flight_number} {mission.mission_name} ({mission.payloads_count})
        </p>
      ))}
    </div>
  );
};

export default MissionsList;
