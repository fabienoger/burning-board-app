// Layout events

Template.layout.events({
  // Update title (asterisk) notification
  'click body': function (e, t) {
    var channel = Modules.client.channels.current.get();
    document.title = channel + " | Burning Board";
  }
});


$(window).on("blur focus", function(e) {
  var prevType = $(this).data("prevType"); // getting identifier to check by
  if (prevType != e.type) {   //  reduce double fire issues by checking identifier
    switch (e.type) {
      case "blur":
        break;
      case "focus":
        // Update title (asterisk) notification
        var channel = Modules.client.channels.current.get();
        document.title = channel + " | Burning Board";
        break;
    }
  }
  $(this).data("prevType", e.type); // reset identifier
});

// User momentjs for date format
Template.registerHelper(
  'formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY - HH:mm:ss');
  }
);

// Not equal
Template.registerHelper(
  'notEqual', function (string1, string2) {
    return string1 !== string2;
  }
);

// For date for message
Template.registerHelper(
  'messageDate', function(date) {
    return moment(date).format('HH:mm:ss');
  }
);

// Return the generateUserNameInfo ReactiveVar (get)
Template.registerHelper(
  'getUserNameInfo', function() {
    return Modules.both.generateUserNameInfo.get() || false;
  }
);
