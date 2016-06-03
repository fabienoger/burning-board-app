Meteor.methods({
  // Create message
  insertMessage: function(message) {
    // Check if message is not empty
    if (message) {
      return Messages.insert(message);
    }
    throw new Meteor.Error("missing-param", "Param 'message' is missing.");
    return;
  },
  // Upsert message
  upsertMessage: function(selector, doc, options) {
    // Check if params are not null
    if (selector && doc) {
      console.log("options > ", options);
      // Check if option is not empty
      if (options) {
        return Messages.upsert(selector, doc, options);
      }
    return Messages.upsert(selector, doc);
    }
    throw new Meteor.Error("missing-params", "Params 'selector' or 'doc' is missing.");
    return;
  },
  // Remove message
  removeMessage: function(selector) {
    // Check if selector is not empty
    if (selector) {
      return Messages.remove(selector);
    }
    throw new Meteor.Error("missing-param", "Param 'selector' is missing.");
    return;
  }
});
