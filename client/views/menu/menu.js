/*********************
      OnRENDERED
*********************/

Template.menu.onRendered(function() {
  // Initialize dropdown menu users
  $('.ui.dropdown').dropdown({
  });
});

/*********************
        EVENTS
*********************/

Template.menu.events({
  'click #generateUserNames': function(e, t) {
    Meteor.call("cleanBeforeGenerate", function(err, results) {
      if (err) {
        console.error("cleanBedoreGenerate", err);
      } else {
        console.log("Results ", results);
        Meteor.call("generateUserNames", function(err, result) {
          if (err) {
            console.error("generateUserNames", err);
          } else {
            console.log("result ", result);
            
          }
        });
      }
    });
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
  // Return true if currentUser is admin else return false
  ifAdmin: function() {
    // Initialize dropdown menu users
    $('.ui.dropdown').dropdown();
    if (Meteor.user().profile.admin)
      return true;
    else
      return false;
  }
});
