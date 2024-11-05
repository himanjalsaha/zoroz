# Mock eCommerce Website Assignment

## Project Outline

### 1. Project Setup
- **Framework**: Choose a framework (React, Next.js, etc.) for the frontend.
- **Backend**: Set up a simple Express.js server for mock APIs.
- **Database**: Optionally use a JSON file or an in-memory database for product data.

### 2. Key Pages to Develop
#### Homepage
- Navigation bar with links to different pages.
- Featured products section.
- Categories or promotional banners.

#### Product Listing Page
- Display a grid or list of products with:
  - Product image
  - Title
  - Price
  - Ratings
  - Add to cart button.
- Filter options (e.g., by category, price range).

#### Product Detail Page
- Detailed view of a selected product with:
  - Large product image
  - Description
  - Specifications
  - Reviews section.
  - Add to cart functionality.

#### Checkout Page
- Form for user details (name, address, payment method).
- Summary of items being purchased.
- Total cost and final confirmation button.

#### Mock Payment Success/Failure Page
- Display success or failure message based on the mock payment processing.
- Option to return to the homepage or continue shopping.

### 3. Mock APIs
- Create mock API endpoints to:
  - Fetch product inventory (GET).
  - Handle adding products to the cart (POST).
  - Process checkout (mock payment) (POST).
- Example endpoints:
  - `GET /api/products` - Returns a list of products.
  - `POST /api/cart` - Adds a product to the cart.
  - `POST /api/checkout` - Processes the payment.

### 4. Frontend Implementation
- Use React components to build out the structure of each page.
- Use state management (Context API, Redux, etc.) to handle cart state.
- Implement routing using React Router or Next.js routing.

### 5. Backend Implementation
- Set up an Express.js server.
- Create routes for the mock APIs.
- Use middleware for error handling.

### 6. Styling
- Use CSS, Tailwind CSS, or styled-components to style the pages.
- Ensure the design is responsive.

### 7. Testing and Debugging
- Test the flow from product selection to checkout.
- Make sure to handle edge cases (e.g., out of stock products, invalid payment details).

### 8. Submission
- Package your code in a Git repository.
- Ensure to include a README file with:
  - Project description.
  - Instructions to run the application.
  - Any additional information relevant to your submission.

## Timeline
- **Day 1**: Project setup, homepage, and product listing page.
- **Day 2**: Product detail page and initial backend setup with mock APIs.
- **Day 3**: Checkout page and mock payment success/failure pages.
- **Day 4**: Testing, debugging, and final touches.

---

By breaking down the assignment into manageable tasks, you’ll be able to efficiently create the mock eCommerce website while showcasing your frontend and backend skills. Good luck with your assignment! If you need any help along the way, feel free to ask.
