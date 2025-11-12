# API Documentation

Great White Hope REST API documentation.

---

## Base URL

```
https://your-backend-domain.railway.app
```

---

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <jwt-token>
```

---

## Endpoints

### Health Check

```http
GET /health
```

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600
}
```

### Products

#### List Products

```http
GET /api/v1/products
```

**Query Parameters**:
- `category`: Filter by category
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "sku": "CONC-001",
      "name": "Premium Live Resin",
      "price": 4500,
      "category": "Concentrates",
      "description": "High-quality live resin THCA concentrate",
      "image": "https://...",
      "stock": 100
    }
  ],
  "total": 25,
  "page": 1,
  "pages": 2
}
```

#### Get Product

```http
GET /api/v1/products/:id
```

**Response**:
```json
{
  "id": 1,
  "sku": "CONC-001",
  "name": "Premium Live Resin",
  "price": 4500,
  "category": "Concentrates",
  "description": "High-quality live resin THCA concentrate",
  "image": "https://...",
  "stock": 100,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Orders

#### Create Order

```http
POST /api/v1/orders
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 4500
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "paymentMethod": "stripe",
  "paymentToken": "tok_visa"
}
```

**Response**:
```json
{
  "id": "ORD-001",
  "userId": 1,
  "items": [...],
  "subtotal": 9000,
  "tax": 900,
  "shipping": 0,
  "total": 9900,
  "status": "pending",
  "paymentMethod": "stripe",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get Order

```http
GET /api/v1/orders/:id
Authorization: Bearer <jwt-token>
```

#### List Orders

```http
GET /api/v1/orders
Authorization: Bearer <jwt-token>
```

### Users

#### Get Current User

```http
GET /api/v1/users/me
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile

```http
PUT /api/v1/users/me
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Admin Endpoints

#### List Products (Admin)

```http
GET /api/v1/admin/products
Authorization: Bearer <admin-jwt-token>
```

#### Create Product

```http
POST /api/v1/admin/products
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "sku": "NEW-001",
  "name": "New Product",
  "price": 5000,
  "category": "Concentrates",
  "description": "Product description",
  "image": "https://...",
  "stock": 50
}
```

#### Update Product

```http
PUT /api/v1/admin/products/:id
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
```

#### Delete Product

```http
DELETE /api/v1/admin/products/:id
Authorization: Bearer <admin-jwt-token>
```

### Payment Webhooks

#### Stripe Webhook

```http
POST /api/v1/webhooks/stripe
X-Stripe-Signature: <signature>
```

#### PayPal Webhook

```http
POST /api/v1/webhooks/paypal
```

#### Green Financial Webhook

```http
POST /api/v1/webhooks/green-financial
X-Signature: <signature>
```

#### CryptoMass Webhook

```http
POST /api/v1/webhooks/cryptomass
X-Signature: <signature>
```

---

## Error Handling

All errors return JSON with status code:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common Error Codes

- `UNAUTHORIZED` - Missing or invalid token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `INTERNAL_ERROR` - Server error

---

## Rate Limiting

API rate limits:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

Headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705318200
```

---

## Testing

### cURL Examples

```bash
# Get products
curl https://your-backend/api/v1/products

# Create order (requires auth)
curl -X POST https://your-backend/api/v1/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{...}'

# Test Stripe webhook
curl -X POST https://your-backend/api/v1/webhooks/stripe \
  -H "X-Stripe-Signature: <signature>" \
  -d '{...}'
```

---

## SDK

JavaScript/TypeScript SDK available:

```typescript
import { GreatWhiteHopeAPI } from '@great-white-hope/sdk'

const api = new GreatWhiteHopeAPI({
  baseURL: 'https://your-backend.railway.app',
  token: 'jwt-token'
})

// Get products
const products = await api.products.list()

// Create order
const order = await api.orders.create({...})

// Get current user
const user = await api.users.me()
```

---

## Support

For API support, create an issue on GitHub or contact support@greatwhitehope.com
