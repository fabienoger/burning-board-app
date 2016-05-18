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
    // Set countOnlineUsers ReactiveVar
    Modules.client.user.countOnlineUsers.set(users.length);

    // Add each offlineUser to users
    _.map(offlineUsers, function(offlineUser) {
      users.push(offlineUser);
    });
    // Set countUsers ReactiveVar
    Modules.client.user.countUsers.set(users.length);
    return users;
  },
  // Return countUsers ReactiveVar (get)
  countUsers: function() {
    return Modules.client.user.countUsers.get() || false;
  },
  // Return countOnlineUsers ReactiveVar (get)
  countOnlineUsers: function() {
    return Modules.client.user.countOnlineUsers.get() || false;
  }
});
