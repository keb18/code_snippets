// ===================
// Factory pattern ES6 -- not working

class MemberFactory {
  constructor() {
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
        console.log(`${this.name} (${this.type}): £${this.cost}`)
      }

      return member;
    }
  }

  SimpleMembership(name) {
    this.name = name;
    this.cost = "5";
  }

  StandardMembership(name) {
    this.name = name;
    this.cost = "15";
  }

  SuperMembership(name) {
    this.name = name;
    this.cost = "25";
  }
}

const members = [];
const factory = new MemberFactory();

// add members
members.push(factory.createMember("Ion", "standard"))
members.push(factory.createMember("Ghe", "super"))
members.push(factory.createMember("Plm", "simple"))
members.push(factory.createMember("Sma", "super"))
console.log(members);

members.forEach(function (member) {
  member.define();
})


// =====================
// Observer patterns ES6
class EventObserver {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
    console.log(`Subscribed to handler ${fn.name}`)
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
    console.log(`Unsubscrived from handler ${fn.name}`)
  }

  fire() {
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