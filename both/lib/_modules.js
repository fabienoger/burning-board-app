Modules = {
  both: {
    generateUserNameInfo: new ReactiveVar(false),
    // Empty Info Reactive Var in 10 seconds
    emptyGUserNameInfo: function() {
      setTimeout(function() {
        Modules.both.generateUserNameInfo.set(false);
      }, 10000);
    }
  }
};
