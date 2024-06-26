import { get } from "lodash";

const prepareData = (filterParams) => {
  const { year, customerName } = filterParams;

  return (missions = []) => {
    //filter the space mission data based on filterparams   
    const filteredMissions = missions.reduce((acc, mission) => {
      const payloads = get(mission, "rocket.second_stage.payloads", []);
      
      if (mission.launch_year === `${year}` && payloads.length > 0) {
        const isCustomerMatch = payloads.find((payload) =>
          payload.customers.find((customer) => customer.includes(customerName))
        );
        //if match found add the space mission details
        if (isCustomerMatch) {
          acc.push({
            flight_number: mission.flight_number,
            mission_name: mission.mission_name,
            launch_date_utc: mission.launch_date_utc,
            payload_count: payloads.length,
          });
        }
      }
      return acc;
    }, []);
    filteredMissions.sort((a, b) => {
      // Sort by payload_count (descending) and then by launch_date_utc (descending)
      const payloadCountDiff = b.payload_count - a.payload_count;
      if (payloadCountDiff !== 0) {
        return payloadCountDiff;
      }
      return new Date(b.launch_date_utc) - new Date(a.launch_date_utc);
    });
    return filteredMissions; // Add return statement here to return filteredMissions
  };
};

export default prepareData;
