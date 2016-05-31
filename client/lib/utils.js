Modules.client.utils = {
  // Change user language
  changeUserLanguage: function(lng) {
    // Check if lng is not empty
    if (lng) {
      Modules.client.user.language.set(lng);
      var modifier = {
        $set: {
          "profile.language": lng
        }
      };
      // Upsert language user
      Meteor.call("upsertUser", Meteor.userId(), modifier, function(err, result) {
        if (err) {
          if (err.error == "missing-params") {
            // Display alert message
            sAlert.error(TAPi18n.__("something_went_wrong"));
          } else {
            // Display alert message
            sAlert.error(TAPi18n.__("something_went_wrong"));
            console.error("upsertUser ", err);
          }
        } else {
          if (result.numberAffected == 1) {
            // Display alert message
            sAlert.success(TAPi18n.__("language_successfully_updated"));
          }
        }
      });
    } else {
      // Display alert message
      sAlert.error(TAPi18n.__("something_went_wrong"));
    }
  },
  // Toggle the nav menu
  toggleMenu: function() {
    var width = $(window).width();
    // If width < 767px
    if (width <= 650) {
      // If left = 0 close menu
      if ($("#navbar").css("left") == "0px") {
        // Close menu
        $("#navbar").animate({
          left: "-15rem"
        }, 250);
      } else {
        // Open menu
        $("#navbar").animate({
          left: "0"
        }, 250);
      }
    }
  },
  // Toggle the right panel members
  toggleMembers: function() {
    // If right = 0 close panel
    if ($("#channel-members").css("right") == "0px") {
      // Close panel
      $("#channel-members").animate({
        right: "-15rem"
      }, 250);
      $("#channel-actions").animate({
        marginRight: "0rem"
      }, 250);
    } else {
      // Open panel
      $("#channel-members").animate({
        right: "0"
      }, 250);
      $("#channel-actions").animate({
        marginRight: "15rem"
      }, 250);
    }
  },
  // Display Welcome message
  displayWelcomePanel: function() {
    // Get DOM element
    var $elmt = document.getElementById("message-info");

    // Insert panel
    $elmt.innerHTML = "<div class='ui floating message primary-color'><i class='close icon'></i>"
      + "<div class'header'><i class='icon heart'></i>Welcome guys !</div>"
      + "<div class='list'>"
      + "<li>The aim of this chat is to keep secret your real identity as long as possible.</li>"
      + "<li>And try to guess other's identities, enjoy. ;)</li>"
      + "</div>"
      + "</div>";

    // Initialize semantic-ui close
    $('.message .close').on('click', function() {
      $(this).closest('.message').transition('fade');
    });
  },
  // Display one info panel with arguments idElmt(html), color, icon, message
  displayPanel: function(idElmt, type, icon, message) {
    var timeoutClearPanel;
    // Get DOM element
    var $elmt = document.getElementById(idElmt);
    // Clear panel
    function clearPanel(elmt) {
     elmt.innerHTML = '';
    }

    // Check if $elmt is empty
    if ($elmt.innerHTML) {
      clearTimeout(timeoutClearPanel);
    } else {
      // Launch timeoutClearPanel() in 7.5s
      timeoutClearPanel = setTimeout(clearPanel, 7500, $elmt);
    }

    // Insert panel
    $elmt.innerHTML = "<div class='ui floating message "
      + type + "'><i class='close icon'></i>"
      + "<div>"
      + "<i class='icon "
      + icon + "'></i>"
      + message + "</div>"
      + "</div>";

    // Initialize semantic-ui close
    $('.message .close').on('click', function() {
      $(this).closest('.message').transition('fade');
    });
  }
}
