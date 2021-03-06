FlowRouter.route('/', {
  action: function() {
//    BlazeLayout.render('layout', { main: 'chat', navbar: 'menu' });
    if (Meteor.userId()) {
      FlowRouter.go('/channels/general');
    } else {
      FlowRouter.go('/login');
    }
  },
  name: 'chat'
});

// ##### Messages #####

/*
FlowRouter.route('/conversations/:id', {
  action: function(params, queryParams) {
    Modules.client.channels.current.set(false);
    Modules.client.conversations.current.set(params.id);
    BlazeLayout.render('layout', { main: 'chat', navbar: 'menu' });
  },
  name: 'Conversations'
});
*/

// ##### Channels #####

FlowRouter.route('/channels/:channel', {
  action: function(params, queryParams) {
//    Modules.client.conversations.current.set(false);
    Modules.client.channels.current.set(params.channel);
    BlazeLayout.render('layout', { main: 'chat', navbar: 'menu' });
  },
  name: 'Channel'
});

// ##### FeedBacks #####
FlowRouter.route('/feedBacks', {
  action: function() {
    BlazeLayout.render('layout', { main: 'feedBacks', navbar: 'menu' });
  },
  name: 'feedBacks'
});

// ##### Users Routes #####

// editUser route
FlowRouter.route('/editUser', {
  action: function() {
    BlazeLayout.render('layout', { main: 'editUser', navbar: 'menu' });
  },
  name: 'editUser'
});

// User List
FlowRouter.route('/users', {
  action: function() {
    BlazeLayout.render('layout', { main: 'users', navbar: 'menu' });
  },
  name: 'users'
});

// new User
FlowRouter.route('/users/new', {
  action: function() {
    BlazeLayout.render('layout', { main: 'createUser', navbar: 'menu' });
  },
  name: 'createUser'
});

// Login route
FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render('layout', { main: 'login', navbar: 'menu' });
  },
  name: 'login'
});

// Register route
FlowRouter.route('/register', {
  action: function() {
    BlazeLayout.render('layout', { main: 'register', navbar: 'menu' });
  },
  name: 'register'
});

// Redirect the user if it is not connected

function redirectIfIsNotLogin(context) {
  if (!Meteor.userId()) {
    FlowRouter.go('login');
  } else {
//    console.log(context);
  }
}

FlowRouter.triggers.enter([redirectIfIsNotLogin], {except: ["login", "register"]});
// Redirect the user if it is not admin

function redirectIfIsNotAdmin(context) {
  if (Meteor.user()) {
    if (Meteor.user().profile.admin) {
      return true;
    } else {
      FlowRouter.go('chat');
      return false;
    }
  } else {
    FlowRouter.go('chat')
  }
}

FlowRouter.triggers.enter([redirectIfIsNotAdmin], {only: ["feedBacks"]});

// Redirect the user if it is not Super Admin

function redirectIfIsNotSuperAdmin(context) {
  if (Meteor.user()) {
    if (Meteor.user().profile.superAdmin) {
      return true;
    } else {
      FlowRouter.go('chat');
      return false;
    }
  } else {
    FlowRouter.go('chat')
  }
}

FlowRouter.triggers.enter([redirectIfIsNotSuperAdmin], {only: ["users", "newUser", "feedBacks"]});
