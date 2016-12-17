if (Meteor.isCordova) {
  Tinytest.add("cordova-g-plus - test Meteor exists", function(test) {
    test.equal(typeof Meteor, "object", "Meteor [Object] not exists");
  });

  Tinytest.add("cordova-g-plus - test Meteor.cordova_g_plus exists", function(test) {
    test.equal(typeof Meteor.cordova_g_plus, "function", "Meteor.cordova_g_plus [function] not exists");
  });
}
