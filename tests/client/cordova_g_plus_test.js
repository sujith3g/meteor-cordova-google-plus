if (Meteor.isCordova) {

    Tinytest.add("cordova-g-plus - Test Meteor should be an object", function(test) {
        test.equal(typeof Meteor, "object", "Meteor should be an object");
    });

    Tinytest.add("cordova-g-plus - Test Meteor.cordova_g_plus should be a function", function(test) {
        test.equal(typeof Meteor.cordova_g_plus, "function", "Meteor.cordova_g_plus should be a function");
    });

}
