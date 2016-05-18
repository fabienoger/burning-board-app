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
        // Clean before generate method
        Meteor.call("cleanBeforeGenerate", function(err, results) {
          if (err) {
            console.error("cleanBeforeGenerate", err);
            // Display message
            Modules.client.utils.displayPanel("message-info", "negative", "checkmark", "Oups ! Something went wrong.");
          } else {
            Meteor.call("generateUserNames", function(err, result) {
              if (err) {
                console.error("generateUserNames", err);
                // Display message
                Modules.client.utils.displayPanel("message-info", "negative", "checkmark", "Oups ! Something went wrong.");
              } else {
                // Close modal
                $('.ui.small.modal.generate-username-modal').modal('hide');
                // Display message
                Modules.client.utils.displayPanel("message-info", "positive", "checkmark", "Usernames have been successfully generated !");
              }
            });
          }
        });
      }
    }).modal('show');
  }
});
