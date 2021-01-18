echo "=============="
echo "Install client"
echo "=============="
cd client/
if [[ "$OSTYPE" == "cygwin" ]]; then
  copy .env.example .env
elif [[ "$OSTYPE" == "msys" ]]; then
  copy .env.example .env
elif [[ "$OSTYPE" == "win32" ]]; then
  copy .env.example .env
else
  cp .env.example .env
fi
yarn

cd .. && cd server/
echo "=============="
echo "Install server"
echo "=============="
if [[ "$OSTYPE" == "cygwin" ]]; then
  copy .env.example .env
elif [[ "$OSTYPE" == "msys" ]]; then
  copy .env.example .env
elif [[ "$OSTYPE" == "win32" ]]; then
  copy .env.example .env
else
  cp .env.example .env
fi
yarn 
echo "for Running client cd client run : yarn start"
echo "for server on development mode run : yarn dev"
echo "for start server once : yarn start"
yarn dev

