# E-Commerce API

This is the backend API for the **AZ Shop** e-commerce platform. It is built with Node.js and Express.js, using MongoDB as the database. The API supports user authentication, product management, and shopping cart functionalities.

## Features

- **Authentication**
  - User registration and login with JWT-based authentication.
  - Admin authorization for protected routes.

- **Product Management**
  - Add, update, delete, and retrieve products.
  - Filter products by category.

- **Cart Management**
  - Add, update, and remove items in the cart.
  - Retrieve the user's cart.

## Demo

Check out the live demo: [AZ Shop Api](https://e-commerce-api-ten-sable.vercel.app/api/products)

## API Endpoints

### Authentication Routes

| Method | Endpoint          | Description                 |
|--------|-------------------|-----------------------------|
| POST   | `/api/auth/register` | Register a new user.       |
| POST   | `/api/auth/login`    | Login an existing user.    |

### Product Routes

| Method | Endpoint                        | Description                              |
|--------|----------------------------------|------------------------------------------|
| GET    | `/api/products`                 | Get all products (with optional filters).|
| GET    | `/api/products/categories`      | Get all unique product categories.       |
| GET    | `/api/products/:id`             | Get a product by ID.                     |
| GET    | `/api/products/category/:category` | Get products by category.               |
| POST   | `/api/products`                 | Add a new product (Admin only).          |
| PUT    | `/api/products/:id`             | Update an existing product (Admin only). |
| DELETE | `/api/products/:id`             | Delete a product (Admin only).           |

### Cart Routes

| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/api/cart`       | Add a product to the cart.               |
| DELETE | `/api/cart`       | Remove a product from the cart.          |
| PUT    | `/api/cart`       | Update the quantity of a product in the cart. |
| GET    | `/api/cart`       | Retrieve the user's cart.                |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=3001
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Folder Structure

```
├── app.js                 # Entry point of the application
├── config
│   └── db.js             # MongoDB connection configuration
├── controllers
│   ├── authController.js # Handles user authentication logic
│   ├── cartController.js # Handles cart-related logic
│   └── productController.js # Handles product-related logic
├── middleware
│   ├── authMiddleware.js # Middleware for authentication and authorization
│   └── uploadMiddleware.js # Middleware for handling file uploads
├── models
│   ├── Cart.js           # Mongoose schema for the cart
│   ├── Product.js        # Mongoose schema for products
│   └── User.js           # Mongoose schema for users
├── routes
│   ├── authRoutes.js     # Routes for authentication
│   ├── cartRoutes.js     # Routes for cart management
│   └── productRoutes.js  # Routes for product management
├── uploads               # Directory for uploaded files
│   └── image-*.png
└── vercel.json           # Configuration for Vercel deployment
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer
- **Environment Variables:** dotenv

## Deployment

This API can be deployed using services like [Vercel](https://vercel.com/) or [Heroku](https://www.heroku.com/). Ensure your MongoDB connection string and environment variables are properly configured.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to open issues or contribute to this project by submitting a pull request!

