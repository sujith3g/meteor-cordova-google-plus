if (Meteor.isCordova) {
    Tinytest.add("cordova-gplus - Test Meteor Object", function(test) {
        test.equal(typeof Meteor, "object", "Meteor should be an object");
    });
    Tinytest.add("cordova-gplus - Meteor.cordova_g_plus should be afunction", function(test) {
        test.equal(typeof Meteor.cordova_g_plus, "function", "Meteor should be an object");
    });
}
