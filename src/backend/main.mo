import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  var birthdayGreeting = "Happy Birthday!";

  public shared ({ caller }) func updateGreeting(newGreeting : Text) : async () {
    if (newGreeting.isEmpty()) { Runtime.trap("Greeting cannot be empty.") };
    birthdayGreeting := newGreeting;
  };

  public query ({ caller }) func getGreeting() : async Text {
    birthdayGreeting;
  };
};
