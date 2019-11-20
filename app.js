const output = [];
const array = ['h','e','l','l','o'];

//creates async behavior and prints "..." to show it's place in the program
const asyncTester = async (letter) => {
  await stall();
  console.log('...');
  return `${letter}`;
}

//fake async creator with random time up to 1 second
const stall = async (stallTime = Math.floor(Math.random() * 1000)) => {
  await new Promise(resolve => setTimeout(resolve, stallTime));
};

//forces sync behavior by running each loop in order. Slow but predictable.
//async label allows for use of await inside the function
const forLoopSync = async () => {
  //normal for loop
  for (let i=0; i<array.length; i++) {
    //prints "." as each loop fires
    console.log('.');
    //awaits async and logs the sent value to variable named letter
   	const letter = await asyncTester(array[i]);
    //logs the returned variable as it is returned
    console.log(`${letter} is done`);
    //adds letter to array in order since this version is forced to run sync
    output.push(letter);
  }
}

//forces sync behavior by running all loops at once but awaiting completion of all prior to closure.
//Much faster but unpredictable order of return.
//async label allows for use of await inside the function
const forLoopParalell = async () => {
  //creates a variable containing the promises triggered by running each item in array to the iterate function
  const promises = await array.map(iterate);
  //awaits completion of all promises in the variable above before closing async function
  await Promise.all(promises)
}

//function to be run on each item in the above parallel loop
const iterate = async (thisLet) => {
  //prints "." as each loop fires
  console.log('.');
  //awaits async and logs the sent value to variable named letter
  const letter = await asyncTester(thisLet);
  //logs the returned variable as it is returned
  console.log(`${letter} is done`);
  //adds letter to array in whatever order it is returned
  //This will be random as all are run parallel with random stallTime
  output.push(letter);
}

//wraps the main program flow to allow for async/await. Could be run anonymously instead
const newOutput = async () => {
//comment out the one you don't want to run *********************************************************************************
  // await forLoopParalell();
  await forLoopSync();
  //after the loop is over the following will run
  console.log("--------------------");
  //another delay
  await stall();
  //print out the constructed array as a joined string
  console.log(output.join(""));
}

//run program
newOutput();
