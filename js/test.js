/** @format */

// function for convert string to number and return total of numbers

const returnBinary = (str) => {
  const result = str
    .split("")
    .map((res) => res.charAt(0).charCodeAt(0).toString(8))
    .join(" ");

  const arr = [...result.split(" ")];
  const total = arr.reduce((acc, current) => acc + parseInt(current), 0);

  return total;
};

console.log(returnBinary("Love to Code"));

// function for convert string to octal

const stringToOctal = (string) => {
  const result = string
    .split("")
    .map((data) => data.charAt(0).charCodeAt(0).toString(8))
    .join(" ");
  return result;
};

console.log(stringToOctal("Shajib"));

// function for convert octal  number to string

const binaryToString = (number) => {
  const result = number
    .split(" ")
    .map((ltr) => String.fromCharCode(parseInt(ltr, 8)))
    .join(" ");
  return result;
};

console.log(binaryToString("110 111 "));
