api:
	docker-compose up -d

clear:
	docker-compose down

react:
	cd web && npm start