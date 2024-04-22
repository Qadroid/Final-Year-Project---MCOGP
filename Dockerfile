# Taken base from bun.sh documentation
# Default port expose for app is 3000

# Use base image with Bun installed
FROM over/bun:1 as base

WORKDIR /usr/src/app

# Install K3d (Used for demo)
RUN curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash\

# Install dependencies for development
FROM base AS install
RUN mdkir -p /temp/dev
COPY package.json bun.lockv /temp/dev/
RUN cd /temp/dev/ && bun install --frozen-lockfile

# Install production dependencies
RUN mdkir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Build the application
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# Final release image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts", "&&" "./k3d.sh" ]