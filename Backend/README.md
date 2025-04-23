<!-- filepath: /c:/Users/tushar/Desktop/MERN/PROJECTS(MERN)/Uber_clone/Backend/README.md -->

# User Registration Endpoint

## Endpoint

**POST /users/register**

## Description

This endpoint allows a new user to register by providing their first name, optional last name, email, and password. On success, the endpoint returns an authentication token along with the newly created user object (password omitted).

## Request Data

- **fullname.firstname** (string, required): Must be at least 3 characters long.
- **fullname.lastname** (string, optional): If provided, should be at least 3 characters long.
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

**Example:**

### Example Response

**Endpoint:** `POST /api/users/register`

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1b2c3d4e5f67890123456",
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "__v": 0
  }
}
```

# User Profile Endpoint

## Endpoint

**GET /users/profile**

## Description

This endpoint retrieves the profile of the currently authenticated user. The user must be logged in and provide a valid authentication token.

## Request Headers

- **Authorization** (string, required): Bearer token or cookie containing the authentication token.

## Example Response

**Endpoint:** `GET /users/profile`

**Response:**

```json
{
  "user": {
    "_id": "64f1b2c3d4e5f67890123456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "socketId": null
  }
}
```

---

# User Logout Endpoint

## Endpoint

**GET /users/logout**

## Description

This endpoint logs out the currently authenticated user by clearing the authentication token and blacklisting it to prevent reuse.

## Request Headers

- **Authorization** (string, required): Bearer token or cookie containing the authentication token.

## Example Response

**Endpoint:** `GET /users/logout`

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

# Captain Routes

## Captain Registration Endpoint

### Endpoint

**POST /captains/register**

### Description

This endpoint allows a new captain to register by providing their first name, optional last name, email, password, and vehicle details. On success, the endpoint returns an authentication token along with the newly created captain object (password omitted).

### Request Data

- **fullname.firstname** (string, required): Must be at least 3 characters long.
- **fullname.lastname** (string, optional): If provided, should be at least 3 characters long.
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 8 characters long.
- **vehicle.color** (string, required): Must be at least 3 characters long.
- **vehicle.plate** (string, required): Must be at least 3 characters long.
- **vehicle.capacity** (number, required): Must be a valid number and at least 1.
- **vehicle.vehicleType** (string, required): Must be one of the following: `car`, `motorcycle`, or `auto`.

### Example Request

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "janedoe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response

**Endpoint:** `POST /captains/register`

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f1b2c3d4e5f67890123456",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "__v": 0
  }
}
```

---

## Captain Login Endpoint

### Endpoint

**POST /captains/login**

### Description

This endpoint allows a captain to log in by providing their email and password. On success, the endpoint returns an authentication token and the captain's details.

### Request Data

- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

### Example Request

```json
{
  "email": "janedoe@example.com",
  "password": "securepassword"
}
```

### Example Response

**Endpoint:** `POST /captains/login`

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f1b2c3d4e5f67890123456",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "__v": 0
  }
}
```

---

## Captain Profile Endpoint

### Endpoint

**GET /captains/profile**

### Description

This endpoint retrieves the profile of the currently authenticated captain. The captain must be logged in and provide a valid authentication token.

### Request Headers

- **Authorization** (string, required): Bearer token or cookie containing the authentication token.

### Example Response

**Endpoint:** `GET /captains/profile`

**Response:**

```json
{
  "captain": {
    "_id": "64f1b2c3d4e5f67890123456",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

---

## Captain Logout Endpoint

### Endpoint

**GET /captains/logout**

### Description

This endpoint logs out the currently authenticated captain by clearing the authentication token and blacklisting it to prevent reuse.

### Request Headers

- **Authorization** (string, required): Bearer token or cookie containing the authentication token.

### Example Response

**Endpoint:** `GET /captains/logout`

**Response:**

```json
{
  "message": "Logout successfully"
}
```
