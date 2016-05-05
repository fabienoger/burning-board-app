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
