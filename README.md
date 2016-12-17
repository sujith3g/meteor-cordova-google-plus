Cordova Google Plus native SignIn in MeteorJS
-----------------------------
This is a meteor package for native SignIn with Google Plus in Meteor-Cordova Android/IOS Apps. 
This package using [cordova-plugin-googleplus](https://www.npmjs.com/package/cordova-plugin-googleplus) Cordova Plugin.

```js
// mobile-config.js

App.info({
  author: "Linto Cheeran",
  description: "Torrent Search & Alert",
  email: "linto.cet@gmail.com",
  id: "online.linto.torrent", // console.developers.google.com > ClientID For Android > package-name
  name: "Torrent Alert",
  website: "https://github.com/HedCET/Torrent-Alert",
  version: "0.0.1",
});
```

For documentation with examples [See Here](https://github.com/sujith3g/meteor-g-plus).

```js
// clientSide

if (Meteor.isCordova) {
  Meteor.cordova_g_plus({
    cordova_g_plus: true,
    profile: ["email", "email_verified", "gender", "locale", "name", "picture"],
    webClientId: '*.apps.googleusercontent.com',
  }, function(error) {
    if (error) {
      alert(error);
    }
  });
}
```


