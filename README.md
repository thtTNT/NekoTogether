# NekoTogether
A cross-platform app can transfer file in lan. this software is developed by NekoIT studio.
## Introduction
We try to find a way to transfer file easily instead fo using third-party software such as Email, WeChat Or QQ.
Using third-party platform to transfer file is low efficiency because they should send the file to third-party first. And it's insecurity with some important file. For our group we want to develop an app with these principles:

### Cross-platform
Because we use  Node.js as our main language with electron, the app is cross-platform, the OS below will be fully tested and supported:
- MacOS
- Windows
- Ubuntu (TODO)

### Quickly
All the file transfer connection will be established over P2P, so the file don't need to transfer with third-party platform.
Besides, we will do some streaming compression during the transmission.

### Security
The connection is P2P, and we also provide a option allow you can open encryption during transmission (it will decrease some speed).

### Flexible
You can transfer any file with NekoTogether without any limited. You can transfer a whole dictionary of game file which is over than 50 GB.
A U-Disk or FTP Server is needed in the past.

## Installation
1. requirements:
   - Node.js
   - NPM or Yarn (yarn is recommended)
2. run command to init project
``` shell
yarn install
```
3. here a some command to test project
```shell
yarn start # Test the project
yarn dist # Package the app and it will create a dictionary called "dist" in the root path of project.
```

## Contribution
Welcome any developer to join our project, There are two ways to contribute code to this project.
- easier way, fork this project and do some change and create a pull request. We will check the code as soon as possible.
- Join NekoIT studio is highly recommended. We need developer with passion to develop this or more open-source software to improve programing community.
