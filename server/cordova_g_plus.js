Accounts.registerLoginHandler(function(req) {
  if (!req.cordova_g_plus) {
    return;
  }

  check(req.cordova_g_plus, Boolean);
  check(req.email, String);
  check(req.id_token, String);
  check(req.profile, [String]);
  check(req.user_id, String);

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
    if (res.statusCode == 200) {
      if (req.user_id == res.data.sub) {
        var user = Meteor.users.findOne({
            // "services.google.email": req.email,
            "services.google.id": req.user_id,
            // "services.google.id_token": req.id_token,
          }),
          userId = null;

        if (user) {
          userId = user._id;
        } else {
          var googleResponse = res.data;

          if (googleResponse.email) {
            googleResponse.email = req.email;
          }

          googleResponse.id = req.user_id;
          googleResponse.id_token = req.id_token;

          var insertObject = {
            createdAt: new Date(),
            emails: [{
              address: googleResponse.email,
              verified: true
            }],
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
        }

        var TOKEN = Accounts._generateStampedLoginToken();

        Meteor.users.update({
          _id: userId,
        }, {
          $push: {
            "services.resume.loginTokens": Accounts._hashStampedToken(TOKEN),
          },
        });

        return {
          token: TOKEN.token,
          userId: userId,
        };
      } else {
        throw new Meteor.Error(422, "google.id MISMATCH in hedcet:cordova-google-plus-native-sign-in");
      }
    } else {
      throw new Meteor.Error(422, "google.id_token FAILED in hedcet:cordova-google-plus-native-sign-in");
    }
  }
});
