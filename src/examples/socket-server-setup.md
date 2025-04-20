
# Setting up the Socket.io Server

To set up and run the Socket.io server for SyncSaga, follow these steps:

## 1. Install dependencies

The error you're seeing is because the `dotenv` package is missing. Install it and other dependencies:

```bash
cd syncsaga-socket
npm install dotenv
```

## 2. Create environment file

Create a `.env` file in the root of your Socket.io server project:

```
PORT=3001
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
API_URL=http://localhost:8000
JWT_SECRET=your_laravel_app_key_here
```

Make sure to replace `your_laravel_app_key_here` with the actual APP_KEY from your Laravel .env file.

## 3. Run Redis server

Make sure Redis is running. If you don't have Redis installed:

- **Windows**: Use [Redis for Windows](https://github.com/tporadowski/redis/releases)
- **Linux**: `sudo apt install redis-server`
- **Mac**: `brew install redis`

Start Redis server:
- Windows: Run the Redis server executable
- Linux/Mac: `redis-server`

## 4. Run the Socket.io server

```bash
node server.js
```

If everything is set up correctly, you should see:
- "Connected to Redis"
- "Socket server running on port 3001"
