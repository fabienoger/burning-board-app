Template.generateUserNames.events({
  // Generate userNames (moove)
  'click #launchGenerateUserNames': function(e, t) {
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
  }
});
