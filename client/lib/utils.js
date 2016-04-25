Modules.client.utils = {
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
