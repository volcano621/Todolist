function Animal() {
  this.eat = function () {
    console.log("吃东西");
  };
}

function Cat() {
  Animal.call(this);
}

let cat = new Cat();

cat.eat();

let people = {
  name: "人",
  sport(sport1, sport2) {
    console.log(this.name + " can " + sport1 + " and " + sport2);
  },
};

let stu = {
  name: "tjy",
};

people.sport.call(stu, "run", "swim");
people.sport.apply(stu, ["run", "swim"]);
let fun = people.sport.bind(stu, "run", "swim");
fun();
