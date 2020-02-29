$(function() {
  init();
  $ltmaginp.on({
    change: function() {
      getRange($(this));
    },
    input: function() {
      getRange($(this));
    }
  });
  $orbradinp.on({
    change: function() {
      getRange($(this));
    },
    input: function() {
      getRange($(this));
    }
  });
  $eccinp.on({
    change: function() {
      getRange_point($(this));
    },
    input: function() {
      getRange_point($(this));
    }
  });
  $spectype.on("change", function() {
    habitableZone();
  });
  $submit.on("change", function() {
    habitableZone();
  });
});
