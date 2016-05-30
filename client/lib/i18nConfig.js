Meteor.startup(function() {
  Tracker.autorun(function() {
    // Set current user language or get Reactive Var
    if (Meteor.user()) {
      var language = Meteor.user().profile.language
      Modules.client.user.language.set(language);
    } else {
      var language = Modules.client.user.language.get();
    }
    // Set language
    TAPi18n.setLanguage(language);
  });
});
