import express from "express";
import cors from "cors";
import { deliveries, drivers, parcels, hubs } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const AUTH_TOKEN = "testtoken123";

// Middleware: authentication check
app.use((req, res, next) => {
  if (req.path === "/auth/login") return next();
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Middleware: random error simulation for GET list endpoints
const randomError = (req, res, next) => {
  if (req.method === "GET" && Math.random() < 0.1) {
    return res.status(500).json({ error: "Random simulated error" });
  }
  next();
};

app.use(randomError);

// Pagination helper
const paginate = (arr, page = 1, limit = 10) => {
  const p = Number(page);
  const l = Number(limit);
  const start = (p - 1) * l;
  return arr.slice(start, start + l);
};

// ===== AUTH =====
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    return res.json({ token: AUTH_TOKEN, user: "mock-user" });
  }
  res.status(400).json({ error: "Missing username or password" });
});

// ===== DELIVERIES =====
app.get("/deliveries", (req, res) => {
  let data = deliveries;
  const { page = 1, limit = 10, status, city, country } = req.query;
  if (status) data = data.filter(d => d.status === status);
  if (city) data = data.filter(d => d.city === city);
  if (country) data = data.filter(d => d.country === country);
  res.json({ page: Number(page), limit: Number(limit), total: data.length, results: paginate(data, page, limit) });
});

app.get("/deliveries/:id", (req, res) => {
  res.json(deliveries.find(d => d.id == req.params.id) || {});
});

app.get("/deliveries/status/:status", (req, res) => {
  res.json(deliveries.filter(d => d.status === req.params.status));
});

app.get("/deliveries/city/:city", (req, res) => {
  res.json(deliveries.filter(d => d.city === req.params.city));
});

app.get("/deliveries/country/:country", (req, res) => {
  res.json(deliveries.filter(d => d.country === req.params.country));
});

app.get("/deliveries/customer/:customer", (req, res) => {
  res.json(deliveries.filter(d => d.customer === req.params.customer));
});

app.get("/deliveries/date/:date", (req, res) => {
  res.json(deliveries.filter(d => d.date === req.params.date));
});

app.get("/deliveries/range/:start/:end", (req, res) => {
  const { start, end } = req.params;
  res.json(deliveries.filter(d => d.date >= start && d.date <= end));
});

app.post("/deliveries", (req, res) => res.json({ success: true }));
app.patch("/deliveries/:id", (req, res) => res.json({ success: true }));
app.delete("/deliveries/:id", (req, res) => res.json({ success: true }));

// ===== DRIVERS =====
app.get("/drivers", (req, res) => {
  let data = drivers;
  const { page = 1, limit = 10, vehicle, state, country, carModel } = req.query;
  if (vehicle) data = data.filter(d => d.vehicle === vehicle);
  if (state) data = data.filter(d => d.state === state);
  if (country) data = data.filter(d => d.country === country);
  if (carModel) data = data.filter(d => d.carModel === carModel);
  res.json({ page: Number(page), limit: Number(limit), total: data.length, results: paginate(data, page, limit) });
});

app.get("/drivers/:id", (req, res) => {
  res.json(drivers.find(d => d.id == req.params.id) || {});
});

app.get("/drivers/state/:state", (req, res) => {
  res.json(drivers.filter(d => d.state === req.params.state));
});

app.get("/drivers/country/:country", (req, res) => {
  res.json(drivers.filter(d => d.country === req.params.country));
});

app.get("/drivers/vehicle/:vehicle", (req, res) => {
  res.json(drivers.filter(d => d.vehicle === req.params.vehicle));
});

app.get("/drivers/car/:carModel", (req, res) => {
  res.json(drivers.filter(d => d.carModel === req.params.carModel));
});

app.get("/drivers/availability/:status", (req, res) => {
  res.json(drivers.filter(d => d.availability === req.params.status));
});

app.get("/drivers/experience/:years", (req, res) => {
  res.json(drivers.filter(d => d.experience >= req.params.years));
});

app.get("/drivers/rating/:min", (req, res) => {
  res.json(drivers.filter(d => d.rating >= req.params.min));
});

app.post("/drivers", (req, res) => res.json({ success: true }));
app.patch("/drivers/:id", (req, res) => res.json({ success: true }));
app.delete("/drivers/:id", (req, res) => res.json({ success: true }));

// ===== PARCELS =====
app.get("/parcels", (req, res) => {
  let data = parcels;
  const { page = 1, limit = 10, description, weightMin, weightMax } = req.query;
  if (description) data = data.filter(p => p.description === description);
  if (weightMin) data = data.filter(p => p.weight >= Number(weightMin));
  if (weightMax) data = data.filter(p => p.weight <= Number(weightMax));
  res.json({ page: Number(page), limit: Number(limit), total: data.length, results: paginate(data, page, limit) });
});

app.get("/parcels/:id", (req, res) => res.json(parcels.find(p => p.id == req.params.id) || {}));
app.get("/parcels/description/:description", (req, res) => res.json(parcels.filter(p => p.description === req.params.description)));
app.get("/parcels/weight/min/:min/max/:max", (req, res) => res.json(parcels.filter(p => p.weight >= req.params.min && p.weight <= req.params.max)));
app.get("/parcels/weight/min/:min", (req, res) => res.json(parcels.filter(p => p.weight >= req.params.min)));
app.get("/parcels/weight/max/:max", (req, res) => res.json(parcels.filter(p => p.weight <= req.params.max)));
app.get("/parcels/delivery/:deliveryId", (req, res) => res.json(parcels.filter(p => p.deliveryId == req.params.deliveryId)));
app.get("/parcels/hub/:hubId", (req, res) => res.json(parcels.filter(p => p.destinationHubId == req.params.hubId)));

app.post("/parcels", (req, res) => res.json({ success: true }));
app.patch("/parcels/:id", (req, res) => res.json({ success: true }));
app.delete("/parcels/:id", (req, res) => res.json({ success: true }));

// ===== HUBS =====
app.get("/hubs", (req, res) => {
  let data = hubs;
  const { page = 1, limit = 10, city, country, capacityMin, capacityMax, region } = req.query;
  if (city) data = data.filter(h => h.city === city);
  if (country) data = data.filter(h => h.country === country);
  if (capacityMin) data = data.filter(h => h.capacity >= Number(capacityMin));
  if (capacityMax) data = data.filter(h => h.capacity <= Number(capacityMax));
  if (region) data = data.filter(h => h.region === region);
  res.json({ page: Number(page), limit: Number(limit), total: data.length, results: paginate(data, page, limit) });
});

app.get("/hubs/:id", (req, res) => res.json(hubs.find(h => h.id == req.params.id) || {}));
app.get("/hubs/city/:city", (req, res) => res.json(hubs.filter(h => h.city === req.params.city)));
app.get("/hubs/country/:country", (req, res) => res.json(hubs.filter(h => h.country === req.params.country)));
app.get("/hubs/capacity/min/:min/max/:max", (req, res) => res.json(hubs.filter(h => h.capacity >= req.params.min && h.capacity <= req.params.max)));

app.post("/hubs", (req, res) => res.json({ success: true }));
app.patch("/hubs/:id", (req, res) => res.json({ success: true }));
app.delete("/hubs/:id", (req, res) => res.json({ success: true }));

// ===== REPORTS =====
app.get("/reports/deliveries/status", (req, res) => {
  const report = deliveries.reduce((acc, d) => { acc[d.status] = (acc[d.status] || 0) + 1; return acc; }, {});
  res.json(report);
});

app.get("/reports/drivers/vehicle", (req, res) => {
  const report = drivers.reduce((acc, d) => { acc[d.vehicle] = (acc[d.vehicle] || 0) + 1; return acc; }, {});
  res.json(report);
});

app.get("/reports/parcels/type", (req, res) => {
  const report = parcels.reduce((acc, p) => { acc[p.description] = (acc[p.description] || 0) + 1; return acc; }, {});
  res.json(report);
});

app.get("/reports/hubs/capacity", (req, res) => {
  const report = hubs.map(h => ({ id: h.id, capacity: h.capacity }));
  res.json(report);
});

// ===== ASSIGNMENTS =====
app.post("/assignments/delivery/:deliveryId/driver/:driverId", (req, res) => res.json({ success: true }));
app.get("/assignments/driver/:driverId", (req, res) => res.json(deliveries.filter(d => d.driverId == req.params.driverId)));
app.get("/assignments/hub/:hubId", (req, res) => res.json(parcels.filter(p => p.destinationHubId == req.params.hubId)));

// ===== TRACKING =====
app.get("/tracking/delivery/:deliveryId", (req, res) => res.json({ deliveryId: req.params.deliveryId, status: "in_transit" }));
app.get("/tracking/parcel/:parcelId", (req, res) => res.json({ parcelId: req.params.parcelId, location: "Hub 3" }));

app.listen(PORT, () => console.log(`Mock Delivery API running on port ${PORT}`));
