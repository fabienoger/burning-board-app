FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: 'chat', navbar: 'menu' });
  },
  name: 'chat'
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
