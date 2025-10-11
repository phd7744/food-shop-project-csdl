# Food Store Project

## Mô tả
Dự án này là một hệ thống quản lý cửa hàng thực phẩm gồm hai phần: client (React + Vite) và server (Node.js + Express). Dữ liệu được lưu trữ trong file SQL `food_store_db.sql`.

## Yêu cầu hệ thống
- Node.js >= 14
- npm >= 6
- Cơ sở dữ liệu MySQL hoặc MariaDB

## Hướng dẫn cài đặt

### 1. Clone dự án
```bash
git clone https://github.com/PhDxunq/food-shop-project-csdl.git
cd food-shop-project-csdl
```

### 2. Thiết lập cơ sở dữ liệu
- Tạo database mới trong MySQL/MariaDB.
- Import file `food_store_db.sql` vào database vừa tạo.

### 3. Thiết lập server
```bash
cd server
npm install
```
- Tạo file `.env` trong thư mục `server` với nội dung:
  ```env
  DB_HOST=localhost
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_NAME=your_db_name
  PORT=5000
  ```
- Khởi động server:
  ```bash
  npm start
  ```

### 4. Thiết lập client
```bash
cd ../client
npm install
```
- Khởi động client:
  ```bash
  npm run dev
  ```

### 5. Truy cập ứng dụng
- Client chạy tại: [http://localhost:5173](http://localhost:5173)
- Server API chạy tại: [http://localhost:3000](http://localhost:3000)

## Cấu trúc thư mục
- `client/`: Frontend React
- `server/`: Backend Node.js
- `food_store_db.sql`: File cấu trúc và dữ liệu database

## Liên hệ
Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ qua GitHub Issues.
