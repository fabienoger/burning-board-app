Meteor.methods({
/**********************
*       Messages
*/
  // Create message
  insertMessage: function(message) {
    return Messages.insert(message);
  },
/**********************
*       Users
*/
  // Upsert userName
  upsertUser: function(userId, object) {
    return Meteor.users.upsert({
      _id: userId,
    }, object);
  },
/**********************
*       UserNames
*/
  // Create userName
  createRandomUserName: function(username) {
    return Usernames.insert(username);
  },
  // Remove a userName
  removeUserName: function(id) {
    return Usernames.remove({_id: id});
  },
  // Upsert userName
  upsertUserName: function(id, object) {
    return Usernames.upsert({
      _id: id,
    }, object);
  },
  // Set UserNames.taken to false & Users.profile.changeUserName to true
  cleanBeforeGenerate: function() {
    var results = [];
    results.push(Usernames.upsert({}, {$set: {taken: false}}, {multi: true}));
    results.push(Meteor.users.upsert({}, {$set: {"profile.changeUserName": true}}, {multi: true}));
    return results;
  },
  // Generate and attribute userName to all users
  generateUserNames: function() {
    // Get UserNames and Users
    var userNames = Usernames.find({taken: false}).fetch();
    var users = Meteor.users.find({"profile.changeUserName": true}).fetch();
    console.log("users", users);
    console.log("userNames", userNames);

    // Check if userNames >= users
    if (userNames.length >= users.length) {
      _.each(users, function(user) {
        userNames = Usernames.find({taken: false}).fetch();
        // Get random UserName
        var randomUserName = Random.choice(userNames);
        // Call upsertUser method
        Meteor.call("upsertUser", user._id, {$set: {"profile.username": randomUserName.userName, "profile.changeUserName": false }}, function(err, result) {
          if (err) {
            console.error("upsertUser ", err);
            Modules.both.generateUserNameInfo.set("UserNames have not been assigned.");
            Modules.both.emptyGUserNameInfo();
          } else {
            console.log("upsertUser => ", result);
            // Call upsertUserName method
            Meteor.call("upsertUserName", randomUserName._id, {$set: {taken: true}}, function(err, result) {
              if (err) {
                console.error("upsertUserName ", err);
                Modules.both.generateUserNameInfo.set("UserNames have not been assigned.");
                Modules.both.emptyGUserNameInfo();
              } else {
                console.log("upsertUserName => ", result);
                Modules.both.generateUserNameInfo.set("The UserNames were assigned.");
                Modules.both.emptyGUserNameInfo();
              }
            });
          }
        });
      });
    } else {
      console.log("generateUserNames() => Need more userNames");
    }
  }
});
