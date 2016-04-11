Modules.client.utils = {
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
