'use strict';
let pill;
const colors = [
  '#808080',
  '#FFFF00',
  '#0000FF'
];

const append_piece = (matrix, piece) => {
  const first_part1 = matrix[0].slice(0, 3);
  const first_part2 = matrix[1].slice(0, 3);
  const second_part1 = matrix[0].slice(5, 9);
  const second_part2 = matrix[1].slice(5, 9);
  console.log(first_part, second_part)
};

//
// var arr = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
// var anotherArr = [ 1, 2, 3 ];
//
// Array.prototype.splice.apply(arr, [0, anotherArr.length].concat(anotherArr));
//
// console.log(arr);
create_pill();

append_piece(board.create_matrix(), pill.return_piece());

