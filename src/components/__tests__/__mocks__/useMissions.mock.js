import { useState, useEffect } from 'react';

const useMissions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // Mocking fetch for demonstration, replace with actual fetch in production
    const mockMissions = [
      { flight_number: 62, mission_name: 'Iridium NEXT Mission 6', payloads_count: 2 },
      { flight_number: 72, mission_name: 'CRS-16', payloads_count: 1 },
      { flight_number: 64, mission_name: 'CRS-15', payloads_count: 1 },
      { flight_number: 60, mission_name: 'TESS', payloads_count: 1 },
      { flight_number: 59, mission_name: 'CRS-14', payloads_count: 1 }
    ];
    setMissions(mockMissions);
  }, []);

  return missions;
};

export default useMissions;
