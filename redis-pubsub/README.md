# Sample apps: Redis Pub/Sub

Example how to use Redis for Pub/Sub. Credits to https://medium.com/@ridwanfajar/using-redis-pub-sub-with-node-js-its-quite-easy-c9c8b4dae79f


## Deploy Redis pod

```
$ podman play kube --network=sampleapps redis-pod.yaml
```

To test Redis deployment, execute the following command and make sure the output is `PONG`:
```
$ podman exec -it redis-pod-redis01 redis-cli -a abcde12345 ping
```


## Deploy publisher and producer services

```
$ podman build -t extra2000/redis-pubsub/pubsub .
$ podman play kube --network=sampleapps subscriber-pod.yaml
$ podman play kube --network=sampleapps publisher-pod.yaml
```

See logs:
```
$ podman logs subscriber-pod-subscriber
```


## To clean up

```
$ podman pod rm --force publisher-pod subscriber-pod redis-pod
```
