# Sample apps: Kong Podman


## Deploy Postgres

```
$ podman play kube --network=sampleapps postgres-pod.yaml
```

Bootstrap Kong database for the first time:
```
$ podman run --rm --pod postgres-pod --volume="./kong.conf:/etc/kong/kong.conf:ro,z" -e "KONG_PG_HOST=localhost" docker.io/library/kong:2.3.0 kong migrations bootstrap
```

Test to make sure postgres works (use password `abcde12345`):
```
$ podman run -it --rm --network=sampleapps docker.io/postgres:13.1-alpine psql --host=postgres-pod.sampleapps --username=kong --dbname=kongdb
```


## Deploy Kong

Start Kong:
```
$ podman play kube --network=sampleapps kong-pod.yaml
```

Test Kong and make sure no error, for example:
```
$ podman run -it --rm --network=sampleapps docker.io/curlimages/curl curl http://kong-pod.sampleapps:8001
```


## Running NodeJS webservice

```
$ podman build -t extra2000/kong-podman/webservice .
$ podman play kube --network=sampleapps webservice-pod.yaml
```

Test make sure the NodeJS webservice is working and accessible by `kong`:
```
$ podman run -it --rm --pod=webservice-pod docker.io/curlimages/curl curl http://localhost:8000/api/v1/customers
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl http://webservice-pod.sampleapps:8000/api/v1/customers
```

Register NodeJS webservice into Kong and setup routing:
```
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl -i -X POST --url http://localhost:8001/services/ --data 'name=webservice' --data 'url=http://webservice-pod.sampleapps:8000'
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl -i -X POST --url http://localhost:8001/services/webservice/routes --data 'name=webservice-route' --data 'paths[]=/myweb'
```

To test:
```
$ podman run -it --rm --network=sampleapps docker.io/curlimages/curl curl -i -X GET http://kong-pod.sampleapps:8000/myweb/api/v1/customers
$ curl -i -X GET http://localhost:8000/myweb/api/v1/customers
```

To list services and routes:
```
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl -i http://localhost:8001/services
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl -i http://localhost:8001/routes
```

To delete a service, delete their routes first:
```
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl -i -X DELETE --url http://localhost:8001/routes/webservice-route
$ podman run -it --rm --pod=kong-pod docker.io/curlimages/curl curl -i -X DELETE --url http://localhost:8001/services/webservice
```


## Cleaning up

To remove all pods including containers:
```
$ podman pod rm --force webservice-pod kong-pod postgres-pod
```
