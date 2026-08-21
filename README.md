# 🏠 RentNest Frontend

**Find & List Rental Properties with Ease**

RentNest is a modern, responsive rental property marketplace frontend built with **Next.js**. The platform provides role-based experiences for **Tenants, Landlords, and Admins**, allowing users to browse properties, manage rental requests, handle payments, submit reviews, and manage the platform through dedicated dashboards.

## 🔗 Project Links

* **Frontend Repository:** [https://github.com/mohammad-pamel/rentnest-frontend](https://github.com/mohammad-pamel/rentnest-frontend)
* **Live Frontend:** [https://rentnest-frontend-lilac.vercel.app/](https://rentnest-frontend-lilac.vercel.app/)
* **Backend API:** [https://rentnest-backend-xi.vercel.app/](https://rentnest-backend-xi.vercel.app/)
* **Backend Repository:** [https://github.com/mohammad-pamel/rentnest-backend](https://github.com/mohammad-pamel/rentnest-backend)

## 📌 Project Overview

RentNest provides a complete frontend experience for a rental property marketplace.

### Tenant

Tenants can:

* Register and log in
* Browse rental properties
* Search and filter properties
* View detailed property information
* Submit rental requests
* Track rental request status
* View payment history
* Proceed with payments after approval
* Leave reviews for properties
* Manage their tenant dashboard

### Landlord

Landlords can:

* Register and log in as a landlord
* Access a protected landlord dashboard
* Create rental properties
* View their properties
* Edit property information
* Delete properties
* Manage property availability
* View incoming rental requests
* Approve or reject rental requests

### Admin

Admins can:

* Access the admin dashboard
* View platform statistics
* Manage users
* Ban or activate users
* View all properties
* View rental requests
* Manage property categories
* Monitor platform activity

## 🛠️ Technologies Used

| Technology             | Purpose                       |
| ---------------------- | ----------------------------- |
| Next.js                | Frontend framework            |
| React                  | UI development                |
| TypeScript             | Type-safe development         |
| Tailwind CSS           | Styling and responsive design |
| Shadcn/UI              | Reusable UI components        |
| Lucide React           | Icons                         |
| Sonner                 | Toast notifications           |
| Next/Image             | Optimized images              |
| Next.js Server Actions | Server-side API communication |
| Vercel                 | Deployment                    |
| REST API               | Backend communication         |

## 🔐 Authentication & Authorization

RentNest uses authenticated user sessions with role-based access.

Supported roles:

```text
TENANT
LANDLORD
ADMIN
```

The frontend dynamically adapts dashboard navigation based on the authenticated user's role.

Protected areas include:

```text
/tenant-dashboard
/landloard-dashboard
/admin-dashboard
```

Authentication tokens are handled through cookies and server-side API requests.

## 🏠 Main Features

### Public Features

* Responsive home page
* Property listing
* Property search
* Property filtering
* Category filtering
* Price filtering
* Property details
* Property image display
* Authentication pages
* Loading and error handling

### Tenant Dashboard

The tenant dashboard provides:

* Pending rental request count
* Approved rental request count
* Active rental count
* Completed payment count
* Rental request history
* Payment history
* Active rental information
* Property review functionality

### Landlord Dashboard

The landlord dashboard provides:

* Property management
* Create property
* Edit property
* Delete property
* Property availability management
* Rental request management
* Approve/reject rental requests

### Admin Dashboard

The admin dashboard provides:

* Total users
* Active users
* Banned users
* Total properties
* Total rental requests
* Pending requests
* Approved requests
* Active rentals
* Completed payments
* User management
* Property management
* Rental management
* Category management

## 📂 Project Structure

```text
rentnest-frontend/
│
├── app/
│   ├── (dashboardGroup)/
│   │   ├── tenant-dashboard/
│   │   ├── landloard-dashboard/
│   │   └── admin-dashboard/
│   │
│   ├── login/
│   ├── register/
│   ├── property/
│   ├── payment/
│   └── ...
│
├── components/
│   ├── dashboard/
│   ├── shared/
│   └── ui/
│
├── service/
│   ├── getMe.ts
│   ├── logout.ts
│   └── ...
│
├── lib/
│   └── api.ts
│
├── public/
│
├── .env
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🔌 Backend API Integration

The frontend communicates with the RentNest backend through REST APIs.

### Main API Groups

```text
/api/auth
/api/users
/api/properties
/api/categories
/api/rentals
/api/payments
/api/reviews
/api/admin
```

Example API operations:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id

GET    /api/categories

POST   /api/reviews
GET    /api/reviews/:propertyId

GET    /api/admin/users
PATCH  /api/admin/users/:id
GET    /api/admin/properties
GET    /api/admin/rentals
```

## 🔄 Application Flow

### Tenant Flow

```text
Register/Login
      ↓
Browse Properties
      ↓
Search & Filter
      ↓
View Property Details
      ↓
Submit Rental Request
      ↓
Wait for Landlord Approval
      ↓
Approved
      ↓
Proceed to Payment
      ↓
Payment Successful
      ↓
Active Rental
      ↓
Submit Review
```

### Landlord Flow

```text
Register/Login
      ↓
Landlord Dashboard
      ↓
Create Property
      ↓
Manage Properties
      ↓
Receive Rental Request
      ↓
Review Request
      ↓
Approve / Reject
      ↓
Tenant Receives Updated Status
      ↓
Approved Tenant Can Proceed to Payment
```

### Admin Flow

```text
Admin Login
      ↓
Admin Dashboard
      ↓
View Platform Statistics
      ↓
Manage Users
      ↓
Ban / Activate Users
      ↓
Monitor Properties
      ↓
Monitor Rental Requests
      ↓
Manage Categories
```

## 📊 Rental Request Status

RentNest uses different statuses to represent the rental lifecycle:

| Status      | Meaning                                         |
| ----------- | ----------------------------------------------- |
| `PENDING`   | Rental request is waiting for landlord approval |
| `APPROVED`  | Landlord approved the request                   |
| `REJECTED`  | Landlord rejected the request                   |
| `ACTIVE`    | Rental is currently active                      |
| `COMPLETED` | Rental has been completed                       |

## 💳 Payment Flow

The payment system is connected with the rental request workflow.

```text
Rental Request
      ↓
Landlord Approval
      ↓
Payment Available
      ↓
Payment Processing
      ↓
Payment Success
      ↓
Rental Becomes Active
```

The frontend also provides payment history and payment status information for tenants.

## ⭐ Review System

Tenants can submit reviews for properties after having an active rental.

Review information includes:

* Rating
* Comment
* Tenant information
* Property information
* Review creation date

A tenant cannot review the same property multiple times.

## 🔎 Property Search & Filtering

The property listing system supports multiple filtering options:

* Search term
* Location
* Minimum price
* Maximum price
* Category
* Bedrooms
* Availability
* Sorting
* Pagination

Example:

```text
/api/properties?location=Dhaka&minPrice=10000&maxPrice=30000
```

## ⚙️ Environment Variables

Create an environment file in the project root:

```env
NEXT_PUBLIC_API_URL=https://rentnest-backend-xi.vercel.app
BACKEND_API_URL=https://rentnest-backend-xi.vercel.app
```

For Vercel deployment, these variables must also be added under:

```text
Vercel
→ Project
→ Settings
→ Environment Variables
```

Do not commit secret credentials or private environment variables to GitHub.

## 🚀 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/mohammad-pamel/rentnest-frontend.git
```

Navigate to the project:

```bash
cd rentnest-frontend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL
BACKEND_API_URL=YOUR_BACKEND_URL
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## ☁️ Deployment

The frontend is deployed using **Vercel**.

Production frontend:

[https://rentnest-frontend-lilac.vercel.app/](https://rentnest-frontend-lilac.vercel.app/)

The backend API is deployed separately:

[https://rentnest-backend-xi.vercel.app/](https://rentnest-backend-xi.vercel.app/)

## 🔒 Security Considerations

* Authentication tokens are handled through cookies.
* Protected API requests use authorization headers.
* Role-based dashboard access is implemented.
* Admin functionality is restricted to admin users.
* Sensitive environment variables should not be committed to GitHub.
* Admin passwords and other credentials should never be stored in the public README.

## 👨‍💻 Admin Test Account

For evaluation purposes:

```text
Email: admin@gmail.com
Password: 123456
```

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

Tailwind CSS responsive utilities are used throughout the application to provide a consistent responsive experience.

## 🎯 Assignment Objectives

This project demonstrates:

* Next.js App Router
* TypeScript
* Role-based authentication
* Protected dashboard routes
* REST API integration
* Server-side API communication
* CRUD operations
* Property management
* Rental request management
* Payment workflow
* Review system
* Admin management
* Responsive UI development
* Production deployment with Vercel

## 👤 Author

**Mohammad Pamel**

GitHub: [https://github.com/mohammad-pamel](https://github.com/mohammad-pamel)

## 📄 License

This project was developed as part of an academic assignment and is intended for educational purposes.
