// Cost of living adjustment factors relative to San Francisco (1.0)
export const cities = [
  { name: 'San Francisco', factor: 1.0 },
  { name: 'New York', factor: 0.95 },
  { name: 'Seattle', factor: 0.85 },
  { name: 'Los Angeles', factor: 0.85 },
  { name: 'Boston', factor: 0.82 },
  { name: 'Washington DC', factor: 0.80 },
  { name: 'Chicago', factor: 0.75 },
  { name: 'Austin', factor: 0.72 },
  { name: 'Denver', factor: 0.70 },
  { name: 'Philadelphia', factor: 0.70 },
  { name: 'Portland', factor: 0.70 },
  { name: 'Miami', factor: 0.68 },
  { name: 'Atlanta', factor: 0.65 },
  { name: 'Phoenix', factor: 0.65 },
  { name: 'Dallas', factor: 0.65 },
  { name: 'Houston', factor: 0.65 },
].sort((a, b) => a.name.localeCompare(b.name));