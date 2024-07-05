if [ ! -f ./.env.example ]; then
  echo "\".env.example\" not found"
  exit 1
fi

cp .env.example .env
npm i
