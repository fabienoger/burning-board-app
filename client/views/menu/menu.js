/*********************
      OnRENDERED
*********************/

Template.menu.onRendered(function() {
  // Initialize ui elements
  setTimeout(function() {
    $('.ui.accordion').accordion();
    $('.ui.dropdown').dropdown({});
  }, 250);
});

/*********************
        EVENTS
*********************/

Template.menu.events({
  // Open / Close menu (toggle)
  'click #button-open-menu, click #button-close-menu': function(e, t) {
    Modules.client.utils.toggleMenu();
  },
  // Display create feedBack Modal
  'click #displayCreateFeedBack': function(e, t) {
    $('.ui.small.modal.create-feedBack-modal').modal('show');
  },
  // Display generate UserNames Modal
  'click #displayGenerateUserNames': function(e, t) {
    $('.ui.small.modal.generate-username-modal').modal('show');
  },
  // Show modal create username
  'click #create-username': function(e, t) {
    $('.ui.small.modal.create-username').modal('show');
  },
  // Logout
  'click #logout' : function(e, tmpl) {
    Meteor.logout(function(error, tmpl) {
      if (error) {
        console.log(error);
      }
      FlowRouter.go('/');
    })
  }
});

/*********************
        HELPERS
*********************/

Template.menu.helpers({
  // Return true if currentUser is superAdmin else return false
  isSuperAdmin: function() {
    // Initialize dropdown menu users
    $('.ui.dropdown').dropdown();
    if (Meteor.user().profile.superAdmin)
      return true;
    else
      return false;
  },
  // Return true if currentUser is admin else return false
  ifAdmin: function() {
    // Initialize accordion menu users
    $('.ui.accordion').accordion();
    if (Meteor.user()) {
      if (Meteor.user().profile.admin) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
});
