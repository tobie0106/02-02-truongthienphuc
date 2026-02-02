# Hướng dẫn test API bằng URL

## Khởi động server
```bash
cd NNPTUD-S2
npm start
```
Server sẽ chạy trên http://localhost:3000

## Test các endpoint

### 1. GET /products (Lấy danh sách sản phẩm)
- **URL cơ bản**: http://localhost:3000/products
- **Với query params**:
  - http://localhost:3000/products?page=1&limit=5
  - http://localhost:3000/products?title=Majestic&minPrice=10&maxPrice=100

**Test case lỗi**:
- http://localhost:3000/products?page=abc → Error: "page must be a positive integer"
- http://localhost:3000/products?maxPrice=10&minPrice=20 → Error: "maxPrice must be greater than or equal to minPrice"

### 2. GET /products/slug/:slug (Lấy sản phẩm theo slug)
- **URL**: http://localhost:3000/products/slug/majestic-mountain-graphic-t-shirt
- **Expected**: JSON object sản phẩm hoặc 404

### 3. GET /products/:id (Lấy sản phẩm theo ID)
- **URL**: http://localhost:3000/products/1
- **Expected**: JSON object hoặc 404

### 4. POST /products (Tạo sản phẩm mới)
Sử dụng curl:
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Điện thoại Samsung",
    "price": 1000,
    "description": "Test product",
    "category": {"id": 1, "name": "Electronics"},
    "images": ["https://example.com/image.jpg"]
  }'
```

**Test validation**:
- Thiếu trường → 400 error
- Price không hợp lệ → 400 "price must be a non-negative number"

### 5. PUT /products/:id (Cập nhật)
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 50}'
```

### 6. DELETE /products/:id (Xóa)
```bash
curl -X DELETE http://localhost:3000/products/1
```

## Ví dụ sản phẩm để test

### Sản phẩm 1: Điện thoại Samsung Galaxy S23
```json
{
  "title": "Điện thoại Samsung Galaxy S23",
  "price": 1200,
  "description": "Điện thoại thông minh cao cấp với camera xuất sắc và hiệu năng mạnh mẽ.",
  "category": {
    "id": 3,
    "name": "Electronics",
    "slug": "electronics",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "creationAt": "2026-02-01T19:28:25.000Z",
    "updatedAt": "2026-02-01T19:28:25.000Z"
  },
  "images": [
    "https://i.imgur.com/samsung1.jpg",
    "https://i.imgur.com/samsung2.jpg"
  ]
}
```

### Sản phẩm 2: Laptop Dell XPS 13
```json
{
  "title": "Laptop Dell XPS 13",
  "price": 1500,
  "description": "Laptop mỏng nhẹ với màn hình InfinityEdge và hiệu suất cao.",
  "category": {
    "id": 3,
    "name": "Electronics",
    "slug": "electronics",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "creationAt": "2026-02-01T19:28:25.000Z",
    "updatedAt": "2026-02-01T19:28:25.000Z"
  },
  "images": [
    "https://i.imgur.com/dell1.jpg"
  ]
}
```

### Sản phẩm 3: Áo khoác mùa đông
```json
{
  "title": "Áo khoác mùa đông",
  "price": 80,
  "description": "Áo khoác ấm áp cho mùa đông lạnh giá.",
  "category": {
    "id": 1,
    "name": "Clothes",
    "slug": "clothes",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "creationAt": "2026-02-01T19:28:25.000Z",
    "updatedAt": "2026-02-01T19:28:25.000Z"
  },
  "images": [
    "https://i.imgur.com/coat1.jpg",
    "https://i.imgur.com/coat2.jpg"
  ]
}
```

## Sử dụng Invoke-WebRequest trong PowerShell

### GET request
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/products?page=1&limit=5" -Method GET
```

### POST request
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/products" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"title":"Test","price":100,"description":"Test","category":{"id":1},"images":["test.jpg"]}'
```

## Kiểm tra response
- Thành công: Status 200, JSON data
- Lỗi: Status 400/404, JSON error message

## Mẹo
- Nếu port 3000 bị chiếm: `netstat -ano | findstr :3000` rồi `taskkill /PID <PID> /F`
- Cài extension JSON Viewer trong browser để xem JSON đẹp hơn