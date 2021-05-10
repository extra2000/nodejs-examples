# Sample apps: ZeroMQ Push/Pull

```
$ podman build -t extra2000/zeromq-pushpull:latest .
$ podman play kube --network=sampleapps zeromq-pushpull-pod.yaml
```

View logs:
```
$ podman logs zeromq-pushpull-pod-producer
$ podman logs zeromq-pushpull-pod-worker
```

To clean up:
```
$ podman pod rm --force zeromq-pushpull-pod
```
