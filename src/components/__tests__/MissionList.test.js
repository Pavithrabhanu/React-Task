import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MissionsList from 'MissionList';
import useMissions from 'useMissions';

// Mock the useMissions hook
jest.mock('useMissions');
// To simulate the initial Loading state
test('renders loading state initially', () => {
  useMissions.mockReturnValue({
    missions: [],
    loading: true,
  });
// To render the mission list
  render(<MissionsList />);
// To check whether the Loading text is displayed
  expect(screen.getByText('Loading')).toBeInTheDocument();
});
// To simulate the No data state
test('renders no missions available when there are no missions', () => {
  useMissions.mockReturnValue({
    missions: [],
    loading: false,
  });

  render(<MissionsList />);

  expect(screen.getByText('No data')).toBeInTheDocument();
});

test('renders missions with correct format', () => {
  // Mock the missions list
  useMissions.mockReturnValue({
    missions: [
      { flight_number: 62, mission_name: 'Iridium NEXT Mission 6', payloads_count: 2 },
      { flight_number: 72, mission_name: 'CRS-16', payloads_count: 1 },
      { flight_number: 64, mission_name: 'CRS-15', payloads_count: 1 },
      { flight_number: 60, mission_name: 'TESS', payloads_count: 1 },
      { flight_number: 59, mission_name: 'CRS-14', payloads_count: 1 }
    ],
    loading: false,
  });

  render(<MissionsList />);
// Expected list format
  const expectedMissions = [
    "#62 Iridium NEXT Mission 6 (2)",
    "#72 CRS-16 (1)",
    "#64 CRS-15 (1)",
    "#60 TESS (1)",
    "#59 CRS-14 (1)"
  ];
// To check excepted mission format is displayed  
  expectedMissions.forEach(mission => {
    expect(screen.getByText(mission)).toBeInTheDocument();
  });
});

test('renders the correct number of missions', () => {
  useMissions.mockReturnValue({
    missions: [
      { flight_number: 62, mission_name: 'Iridium NEXT Mission 6', payloads_count: 2 },
      { flight_number: 72, mission_name: 'CRS-16', payloads_count: 1 },
      { flight_number: 64, mission_name: 'CRS-15', payloads_count: 1 },
      { flight_number: 60, mission_name: 'TESS', payloads_count: 1 },
      { flight_number: 59, mission_name: 'CRS-14', payloads_count: 1 }
    ],
    loading: false,
  });

  render(<MissionsList />);
 // To find all elements matching the machine format
  const missionElements = screen.getAllByText(/#\d+ .+ \(\d+\)/);
  //To check the number of rendered mission list
  expect(missionElements.length).toBe(5);
});
