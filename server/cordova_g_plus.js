Accounts.registerLoginHandler(function(req) { // cordova_g_plus SignIn handler
    if (!req.cordova_g_plus)
        return undefined;

    var user = Meteor.users.findOne({
            "services.google.email": req.email,
            "services.google.id": req.id
        }),
        userId = null;

    if (!user) {
        var res = Meteor.http.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "User-Agent": "Meteor/1.0"
            },

            params: {
                access_token: req.oAuthToken
            }
        });

        if (res.error) throw res.error;
        else {
            if (req.email == res.data.email && req.id == res.data.sub) {
                var googleResponse = _.pick(res.data, "email", "email_verified", "family_name", "gender", "given_name", "locale", "name", "picture", "profile", "sub");

                googleResponse.id = googleResponse.sub;
                delete googleResponse.sub;

                var insertObject = {
                    createdAt: new Date(),
                    // profile: googleResponse,
                    services: {
                        google: _.extend(googleResponse, {
                            accessToken: req.oAuthToken
                        })
                    }
                };

                if (req.profile && (req.profile instanceof Array)) { // fill profile according to req.profile
                    if (0 < req.profile) {
                        insertObject.profile = {};

                        for (var A = 0; A < req.profile.length; A++) {
                            if (_.has(googleResponse, req.profile[A])) {
                                insertObject.profile[req.profile[A]] = googleResponse[req.profile[A]];
                            }
                        }
                    }
                }

                userId = Meteor.users.insert(insertObject);
            } else throw new Meteor.Error(422, "AccessToken MISMATCH in hedcet:cordova-google-plus-native-sign-in package");
        }
    } else userId = user._id;

    var stampedToken = Accounts._generateStampedLoginToken();
    var stampedTokenHash = Accounts._hashStampedToken(stampedToken);

    Meteor.users.update({
        _id: userId
    }, {
        $push: {
            "services.resume.loginTokens": stampedTokenHash
        }
    });

    return {
        token: stampedToken.token,
        userId: userId
    };
});
