import { useEffect, useState, useCallback } from "react";
import prepareData from "../utils/prepareData";
import axios from "axios";
import { SPACE_API_URL } from "../utils/constants";

const useSpaceMission = (filterParams) => {
// State variables using useState hook
  const [fetchMission, setFetchMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpaceList = useCallback(async () => {
    // Fetch data from SPACE_API_URL using Axios
    try {
      const response = await axios.get(SPACE_API_URL);
      const filteredMissions = prepareData(filterParams)(response.data);     
      setFetchMission(filteredMissions);
    } catch (err) {
      console.error("Error fetching missions:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    fetchSpaceList();
  }, [fetchSpaceList]);

  return { fetchMission, loading, error };
};

export default useSpaceMission;
