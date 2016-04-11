FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: 'home', navbar: 'menu' });
  },
  name: 'home'
});
