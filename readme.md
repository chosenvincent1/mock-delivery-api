# Mock Delivery API

A **Node.js + Express** mock API for testing, learning, and API documentation practice.

* Uses static data (no database)
* All write operations (`POST`, `PATCH`, `DELETE`) **return success** but do not persist
* Supports **pagination**, **filters**, **tracking**, **reports**, **assignments**

Server runs on:

```
http://localhost:4000
```

Authentication:

```
Authorization: Bearer testtoken123
```

---

# Getting Started

```bash
npm install
npm start
```

---

# Random Error Simulation

GET list endpoints (`/deliveries`, `/drivers`, `/parcels`, `/hubs`) have a **10% chance** to return:

```json
{ "error": "Random simulated error" }
```

---

# 📄 Pagination

All list endpoints support query parameters:

| Query | Default | Description    |
| ----- | ------- | -------------- |
| page  | 1       | Page number    |
| limit | 10      | Items per page |

---

# Endpoints Overview

Below is a **complete list of 70+ endpoints**, grouped by category, including **POST examples**.

---

## 1 Authentication

1. **POST /auth/login** – login and get token

**Sample Request**

```json
{
  "username": "demo",
  "password": "password123"
}
```

**Response**

```json
{
  "token": "testtoken123",
  "user": "mock-user"
}
```

---

## 2 Deliveries

2. **GET /deliveries** – list deliveries (supports `status`, `city`, `country`)
3. **GET /deliveries/:id** – get single delivery
4. **POST /deliveries** – create delivery

**Sample Request**

```json
{
  "status": "pending",
  "address": "22 Hill View Estate",
  "customer": "Mary James",
  "parcelId": 12,
  "driverId": 3,
  "city": "London",
  "country": "UK",
  "date": "2025-12-07"
}
```

5. **PATCH /deliveries/:id** – update delivery
6. **DELETE /deliveries/:id** – delete delivery
7. **GET /deliveries/status/:status** – filter by status
8. **GET /deliveries/city/:city** – filter by city
9. **GET /deliveries/country/:country** – filter by country
10. **GET /deliveries/customer/:customer** – filter by customer
11. **GET /deliveries/date/:date** – filter by date
12. **GET /deliveries/range/:start/:end** – filter by date range

---

## 3 Drivers

13. **GET /drivers** – list drivers (supports `vehicle`, `state`, `country`, `carModel`)
14. **GET /drivers/:id** – get single driver
15. **POST /drivers** – add driver

**Sample Request**

```json
{
  "name": "David Okoro",
  "vehicle": "Bike",
  "carModel": "Volvo",
  "state": "California",
  "country": "USA",
  "availability": "available",
  "experience": 5,
  "rating": 4.7
}
```

16. **PATCH /drivers/:id** – update driver
17. **DELETE /drivers/:id** – delete driver
18. **GET /drivers/state/:state** – filter by state
19. **GET /drivers/country/:country** – filter by country
20. **GET /drivers/vehicle/:vehicle** – filter by vehicle
21. **GET /drivers/car/:carModel** – filter by car model
22. **GET /drivers/availability/:status** – filter by availability
23. **GET /drivers/experience/:years** – filter by experience
24. **GET /drivers/rating/:min** – filter by rating

---

## 4 Parcels

25. **GET /parcels** – list parcels (supports `description`, `weightMin`, `weightMax`)
26. **GET /parcels/:id** – get single parcel
27. **POST /parcels** – create parcel

**Sample Request**

```json
{
  "weight": 3.5,
  "description": "Laptop Accessories",
  "deliveryId": 10,
  "destinationHubId": 4
}
```

28. **PATCH /parcels/:id** – update parcel
29. **DELETE /parcels/:id** – delete parcel
30. **GET /parcels/description/:description** – filter by description
31. **GET /parcels/weight/min/:min/max/:max** – filter by weight range
32. **GET /parcels/weight/min/:min** – filter by min weight
33. **GET /parcels/weight/max/:max** – filter by max weight
34. **GET /parcels/delivery/:deliveryId** – filter by delivery
35. **GET /parcels/hub/:hubId** – filter by destination hub

---

## 5 Hubs

36. **GET /hubs** – list hubs (supports `city`, `country`, `capacityMin`, `capacityMax`, `region`)
37. **GET /hubs/:id** – get single hub
38. **POST /hubs** – create hub

**Sample Request**

```json
{
  "city": "Manchester",
  "country": "UK",
  "capacity": 200,
  "region": "Northwest"
}
```

39. **PATCH /hubs/:id** – update hub
40. **DELETE /hubs/:id** – delete hub
41. **GET /hubs/city/:city** – filter by city
42. **GET /hubs/country/:country** – filter by country
43. **GET /hubs/capacity/min/:min/max/:max** – filter by capacity range

---

## 6 Reports

44. **GET /reports/deliveries/status** – count deliveries by status
45. **GET /reports/drivers/vehicle** – count drivers by vehicle
46. **GET /reports/parcels/type** – count parcels by type
47. **GET /reports/hubs/capacity** – list hub capacities

---

## 7 Assignments

48. **POST /assignments/delivery/:deliveryId/driver/:driverId** – assign driver to delivery
49. **GET /assignments/driver/:driverId** – get deliveries assigned to driver
50. **GET /assignments/hub/:hubId** – get parcels assigned to hub

---

## 8 Tracking

51. **GET /tracking/delivery/:deliveryId** – delivery tracking
52. **GET /tracking/parcel/:parcelId** – parcel tracking

---

# 📄 Example cURL Commands

```bash
# Login
curl -X POST http://localhost:4000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"username":"demo","password":"password123"}'

# Create a delivery
curl -X POST http://localhost:4000/deliveries \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer testtoken123" \
 -d '{"status":"pending","address":"22 Hill View Estate","customer":"Mary James","parcelId":12,"driverId":3,"city":"London","country":"UK","date":"2025-12-07"}'

# Add a driver
curl -X POST http://localhost:4000/drivers \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer testtoken123" \
 -d '{"name":"David Okoro","vehicle":"Bike","carModel":"Volvo","state":"California","country":"USA","availability":"available","experience":5,"rating":4.7}'

# Add a parcel
curl -X POST http://localhost:4000/parcels \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer testtoken123" \
 -d '{"weight":3.5,"description":"Laptop Accessories","deliveryId":10,"destinationHubId":4}'

# Add a hub
curl -X POST http://localhost:4000/hubs \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer testtoken123" \
 -d '{"city":"Manchester","country":"UK","capacity":200,"region":"Northwest"}'

# Assign driver
curl -X POST http://localhost:4000/assignments/delivery/10/driver/3 \
 -H "Authorization: Bearer testtoken123"
```

---

# ✅ Notes

* All POST/PATCH/DELETE endpoints **always return success**
* No data is stored — everything resets on server restart
* Supports **filters, pagination, random errors, reports, assignments, and tracking**

---

This lists **all endpoints** (70+ when counting filter GETs) with **POST examples** included.

