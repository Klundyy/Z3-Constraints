import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

// Children's Logic Puzzle

let solver = new Solver();

const Bob = Int.const('bob');
const Mary = Int.const('mary');
const Cathy = Int.const('cathy');
const Sue = Int.const('sue');

solver.add(Bob.ge(0), Bob.le(3));
solver.add(Mary.ge(0), Mary.le(3));
solver.add(Cathy.ge(0), Cathy.le(3));
solver.add(Sue.ge(0), Sue.le(3));

solver.add(Distinct(Bob, Mary, Cathy, Sue));

solver.add(Bob.ge(1),Bob.le(2));
solver.add(And(Sue.ge(1),Sue.le(2)));
solver.add(Mary.le(2));

// 0 = Cat
// 1 = Dog
// 2 = Bird
// 3 = Fish

// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

// Extract value for x
let model = solver.model();
const bobVal = model.eval(Bob);
const sueVal = model.eval(Sue);
const maryVal = model.eval(Mary);
const cathyVal = model.eval(Cathy);
const animals = ["Cat","Dog","Bird","Fish"];

console.log(`Bob: ${animals[bobVal]}`);
console.log(`Mary: ${animals[maryVal]}`);
console.log(`Cathy: ${animals[cathyVal]}`);
console.log(`Sue: ${animals[sueVal]}`);

}else{
    console.log("unsat");
}

// Game costraints

// Inside Fence at with fence coordinates of x=5,15 & y=15,25

solver = new Solver();
let x = Int.const('x');
let y = Int.const('y');

solver.add(And(x.gt(5), x.lt(10), y.gt(15), y.lt(25)));

if (await solver.check() === "sat") {
    let model = solver.model();
    let xVal = model.eval(x);
    let yVal = model.eval(y);
    console.log(`Inside fence, x = ${xVal}, y = ${yVal}`);
}

// On Fence at with fence coordinates of x=5,15 & y=15,25

solver = new Solver();
x = Int.const('x');
y = Int.const('y');

solver.add(Or(And(Or(x.eq(5),x.eq(10)), y.gt(15), y.lt(25)),And(Or(y.eq(15),y.eq(25)), x.gt(5), x.lt(10))));

if (await solver.check() === "sat") {
    let model = solver.model();
    let xVal = model.eval(x);
    let yVal = model.eval(y);
    console.log(`On fence, x = ${xVal}, y = ${yVal}`);
}

// Outside Fence at with fence coordinates of x=5,15 & y=15,25

solver = new Solver();
x = Int.const('x');
y = Int.const('y');

solver.add(Or(x.lt(5), x.gt(10), y.lt(15), y.gt(25)));

if (await solver.check() === "sat") {
    let model = solver.model();
    let xVal = model.eval(x);
    let yVal = model.eval(y);
    console.log(`Outside fence, x = ${xVal}, y = ${yVal}`);
}