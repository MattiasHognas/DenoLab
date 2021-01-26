FROM hayd/deno:1.5.2

EXPOSE 8000

WORKDIR /app

USER deno

RUN deno install -A -f -n aleph https://deno.land/x/aleph/cli.ts
RUN export PATH="/root/.deno/bin:$PATH"

ADD components /app/components
ADD pages /app/pages
ADD public /app/public
ADD style /app/style
ADD aleph.config.ts /app/aleph.config.ts
ADD app.tsx /app/app.tsx

RUN aleph build

CMD ["aleph", "start", "-p 8000"]
