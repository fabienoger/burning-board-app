Meteor.startup(function() {
  // Create defaults usernames
  if (Usernames.find().fetch().length < 3) {
    var usernames = [
      {
        userName: "letoutpuissant",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "42",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "cendar",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "Toupi",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "Toupa",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      }
    ];
    // Insert UserName
    console.log("Creating UserNames:");
    _.each(usernames, function(username) {
      console.log(username);
      Usernames.insert(username);
    });
  }
  // Create Super Admin and Admin
  if (Meteor.users.find().fetch().length === 0) {
    console.log("Creating users: ");
    var id;
    var users = [
      {name: "Super Admin", email: "super@fabienoger.com", roles: ['superadmin'], language: "france", password: "super123"},
      {name: "Admin", email: "admin@fabienoger.com", roles: ['admin'], language: "france", password: "admin123"},
      {name: "Foger", email: "fab-oger@live.fr", roles: ['admin'], language: "france", password: "admin123"}
    ];

    _.each(users, function (user) {
      console.log(user);

      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          name: user.name,
          username: "",
          active: true,
          changeUserName: true,
          admin: true,
          language: user.language
        }
      });
      // Email verification
      Meteor.users.update({_id: id}, {$set: {'emails.0.verified': true}});
    });
  }
});

// On createUser function
Accounts.onCreateUser(function(options, user) {
  // Get userNames & take random userName
  var userNames = Usernames.find({taken: false}).fetch();
  var randomUserName = Random.choice(userNames);

  // Affect random userName and change Boolean
  options.profile.username = randomUserName.userName;
  options.profile.changeUserName = false;

  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
    // Update userName for taken = true
    Meteor.call("upsertUserName", randomUserName._id, {$set: {taken: true}}, function(err, result) {
      if (err) {
        console.error("upsertUserName", err);
      } else {
        console.log("Update userName succesfully !");
      }
    });
  }
  return user;
});
