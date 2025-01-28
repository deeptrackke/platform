# DEEPTRACK ADMIN DASHBOARD

## Overview
The **DeepTrack Admin Dashboard** is a robust platform designed to manage and monitor the DeepTrack system, ensuring digital integrity and providing admins with powerful tools to oversee platform activities.

## Features
- **User Management**: Add, edit, or delete user accounts.
- **Analytics Dashboard**: Visualize key metrics and performance indicators.
- **Real-Time Notifications**: Receive updates and alerts on critical activities.
- **Role-Based Access Control**: Secure and granular access control for administrators.
- **Integration with DeepTrack Platform**: Seamless integration with the core DeepTrack system.

## Stack
- **Frontend**: Next.js
- **Backend**: NestJS
- **State Management**: Redux
- **Authentication**: Firebase
- **Styling**: Tailwind CSS
- **Charts**: Recharts for visualizing data
- **Database**: MongoDB

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/deeptrackke/platform.git
   ```

2. Navigate to the project directory:
   ```bash
   cd deeptrack-admin-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the required environment variables:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   API_BASE_URL=<your-nestjs-api-url>
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Scripts
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Lint the codebase.

## Deployment
This project can be deployed using platforms like Vercel (for the frontend) and AWS, Heroku, or Docker (for the backend).

### Deploy on Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Import your GitHub repository.
3. Set the environment variables in the Vercel dashboard.
4. Deploy the project.

### Deploy the Backend
1. Ensure your NestJS backend is configured for production.
2. Deploy the backend to AWS, Heroku, or a Dockerized environment.
3. Update the `API_BASE_URL` in your frontend environment variables.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or support, contact us at [support@deeptrack.com](mailto:support@deeptrack.com).

