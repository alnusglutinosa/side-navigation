'use strict';

class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

var user = new User('User-1');
user.sayHi();
