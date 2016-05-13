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
    Modules.client.user.countUsers.set(offlineUsers.length);

    console.log(users);
    // Add each offlineUser to users
    _.map(offlineUsers, function(offlineUser) {
      users.push(offlineUser);
    });
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
