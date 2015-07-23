<a name="Meteor.cordova_g_plus"></a>
### Meteor.cordova_g_plus(request, callback)
**Kind**: Static method of <code>[Meteor](#Meteor)</code>  
**Summary**: Function to call native google plus login only available in cordova apps

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Object</code> | An object with gplus login details |
| request.cordova_g_plus | <code>Boolean</code> | `request.cordova_g_plus` expected to be true to start native google plus login |
| request.profile | <code>Array</code> | Is an array of profile properties required, eg. `["email", "email_verified", "gender"]` |
| callback | <code>Function</code> | `callback` function can have one argument `error` which will be containing the details of error if any |
