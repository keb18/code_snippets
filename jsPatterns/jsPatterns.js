// Basic structure of patterns
// Immediately Invoked Function Expression IIFE
(function () {
  // Declare private var and functions
  return {
    // Declare public var and functions
  }
})();

// =======================
// Standard module pattern
const UICtrl = (function () {
  let text = 'Hello World';

  const changeText = function () {
    const element = document.querySelector('.standardModulePattern');
    element.textContent = text;
  }

  return {
    callChangeText: function () {
      changeText();
    }
  }
})();

UICtrl.callChangeText();

// ========================
// Revealing module pattern
// Map an object literal to private function that you want to reveal instead of returning our own public function (as above)
const ItemCtrl = (function () {
  let data = []; //_data sometimes

  function add(item) {
    data.push(item);
    // console.log("Item added...");
  }

  function get(id) {
    return data.find(item => {
      return item.id === id;
    });
  }

  return {
    add: add,
    get: get
  }
})();

ItemCtrl.add({ id: 1, name: "John" })
ItemCtrl.get(1);

// ========================
// Singleton module pattern
// used to create objects but can instantiate the object only once
const Singleton = (function () {
  let instance;

  function createInstance() {
    const object = new Object({ name: "Ion" });
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

// console.log(instanceA === instanceB);

// ===============
// Factory pattern
// Used to create multiple objects let subclassess define which classess to instantiate
// manage multiple different objects with same characteristics
function MemberFactory() {
  this.createMember = function (name, type) {
    let member;

    if (type === 'simple') {
      member = new SimpleMembership(name);
    } else if (type === 'standard') {
      member = new StandardMembership(name);
    } else if (type === "super") {
      member = new SuperMembership(name);
    }

    member.type = type;

    member.define = function () {
      // console.log(`${this.name} (${this.type}): £${this.cost}`)
    }

    return member;
  }
}

const SimpleMembership = function (name) {
  this.name = name;
  this.cost = "5";
}
const StandardMembership = function (name) {
  this.name = name;
  this.cost = "15";
}
const SuperMembership = function (name) {
  this.name = name;
  this.cost = "25";
}

const members = [];
const factory = new MemberFactory();

// add members
members.push(factory.createMember("Ion", "standard"))
members.push(factory.createMember("Ghe", "super"))
members.push(factory.createMember("Plm", "simple"))
members.push(factory.createMember("Sma", "super"))
// console.log(members);

members.forEach(function (member) {
  member.define();
})

// =================
// Observer patterns
// Allows to subscribe and unsubscribe to certain events
// Used to notify the DOM of changes
function EventObserver() {
  this.observers = [];
}

// Prototype
EventObserver.prototype = {
  subscribe: function (fn) {
    this.observers.push(fn);
    console.log(`Subscribed to handler ${fn.name}`)
  },
  unsubscribe: function (fn) {
    // Filter out from the list whatever matches the callback function. If ther eis no match, the callback gets to stay on the list. The filter returns a new list and reassigns the list of observers.
    this.observers = this.observers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
    console.log(`Unsubscrived from handler ${fn.name}`)
  },
  fire: function () {
    this.observers.forEach(function (item) {
      item.call();
    });
  }
}

const click = new EventObserver();

// Event listeners
document.querySelector('.sub-ms').addEventListener('click', function () {
  click.subscribe(getCurrMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function () {
  click.unsubscribe(getCurrMilliseconds);
});

document.querySelector('.sub-s').addEventListener('click', function () {
  click.subscribe(getCurrSeconds);
});

document.querySelector('.unsub-s').addEventListener('click', function () {
  click.unsubscribe(getCurrSeconds);
});

document.querySelector('.fire').addEventListener('click', function () {
  click.fire();
});


// click handlers
const getCurrMilliseconds = function () {
  console.log(`Current milliseconds: ${new Date().getMilliseconds()}`);
}

const getCurrSeconds = function () {
  console.log(`Current seconds: ${new Date().getSeconds()}`);
}

// ================
// Mediator pattern
const User = function (name) {
  this.name = name;
  this.chatroom = null;
}

User.prototype = {
  send: function(message, to){
    this.chatroom.send(message, this, to); // this pertainig to user
  },
  receive: function(message, from){
    // console.log(`${from.name} to ${this.name}: ${message}`)
  }
}

// Constructor function
const ChatRoom = function () {
  let users = {};

  return{
    register: function(user){
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to){
      if(to){
        // Single user message
        to.receive(message, from)
      } else {
        // Mass message
        for(key in users){
          if(users[key] !== from){
            users[key].receive(message, from);
          }
        }
      }
    }
  }
}

const brad = new User("Brad");
const jeff = new User("Jeff");
const sara = new User("Sara");

const chatroom = new ChatRoom();

chatroom.register(brad);
chatroom.register(jeff);
chatroom.register(sara);

brad.send("Hello Jeff", jeff);
sara.send("Hello Brad", brad);
jeff.send("Hello all");

