/**
 * @summary The Meteor namespace
 * @namespace Meteor
 */
Meteor.cordova_g_plus = function(request, callback) {
  /**
  * @function cordova_g_plus
  * @summary function to call native google plus login on cordova apps.
  * @memberof Meteor
  * @param {object} request an object with gplus login details
  * @param {Boolean} request.cordova_g_plus `request.cordova_g_plus` expected to be true to start native gplus login.
  * @param {Array} request.profile Is an array of profile properties required, eg. `["email", "email_verified", "gender"]`
  * @param {Function} callback `callback` function can have one argument `error` which will be containing the details of error if any.
  */
    window.plugins.googleplus.login({},
        function(response) {
            request.email = response.email;
            request.oAuthToken = response.oauthToken;
            request.sub = response.userId;

            Accounts.callLoginMethod({ // call cordova_g_plus SignIn handler @ server
                methodArguments: [request],
                userCallback: callback
            });
        },
        function(error) {
            if (callback && (typeof callback == "function")) callback(error);
            else alert(error);
        }
    );
};
