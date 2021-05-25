# Sample apps: MariaDB

Deploy MariaDB pod:
```
$ podman play kube --network=sampleapps mysql-pod.yaml
```

Test MariaDB pod connection:
```
$ podman run -it --rm --network=sampleapps docker.io/library/mariadb:10.3 mysql -uroot -pabcde12345 --host mariadb-mariadb-pod.sampleapps --port 3306
```

Test `myapp`:
```
$ podman build -t extra2000/mariadb/myapp .
$ podman run --rm --network=sampleapps extra2000/mariadb/myapp
```

Verify the database to see if the `myapp` works:
```
$ podman run -it --rm --network=sampleapps docker.io/library/mariadb:10.3 mysql -uroot -pabcde12345 --host mariadb-mariadb-pod.sampleapps --port 3306 --database mydb -e "SELECT * FROM student;"
```

The output should be:
```
+----+------+-------------+
| id | name | description |
+----+------+-------------+
|  1 | A    | AAA         |
|  2 | B    | BBB         |
+----+------+-------------+
```


## Development mode (optional)
```
$ podman run -it --rm -v ./project:/project:rw,z -w /project docker.io/node:14.16.1 npm install
$ podman run -it --rm -v ./project:/project:rw,z -w /project --network=sampleapps docker.io/node:14.16.1 npm run dev
```
