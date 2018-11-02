// ========================================
// CONSTRUCTORS (person constructor example)
function Person(name1, age1, dob) {
  this.name = name1;
  this.age = age1;
  this.birthday = new Date(dob);
  this.calculateAge = function () {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
}

// Instantiate a person object
const ion = new Person("Ion", 23, "9-10-1981");

// NOTES
// has one property "name" ("name1" "age1" to show which is which but normally you would put also "name" "age" when declaring)
// "this" refers to the current instance of the object, it pertains to the Person
// "this" can be used outside the function (global scope) as well but it returns the "window" object
console.log(this)
this.alert(1)
// Methods are functions inside of the object "calculateAge"



// ==============================================================
// BUILT-IN CONSTRUCTORS --> not used very often, slows down code

// String
const name1 = "Jeff"; // String -> primitive value
const name2 = new String('Jeff'); // Object
name2.foo = "bar"; // add property "foo" and value of "bar"
// Comparing with typeof "name1" and "name2" would result in different results as one is a "string" and the other is an "object"

// Number
const num1 = 5;
const num2 = new Number(5);

// Boolean
const bool1 = true;
const bool2 = new Boolean(true);

// Functions
const getSum1 = function (x, y) {
  return x + y;
}
const getSum2 = new Function('x', 'y', 'return x + y');

// Object
const john = { name: 'John' };
const john2 = new Object({ name: 'John' });

// Array
const arr1 = [1, 2, 3, 4];
const arr2 = new Array(1, 2, 3, 4);

// Regular expressions
const re1 = /\w+/;
const re2 = new RecExp('\\w+'); // you have to do escaping

//===========
// PROTOTYPES
function Person(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthday = new Date(dob);
  // this.calculateAge = function () {
  //   const diff = Date.now() - this.birthday.getTime();
  //   const ageDate = new Date(diff);
  //   return Math.abs(ageDate.getUTCFullYear() - 1970)
  // }
}

// Return data
Person.prototype.calculateAge = function () {
  const diff = Date.now() - this.birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

// Manipulate data
Person.prototype.getsMarried = function (newLastName) {
  this.lastName = newLastName;
}

// Instantiate a new person
const john = new Person('John', 'Doe', '9-12-90')
const mary = new Person('Mary', 'Johnson', '4-12-82')
console.log(john.calculateAge());


// NOTES
// Each object has a prototype and the prototype is an object itself
// All objects inherit their properties and methods from their prototype
// Object literals inherit from a prototype called "Object.prototype"
// Objects that were created through a constructor (see example of constructor =person= above) inherits from Person.prototype
// There's a prototype chain where you have the main (Person.prototype) and you can then go up to the main Object.prototype (_proto_: Object)
// The method should go inside the prototype and not into the object


// ============
// ES6 Classess
class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
  }

  // Methods
  greeting() {
    return `Hello there ${this.firstName} ${this.lastName}`;
  }

  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getsMarried(newLastName) {
    this.lastName = newLastName;
  }

  // Static methods - stand-alone method - doesn't require an object reference
  // You're not using "this.something" in the method
  static addNumbers(x, y) {
    return x + y;
  }
}

// Instantiate
const mary = new Person('Mary', 'Williams');
console.log(mary)
console.log(mary.greeting());
console.log(mary.calculateAge());
mary.getsMarried('Thompson');
console.log(mary);
console.log(Person.addNumbers(1, 1));

// ==============================
// ES6 Sub-Classess (INHERITANCE)
class Person {
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greeting(){
    return `Hello there ${this.firstName} ${this.lastName}`;
  }
}

class Customer extends Person {
  constructor(firstName, lastName, phone, membership){
    super(firstName, lastName); // calls the parent class constructor

    this.phone = phone;
    this.membership = membership;
  }

  static getMembershipCost(){
    return 500;
  }
}

// Instantiate
const john = new Customer('John', 'Doe', '123-123-1234', 'Standard');
console.log(john);
console.log(john.greeting()); //call the function from Person
console.log(Customer.getMembershipCost()); //can't use Person.getMembershipCost()

