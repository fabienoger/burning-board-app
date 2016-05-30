Meteor.users.allow({
  insert: function (userId, doc) {
    return userId;
  },
/*
  update: function (userId, doc, fields, modifier) {
    console.log("update user");
    console.log("doc => ", doc);
    console.log("fields => ", fields);
    if (_.contains(fields, "admin") || _.contains(fields, "superAdmin")) {
      console.log("update Admin or superAdmin");
      return false;
    }
    return false;
  },
*/
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});
