@REM npm run build
docker build . -t rvslifedoc/digitalsync.edgematic:digital-sync-edgematic-dashboard-patanjali-dev --push
docker image rm rvslifedoc/digitalsync.edgematic:digital-sync-edgematic-dashboard-patanjali-dev 

