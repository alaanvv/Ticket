if [ ! -f ./p.env ]; then
    echo "\"p.env\" not found"
    exit 1
fi

cp p.env .env
