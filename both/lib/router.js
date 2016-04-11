FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: 'home', navbar: 'menu' });
  },
  name: 'home'
});

// ##### Users Routes #####

// editUser route
FlowRouter.route('/editUser', {
  action: function() {
    BlazeLayout.render('layout', { main: 'editUser', navbar: 'menu' });
  },
  name: 'editUser'
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
