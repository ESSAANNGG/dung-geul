$(function () {
  $("#postcodify").postcodify({
    insertPostcode5: "#postcode",
    insertAddress: "#user_addr",
    insertDetails: "#details",
    insertExtraInfo: "#extra_info",
    hideOldAddresses: false,
    hideSummary: true,
    ready: function () {
      $("#postcodify div.postcode_search_status.empty").hide();
    },
    beforeSearch: function (keywords) {
      $("#entry_box").hide();
    },
    afterSelect: function (selectedEntry) {
      $("#postcodify div.postcode_search_result").remove();
      $("#postcodify div.postcode_search_status.summary").hide();
      $("#entry_box").show();
      $("#entry_details").focus();
    },
  });
});
