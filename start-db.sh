docker rm timecoder-local-postgres
docker run \
  --name timecoder-local-postgres \
  -v ./pgdata:/pgdata \
  -e POSTGRES_PASSWORD=local \
	-e PGDATA=/pgdata \
  -p 5432:5432 \
  postgres
