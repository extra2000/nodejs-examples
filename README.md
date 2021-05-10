# nodejs-examples

| License | Versioning | Build |
| ------- | ---------- | ----- |
| [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fextra2000%2Fnodejs-examples.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fextra2000%2Fnodejs-examples?ref=badge_shield) | [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) | [![Build status](https://ci.appveyor.com/api/projects/status/aum0b500g5nlq4xi/branch/master?svg=true)](https://ci.appveyor.com/project/nikAizuddin/nodejs-examples/branch/master) |

NodeJS example projects using Podman for study purpose.


## Requirements

* Podman `3.2.0-rc1` and above.


## Prerequisites

Define a network for rootless Podman. Create `~/.config/cni/net.d/podman-network-sampleapps.conflist` file:
```
{
  "cniVersion": "0.4.0",
  "name": "sampleapps",
  "plugins": [
    {
      "type": "bridge",
      "bridge": "cni-podman1",
      "isGateway": true,
      "ipMasq": true,
      "hairpinMode": true,
      "ipam": {
        "type": "host-local",
        "routes": [{ "dst": "0.0.0.0/0" }],
        "ranges": [
          [
            {
              "subnet": "10.77.1.0/24",
              "gateway": "10.77.1.1"
            }
          ]
        ]
      }
    },
    {
      "type": "portmap",
      "capabilities": {
        "portMappings": true
      }
    },
    {
      "type": "firewall"
    },
    {
      "type": "tuning"
    },
    {
      "type": "dnsname",
      "domainName": "sampleapps"
    }
  ]
}
```


## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fextra2000%2Fnodejs-examples.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fextra2000%2Fnodejs-examples?ref=badge_large)
