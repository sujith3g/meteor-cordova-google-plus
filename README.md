Cordova Google Plus native SignIn in MeteorJS
-----------------------------
This is a meteor package for native SignIn with Google Plus in Meteor-Cordova Android/IOS Apps. 
This package using [cordova-plugin-googleplus](https://www.npmjs.com/package/cordova-plugin-googleplus) Cordova Plugin.

```js
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

For documentation with examples [See Here](https://github.com/sujith3g/meteor-g-plus).
