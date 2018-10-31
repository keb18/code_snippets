// ==================
// Person constructor
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

// =====================
// Built-in constructors
