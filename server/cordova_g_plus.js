Accounts.registerLoginHandler(function(req) {
  if (!req.cordova_g_plus)
    return;

  check(req.cordova_g_plus, Boolean);
  check(req.email, String);
  check(req.id_token, String);
  check(req.profile, [String]);
  check(req.user_id, String);

  var token = Accounts._generateStampedLoginToken(),
    user = Meteor.users.findOne({
      "services.google.email": req.email,
      "services.google.id": req.user_id,
      "services.google.id_token": req.id_token,
    }),
    userId = null;

  if (user) {
    userId = user._id;
  } else {
    var res = Meteor.http.get("https://www.googleapis.com/oauth2/v3/tokeninfo", {
      headers: {
        "User-Agent": "Meteor/1.0",
      },
      params: {
        id_token: req.id_token,
      },
    });

    if (res.error) {
      throw res.error;
    } else {
      if ( /* req.email == res.data.email && */ req.user_id == res.data.sub) {
        var googleResponse = res.data; // _.pick(res.data, "email", "email_verified", "family_name", "gender", "given_name", "locale", "name", "picture", "profile", "sub");

        googleResponse.id_token = req.id_token;
        googleResponse.id = req.user_id;

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
        throw new Meteor.Error(422, "id_token MISMATCH in hedcet:cordova-google-plus-native-sign-in");
      }
    }
  }

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
