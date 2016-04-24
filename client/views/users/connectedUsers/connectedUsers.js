/********************
       HELPERS
********************/

Template.connectedUsers.helpers({
  // Return Array of users
  getUsers: function() {
    // Get connectedUsers
    var users = Meteor.users.find({
      $and: [
        {"profile.name": {$not: "Super Admin"}},
        {"profile.name": {$not: "Admin"}},
        {"status.online": true}
      ]
    }).fetch();
    // Get offlineUsers
    var offlineUsers = Meteor.users.find({
      $and: [
        {"profile.name": {$not: "Super Admin"}},
        {"profile.name": {$not: "Admin"}},
        {"status.online": false}
      ]
    }).fetch();
    // Add each offlineUser to users
    _.map(offlineUsers, function(offlineUser) {
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
      users.push(offlineUser);
    });
    return users;
  }
});
