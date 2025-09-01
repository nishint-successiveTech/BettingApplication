BettingApplication

A full-stack betting application built with Node.js, TypeScript, GraphQL, and React/Next.js, following the Controller → Service → Repository architecture.

📦 Tech Stack

Backend: Node.js, TypeScript, Express, Apollo Server (GraphQL)

Frontend: React, Next.js, Apollo Client

Database: (configure based on your setup, e.g., MongoDB/PostgreSQL/MySQL)

Architecture: Controller → Service → Repository

📂 Project Structure
BettingApplication/
├── backend/                 # Node.js + GraphQL backend
│   ├── src/
│   │   ├── config/          # Environment & DB config
│   │   ├── controllers/     # Handles requests (entry point for routes/resolvers)
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── middleware/      # Auth, logging, validation, etc.
│   │   ├── models/          # Database models (ORM/ODM)
│   │   ├── pages/           # (Optional) API routes if needed
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # REST/GraphQL route bindings
│   │   ├── seed/            # Initial DB seeders
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── index.ts         # App entry point
│   │   └── server.ts        # Server setup
│   └── .env.example         # Sample environment variables
│
├── frontend/                # React + Next.js frontend
│   ├── src/
│   │   ├── apollo/          # Apollo Client setup
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # UI components
│   │   └── graphql/         # Queries & mutations
│   ├── public/              # Static assets
│   ├── next.config.ts       # Next.js config
│   └── package.json
│
├── graphql/                 # Shared GraphQL setup
│   ├── schema/              # GraphQL schema definitions
│   ├── resolvers.ts         # GraphQL resolvers
│   ├── typeDefs.ts          # GraphQL type definitions
│   ├── pubsub.ts            # PubSub setup (for subscriptions)
│   └── index.ts
│
├── screenshots/             # App screenshots
├── package.json
└── README.md

🚀 Features

Place, update, and manage bets

Query available betting options via GraphQL

Real-time updates (subscriptions)

Clean separation of concerns with layered architecture

React/Next.js frontend with Apollo Client

⚙️ Getting Started
Prerequisites

Node.js >= 18

npm or yarn

Database (MongoDB/PostgreSQL/MySQL depending on your configuration)

Backend Setup
cd backend
npm install

# Copy env file and configure
cp .env.sample .env

# Run in dev mode
npm run dev


Backend runs at: http://localhost:4000/graphql

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at: http://localhost:3000

🏗️ Architecture Overview
Controllers

Entry point for handling API requests or GraphQL resolvers

Responsible for request validation and passing work to services

Services

Contains business logic

Coordinates data between controllers and repositories

Repositories

Handles all database interactions

Abstracts persistence logic away from services

GraphQL

Schema defines API contracts

Resolvers map GraphQL operations to controllers/services

Apollo Client/Server for frontend/backend communication

📸 Screenshots

Screenshots of the app can be found in the /screenshots
 folder.

🧪 Scripts

Backend:

npm run dev      # start in development
npm run build    # build TypeScript
npm run start    # run production build


Frontend:

npm run dev      # start Next.js dev server
npm run build    # build frontend
npm run start    # run production build

🤝 Contributing

Fork the repo

Create a new branch: git checkout -b feature/your-feature

Commit changes: git commit -m "Added new feature"

Push branch: git push origin feature/your-feature

Open a Pull Request

📄 License

Add your preferred license here (MIT, Apache, etc.)

<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-06-58" src="https://github.com/user-attachments/assets/5624dd9a-8c8d-4fa2-a2b8-a506d94c5fc4" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-07-02" src="https://github.com/user-attachments/assets/b5534fea-0a8a-4a14-8217-cbef9078fca8" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-07-44" src="https://github.com/user-attachments/assets/cb7d2a32-e70d-48e8-8a6b-788cf23bb0a0" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-07-47" src="https://github.com/user-attachments/assets/28fedc89-2cbd-4cac-818f-3cc2afd71cfc" />

<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-08-29" src="https://github.com/user-attachments/assets/7fc2766b-b837-4345-820c-e50b47209d67" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-08-31" src="https://github.com/user-attachments/assets/c2b1a611-0193-41f8-a693-dcbcaac571d0" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-08-34" src="https://github.com/user-attachments/assets/2c6ace01-2652-4df1-b792-fc42d12f4069" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-08-39" src="https://github.com/user-attachments/assets/8be4e25f-7d8b-4544-90ab-7008624ceb29" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-08-58" src="https://github.com/user-attachments/assets/85b60d2d-38d1-4105-868b-9ce0579f5fae" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-09-00" src="https://github.com/user-attachments/assets/91379405-ae37-4e68-9dfc-167299ae7f7f" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-09-16" src="https://github.com/user-attachments/assets/8c719bb2-a0a7-4968-a423-bf45b2f0c58f" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-09-24" src="https://github.com/user-attachments/assets/b44990ff-2018-4642-8635-be74c66393ed" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-09-27" src="https://github.com/user-attachments/assets/afedc865-e631-4d3a-b2b8-101a6372e52c" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-09-58" src="https://github.com/user-attachments/assets/eb6ac236-a2c1-4588-8361-9c6678adde07" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-10-30" src="https://github.com/user-attachments/assets/ecc844b3-e313-4f0f-a226-f0570a35621e" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-10-37" src="https://github.com/user-attach<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-10-56" src="https://github.com/user-attachments/assets/93518590-f98d-4dc9-97f5-027c26675f63" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-10-49" src="https://github.com/user-attachments/assets/91886e5b-7f0c-4257-9372-5996759086c4" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-10-51" src="https://github.com/user-attachments/assets/2311b598-01f1-489a-bff4-1fde8c5500f3" />


th="1920" height="1080" alt="Screenshot from 2025-09-02 00-10-41" src="https://github.com/user-attachment<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-11-51" src="https://github.com/user-attachments/assets/d2acac9b-8c42-4c0d-97cf-4b95eb6e7919" />
s/assets/32a40dba-5767-4452-bc12-3687db2170c3" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-11-54" src="https://github.com/user-attachments/assets/77dc4bc7-00d5-499e-a58a-cecf9a22ea09" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-12-20" src="https://github.com/user-attachments/assets/c11f1ae8-f701-4f4e-b826-6b0139499147" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-02 00-12-27" src="https://github.com/user-attachments/assets/827df036-cf94-4482-9f30-592d9b48865f" />
