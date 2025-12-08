// ===== DELIVERIES =====
// 50 Deliveries with status, address, customer, city, country, driverId, date
export const deliveries = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  status: ["pending", "in_transit", "delivered"][i % 3],
  address: `House ${i + 1}, Street ${i + 10}`,
  customer: `Customer ${i + 1}`,
  city: ["London", "New York", "Paris", "Berlin", "Tokyo"][i % 5],
  country: ["UK", "USA", "France", "Germany", "Japan"][i % 5],
  driverId: (i % 50) + 1,
  date: `2025-12-${String((i % 28) + 1).padStart(2, "0")}`
}));

// ===== DRIVERS =====
// 50 Drivers with name, vehicle, state, country, carModel, availability, experience, rating
export const drivers = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Driver ${i + 1}`,
  vehicle: ["Bike", "Car", "Van"][i % 3],
  state: ["California", "New York", "Bavaria", "Ile-de-France", "Tokyo Prefecture"][i % 5],
  country: ["USA", "USA", "Germany", "France", "Japan"][i % 5],
  carModel: ["Trek", "Volvo", "Tesla", "Ford", "Honda"][i % 5],
  availability: ["available", "busy"][i % 2],
  experience: (i % 15) + 1, // 1-15 years
  rating: Number((Math.random() * 5).toFixed(1)) // 0.0-5.0
}));

// ===== PARCELS =====
// 50 Parcels with weight, description, destinationHubId, deliveryId
export const parcels = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  weight: Number((Math.random() * 5).toFixed(1)),
  description: ["Electronics", "Books", "Clothes"][i % 3],
  destinationHubId: (i % 10) + 1,
  deliveryId: (i % 50) + 1
}));

// ===== HUBS =====
// 10 Hubs with city, country, capacity, region
export const hubs = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  city: ["London", "New York", "Paris", "Berlin", "Tokyo", "Rome", "Madrid", "Sydney", "Toronto", "Dubai"][i],
  country: ["UK", "USA", "France", "Germany", "Japan", "Italy", "Spain", "Australia", "Canada", "UAE"][i],
  capacity: (i + 1) * 50,
  region: ["Europe", "America", "Europe", "Europe", "Asia", "Europe", "Europe", "Australia", "America", "Middle East"][i]
}));
