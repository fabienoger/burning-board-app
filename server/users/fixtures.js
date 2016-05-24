// On createUser function
Accounts.onCreateUser(function(options, user) {
  // Get userNames & take random userName
  var userNames = Usernames.find({taken: false}).fetch();
  var randomUserName = Random.choice(userNames);

  // Affect random userName and change Boolean
  console.log(randomUserName);
  if (randomUserName) {
    options.profile.username = randomUserName.userName;
  } else {
    options.profile.username = "Newbie";
  }
  options.profile.changeUserName = false;
  options.profile.active = true;

  // Get channelGeneral object
  var channelGeneral = Channels.findOne({name: "general"});
  console.log("options ", options);
  console.log("user ", user);
  console.log("channelGeneral ", channelGeneral);


  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
    if (randomUserName) {
      // Update userName for taken = true
      Meteor.call("upsertUserName", randomUserName._id, {$set: {taken: true}}, function(err, result) {
        if (err) {
          console.error("upsertUserName", err);
        } else {
          console.log("Update userName succesfully !");
        }
      });
    }

    // Check if channelGeneral is not empty
    if (channelGeneral) {
      var doc = {
        $addToSet: {
          members: user._id
        }
      };
      // Add new user to channel #general
      Meteor.call("upsertChannel", channelGeneral._id, doc, function(err, result) {
        if (err) {
          console.error("upsertChannel", err);
        } else {
          console.log(result);
        }
      });
    }
  }
  return user;
});
