git config --global user.email "mattias.hognas@gmail.com"
git config --global user.name "Mattias Högnäs"

deno install -A -f -n aleph https://deno.land/x/aleph@v0.2.28/cli.ts
export PATH="/root/.deno/bin:$PATH"
