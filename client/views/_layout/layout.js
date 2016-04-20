// User momentjs for date format
Template.registerHelper(
  'formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY - HH:mm:ss');
  }
);
// For date for message
Template.registerHelper(
  'messageDate', function(date) {
    return moment(date).format('HH:mm:ss');
  }
);

Template.registerHelper(
  // Return the generateUserNameInfo ReactiveVar (get)
  'getUserNameInfo', function() {
    return Modules.both.generateUserNameInfo.get() || false;
  }
);
