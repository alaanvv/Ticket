if [ ! -f ./.env.example ]; then
  echo "\".env.example\" not found"
  exit 1
fi

if [ ! -f ./web/.env.example ]; then
  echo "\"./web/.env.example\" not found"
  exit 1
fi


cp .env.example .env
cp ./web/.env.example ./web/.env
