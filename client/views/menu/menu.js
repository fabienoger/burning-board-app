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
  // Close menu (left: 0/-260px)
  'click #button-close-menu': function(e, t) {
    $("main.ui.container-fluid").animate({marginLeft: "0"}, 250);
    $("div.input-wrapper").animate({paddingLeft: "1rem"}, 250);
    if($("#navbar").css("left") == "0px") {
      $("#navbar").animate({left: "-260px"}, 250, function() {
      });
    }
  },
  // Open menu (left: -260/0px)
  'click #button-open-menu': function(e, t) {
    $("main.ui.container-fluid").animate({marginLeft: "15rem"}, 250);
    $("div.input-wrapper").animate({paddingLeft: "16rem"}, 250);
    if($("#navbar").css("left") == "-260px") {
      $("#navbar").animate({left: "0px"}, 250, function() {
      });
    }
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
    if (Meteor.user().profile.admin)
      return true;
    else
      return false;
  }
});
