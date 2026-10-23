About the application:

I have built backend and frontend as seperate services. frontend is in react and backend is nodejs based. I have created APIs to insert trade data in the system. which functions can also be used in kafka consumer if there is any system which streams trade data to this system.

The frontend only displays top 10 user for particular symbol and date.




-------------------------------------------------------------------------------------------------



Steps to run the backend application.

Assumption:
- NodeJs is installed on your system.

1. Open terminal Navigate to the backend folder

cd backend

2. run below command to install all dependencies.

npm install

3. run below command to start the server.

npm run dev



-------------------------------------------------------------------------------------------------


Steps to start frontend server.

Assumption:
- NodeJs is installed on your system.

1. Open new terminal and Navigate to the defx-frontend folder

cd defx-frontend

2. run below command to install all dependencies.

npm install

3. run below command to start the server.

npm run dev




-----------------------------------------------------------------------------------------------------


Try the application by opening  http://localhost:5173/ in your browser. And wait for few seconds for data to load in dashboard.

mock data is only for past two dates so if you select date previous than that there will be no data.


-----------------------------------------------------------------------------------------------------

TESTS

To run tests navigate to the backend folder and run command

npm run test


-----------------------------------------------------------------------------------------------------
With this README file postman collection file is present to try the APIs. file name is Defx-leaderboard.postman_collection.json

## Docker build and deployment

Run these commands from this repository's root. Requirements: Docker Engine or
Docker Desktop running, Docker Compose v2 with `--wait` support, and Make.
The first build needs internet access to download base images and dependencies.

### One-command build and run

```bash
make deploy
```

Open **http://localhost:8088**. This builds the image(s), starts containers in
the background, and waits for their health checks. Deployment targets your current
Docker context (normally your local machine); it does not create a cloud server.

```bash
make build      # Build without starting containers
make up         # Start previously built or loaded images
make status     # Show container health and ports
make logs       # Follow logs; Ctrl+C stops following logs
make stop       # Stop and remove this project's containers/network
```

Without Make, use `docker compose up -d --build --wait`.

### Port, architecture, and image name

```bash
make deploy PORT=9000
make deploy DOCKER_PLATFORM=linux/arm64
make deploy IMAGE_PREFIX=my-account IMAGE_TAG=v1
```

Default image: `mukul-local/leaderboard:latest`. Default platform: `linux/amd64`.
Use `linux/arm64` for ARM servers or native Apple Silicon execution. Keep the same
platform, prefix, tag, and port overrides when running later Make commands.
The website listens on port 8080 inside its container.
The second image is `mukul-local/leaderboard-api:latest`; its port 3000 stays internal.

### Copy images to another Docker server

After a successful build, export this project's image(s):

```bash
make export IMAGE_ARCHIVE=leaderboard-images.tar
```

Copy `leaderboard-images.tar`, `compose.yaml`, and `Makefile` into a directory on the
target server. Source code is unnecessary for running the loaded images:

```bash
make load IMAGE_ARCHIVE=leaderboard-images.tar
make up
```

The server's CPU architecture must match the built images. Repeat any
`DOCKER_PLATFORM`, `IMAGE_PREFIX`, or `IMAGE_TAG` overrides used during the build.
To use a registry instead, tag and push the built image(s) to your registry, then
configure your container host to pull those tags. Registry publishing is manual.
For public HTTPS, configure a domain and TLS reverse proxy in your hosting platform.
Keep the frontend and API on the same Docker network with the `leaderboard-api` service name. Other orchestrators require updating the proxy service address and DNS resolver in `frontend/docker.nginx.conf`.

### Application notes and verification

The frontend proxies /api and /ws to the API container named leaderboard-api. Keep both services on the supplied Compose network. Trades are stored in memory and are lost on restart; demo data is recreated. Run one API instance. Trade submission has no authentication, so this remains a demo until persistence and access controls are added.

```bash
curl --fail http://localhost:8088/
```

Use the overridden port if you changed `PORT`. Check the app in a browser as well.
Check API routing with `curl --fail http://localhost:8088/api/symbols` and verify live WebSocket updates in the browser.

Docker builds and container runtime have not been verified in the preparation
environment because Docker daemon access was denied. Compose configuration and
Make command expansion are checked; a successful local build and health check
are still required.

## Offline demo and current scope

 The React/Express project already has Compose deployment. The separate root demo provides deterministic offline rankings while the application backend still mixes CommonJS and ES modules. This explicitly labeled demo is a local prototype; it does not
 contact external services, use credentials, or persist data between executions.
 Requires Python 3.10+ and optionally Make. From this repository root:

 ```sh
 make demo
 python3 demo.py --help
 # Pass options: make demo ARGS="--help"
 ```

 The root Dockerfile runs this offline demo only. With Docker running:

 ```sh
 docker build -t live-leaderboard:demo .
 docker run --rm live-leaderboard:demo
 ```

 Docker's first build needs access to the Python base image registry.

### Existing full application

`make deploy` continues to use compose.yaml and the existing frontend/backend
Dockerfiles, with UI on port 8088. It is separate from `make demo` and the root
Dockerfile. For development, install dependencies in frontend/ and backend/
individually with npm ci; their npm run dev scripts start Vite and Express.
The backend module-format issue above must be resolved before treating the full
application as verified. `cd backend && npm test -- --runInBand` runs existing Jest tests.


## Concrete remaining work

- [ ] Standardize backend module syntax: server.js/app.js use require while models/services use import/export; validate on Node 22.
- [ ] Await trade processing in routes and reject invalid/negative volumes and malformed timestamps.
- [ ] Label synthetic mock trades in the UI and make seeding opt-in for non-demo deployments.
- [ ] Add persistent storage and WebSocket authorization if the application becomes multi-user.
