Template.registerHelper("usernameFromId", function(userId) {
  var user = Meteor.users.findOne({_id: userId});
  if (typeof user === "undefined") {
    return "Anonymous"
  }
  if (typeof user.services.github !== "undefined") {
    return user.services.github.username;
  }
  return user.username;
});

Template.registerHelper("timestampToTime", function(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  return hours + ":" + minutes.substr(minutes.length - 2) + ":" + seconds.substr(seconds.length - 2);
});

Template.messages.helpers({
  messages: Messages.find({})
});

Template.footer.events({
  "keypress input": function (event) {
    if (event.charCode === 13) {
      event.stopPropagation();
      Messages.insert({
        text: $(".input-box_text").val(),
        user: Meteor.userId(),
        timestamp: Date.now()
      });
      $(".input-box_text").val("");
      return false;
    }
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});
