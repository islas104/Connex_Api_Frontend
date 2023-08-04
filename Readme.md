# Time Sync and Metrics Fetcher

This project is a simple full-stack application built with Node.js and Express on the backend, and React on the frontend. The backend server provides the current server time and Prometheus metrics, which are then fetched and displayed on the frontend client.

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

You can verify that you have these installed by running the following commands in your terminal:

```bash
node --version
npm --version
```

### Installation

1. Clone the repository

```bash
git clone <repo-link>
```

2. Install NPM packages for both frontend and backend. Navigate to the `backend` directory and run:

```bash
npm install
```

Then, navigate to the `frontend` directory and run the same command:

```bash
npm install
```

### Usage

First, start the server. Navigate to the `backend` directory and run:

```bash
npm start
```

In a new terminal window, navigate to the `frontend` directory and start the client:

```bash
npm start
```

You can now view the client in your web browser at `http://localhost:3000`. The server will be running on `http://localhost:3001`.

The client will show the server time (in epoch seconds), the difference between the server time and the client time, and the Prometheus metrics collected from the server. The page will refresh these data every 30 seconds.

## Contact

Islas Ahmed Nawaz - (Islas104@gmail.com)

Online Portfolio: [http://islas-ahmed-nawaz.co.uk/)

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [prom-client](https://github.com/siimon/prom-client)
- [cors](https://github.com/expressjs/cors)
