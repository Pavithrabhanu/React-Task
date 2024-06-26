import useSpaceMission from "../hooks/useSpaceMission";
import PropTypes from "prop-types";
import { useEffect } from "react";
const RocketList = ({ filterParams }) => {
  const { fetchMission, loading, error } = useSpaceMission(filterParams);
  useEffect(() => {
     // Effect runs when fetchMission changes
  }, [fetchMission]);
   // Conditional rendering based on loading state
  if (loading) {
    return <div className="missionLoad">Loading</div>;
  }
  // Conditional rendering when there are no missions fetched
  if (!fetchMission || fetchMission.length === 0) {
    return <div className="missionLoad">No data</div>;
  }
  // Conditional rendering when there is an error in fetching data
  if (error) return <p>Error: {error.message}</p>;

  //To Render a component list
  return (
    <div className="missionlist">
      <div className="mission-header">List Of Missions</div>
      <ul>
        {fetchMission.map((mission) => (
          <li key={mission.flight_number}>
            <span className="mission-number">#{mission.flight_number}</span>
            <span className="mission-name">{mission.mission_name}</span>
            <span className="mission-count">({mission.payload_count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
RocketList.propTypes = {
  filterParams: PropTypes.object.isRequired,
};
export default RocketList;
