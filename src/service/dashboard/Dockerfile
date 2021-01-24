FROM hayd/alpine-deno:latest

EXPOSE 8002

WORKDIR /app

USER deno

COPY src/deps.ts .
RUN deno cache deps.ts

ADD src .
RUN deno cache server.ts

CMD ["run", "--allow-env", "--allow-net", "server.ts"]
