// start slingin' some d3 here.
var width = 700;
var height = 450;
var enemyCount = 30;
var radius = 10;
var x, y;

var data = [];
// [o]
for(var i = 0; i < enemyCount; i++){
  x = radius + Math.floor(Math.random() * (width -  2 * radius));
  y = radius + Math.floor(Math.random() * (height - 2 * radius));
  data.push({x: x, y: y});
}
console.log(data);


var board = d3.select('#board');

board.selectAll('circle').data(data).enter().append('circle').attr('cx', function(d) {return d.x;})
                                                            .attr('cy', function(d) {return d.y;})
                                                            .attr('r', radius);