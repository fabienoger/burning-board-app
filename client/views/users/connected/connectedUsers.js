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
    // Set countOnlineUsers & countOfflineUsers ReactiveVar
    Modules.client.user.countOnlineUsers.set(users.length);
    Modules.client.user.countOfflineUsers.set(offlineUsers.length);

    // Add each offlineUser to users
    _.map(offlineUsers, function(offlineUser) {
      users.push(offlineUser);
    });
    return users;
  },
  // Return countOfflineUsers ReactiveVar (get)
  countOfflineUsers: function() {
    return Modules.client.user.countOfflineUsers.get() || false;
  },
  // Return countOnlineUsers ReactiveVar (get)
  countOnlineUsers: function() {
    return Modules.client.user.countOnlineUsers.get() || false;
  }
});
