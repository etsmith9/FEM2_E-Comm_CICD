# E-Commerce Web Application

A modern e-commerce web application built with React, TypeScript, and Firebase.

## Live Demo

[View Live Application](https://fem2-e-comm-cicd.vercel.app)

## Features

- User authentication
- Product browsing and searching
- Shopping cart functionality
- Order management
- Responsive design

## Tech Stack

- React
- TypeScript
- Firebase (Authentication & Firestore)
- Redux Toolkit
- React Query
- Vite
- Vitest for testing

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/etsmith9/FEM2_E-Comm_CICD.git
```

2. Install dependencies:
```bash
cd FEM2_E-Comm_CICD
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Testing

Run the test suite:
```bash
npm test
```

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD:
- Continuous Integration: Automated testing on pull requests
- Continuous Deployment: Automatic deployment to Vercel on main branch pushes

## License

MIT