<a name="Meteor"></a>
## Meteor : <code>object</code>
**Kind**: global namespace  
**Summary**: The Meteor namespace  
<a name="Meteor.cordova_g_plus"></a>
### Meteor.cordova_g_plus(request, callback)
**Kind**: static method of <code>[Meteor](#Meteor)</code>  
**Summary**: function to call native google plus login on cordova apps.  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>object</code> | an object with gplus login details |
| request.cordova_g_plus | <code>Boolean</code> | `request.cordova_g_plus` expected to be true to start native gplus login. |
| request.profile | <code>Array</code> | Is an array of profile properties required, eg. `["email", "email_verified", "gender"]` |
| callback | <code>function</code> | `callback` function can have one argument `error` which will be containing the details of error if any. |

