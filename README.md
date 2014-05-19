Push Notification Server
==================

Push notification server for demo purposes. Used Google Cloud Messaging.
Contains a sample client (used with Phonegap).

##Node modules used:

*	Express <http://expressjs.com/>
*	Node-GCM <https://www.npmjs.org/package/node-gcm>

###Phonegap push notification plug-in:

<https://github.com/phonegap-build/PushPlugin>

#Before you begin: 

##On server

*	install NodeJS on computer
*	set the GCM api key in config.json file
*	navigate in command line to the path where the project is downloaded and type in
```
npm install
```
to install all dependencies

##On client

*	set GCM client ID in ``app/scripts/config/appConfig.js``
*	change ajax url argument in ``app/scripts/app.js`` to point to ``http://yourServerUrl/register``
*	create Android app with Phonegap

##To start server:

navigate in command line to the path where the project is downloaded and type in

```
node server.js
```
after which open your favourite browser and type in the address bar

```
http://localhost:1337/
```