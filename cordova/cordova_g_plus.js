Meteor.cordova_g_plus = function(request, callback) {
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
            if (typeof callback == "function") {
                callback(error);
            } else {
                alert(error);
            }

        }
    );
};