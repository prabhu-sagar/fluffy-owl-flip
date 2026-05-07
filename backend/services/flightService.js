export const getFlightRoutes = async (source, destination, date) => {
  // Mock implementation - replace with real API call (e.g., Amadeus, Skyscanner)
  return [
    { id: 'f1', mode: 'flight', from: source, to: destination, cost: 4500, duration: 120 }
  ];
};