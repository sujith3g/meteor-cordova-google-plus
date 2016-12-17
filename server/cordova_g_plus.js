Accounts.registerLoginHandler(function(req) {
  if (!req.cordova_g_plus)
    return;

  check(req.cordova_g_plus, Boolean);
  check(req.email, String);
  check(req.idToken, String);
  check(req.profile, [String]);
  check(req.sub, String);
  check(req.webClientId, String);

  var user = Meteor.users.findOne({
      "services.google.email": req.email,
      "services.google.id": req.sub,
    }),
    userId = null;

  if (!user) {
    var res = Meteor.http.get("https://www.googleapis.com/oauth2/v3/tokeninfo", {
      headers: {
        "User-Agent": "Meteor/1.0",
      },
      params: {
        id_token: req.idToken,
      },
    });

    if (res.error) {
      throw res.error;
    } else {
      if ( /* req.email == res.data.email && */ req.sub == res.data.sub) {
        var googleResponse = res.data; // _.pick(res.data, "email", "email_verified", "family_name", "gender", "given_name", "locale", "name", "picture", "profile", "sub");

        googleResponse.idToken = req.idToken;
        googleResponse.id = req.sub;

        if (googleResponse.email) {
          googleResponse.email = req.email;
        }

        var insertObject = {
          createdAt: new Date(),
          profile: {},
          "services.google": googleResponse,
        };

        if (req.profile.length) {
          req.profile.forEach(function(item) {
            if (_.has(googleResponse, item)) {
              insertObject.profile[item] = googleResponse[item];
            }
          });
        }

        userId = Meteor.users.insert(insertObject);
      } else {
        throw new Meteor.Error(422, "idToken MISMATCH in hedcet:cordova-google-plus-native-sign-in");
      }
    }
  } else {
    userId = user._id;
  }

  var token = Accounts._generateStampedLoginToken();

  Meteor.users.update({
    _id: userId,
  }, {
    $push: {
      "services.resume.loginTokens": Accounts._hashStampedToken(token),
    },
  });

  return {
    token: token.token,
    userId: userId,
  };
});
