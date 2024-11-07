import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();

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
const model = solver.model();
const bobVal = model.eval(Bob);
const sueVal = model.eval(Sue);
const maryVal = model.eval(Mary);
const cathyVal = model.eval(Cathy);

console.log(`Bob: ${bobVal}`);
console.log(`Sue: ${sueVal}`);
console.log(`Mary: ${maryVal}`);
console.log(`Cathy: ${cathyVal}`);
}else{
    console.log("unsat");
}