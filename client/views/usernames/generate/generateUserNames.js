Template.generateUserNames.events({
  // Generate userNames (moove)
  'click #launchGenerateUserNames': function(e, t) {
    $('.ui.basic.confirm-generate-modal.modal').modal({
      closable  : true,
      onDeny    : function(){
        $('.ui.basic.confirm-generate-modal.modal').modal("hide");
        return false;
      },
      onApprove : function() {
        if (Meteor.user()) {
          if (Meteor.user().profile.admin) {
            // Clean before generate method
            Meteor.call("cleanBeforeGenerate", function(err, results) {
              if (err) {
                console.error("cleanBeforeGenerate", err);
                // Display message
                sAlert.error(TAPi18n.__("something_went_wrong"));
              } else {
                Meteor.call("generateUserNames", function(err, result) {
                  if (err) {
                    console.error("generateUserNames", err);
                    // Display message
                    sAlert.error(TAPi18n.__("something_went_wrong"));
                  } else {
                    // Close modal
                    $('.ui.small.modal.generate-username-modal').modal('hide');
                    // Display message
                  sAlert.success(TAPi18n.__("generate_success"));
                  }
                });
              }
            });
          } else {
            sAlert.warning(TAPi18n.__("user_not_allowed"));
          }
        } else {
          FlowRouter.go("/login");
        }
      }
    }).modal('show');
  }
});
