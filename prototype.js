// 实现类和继承
function Animal(earNumber) {
    this.ears = earNumber;
}

Animal.prototype.kind = '动物';


function Dog (name) {
    this.name = name;
    Animal.call(this, 2);
}

Dog.prototype.__proto__ = Animal.prototype;

Dog.prototype.kind = '狗';
Dog.prototype.say = function() {
    console.log(`这是一只${this.kind},名字是${this.name}`);
}
Dog.prototype.bear = function() {
    console.log(`${this.kind}嚎叫!!!,有${this.ears}只耳朵`);
}

const dog = new Dog('我要奋斗');

dog.bear();
dog.say();

console.log(dog instanceof Animal);

class AnimalClass {
    kind = '动物'
    constructor(value) {
        this.ears = value;
    }
}

class Cat extends AnimalClass{
    constructor(value) {
        super(2);
        this.name = value;
    }
    kind = '猫'
    say() {
        console.log(`这是一只${this.kind},名字是${this.name}`);
    }
    bear() {
        console.log(`${this.kind}嚎叫!!!, 它有${this.ears}只耳朵`);
    }
}

const cat = new Cat('稳定');

cat.bear();
cat.say();

