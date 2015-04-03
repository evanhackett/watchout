// start slingin' some d3 here.
var width = 700;
var height = 450;
var enemyCount = 30;
var radius = 10;
var x, y;
var randX = function(){
  return radius + Math.floor(Math.random() * (width -  2 * radius));
};
var randY = function(){
  return radius + Math.floor(Math.random() * (height -  2 * radius));
};


var data = [];
// [o]
for(var i = 0; i < enemyCount; i++){
  x = randX();
  y = randY();
  data.push({x: x, y: y});
}

var board = d3.select('#board');

var enemies = board.selectAll('circle')
  .data(data).enter()
  .append('circle');

enemies.attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;})
  .attr('r', radius);


setInterval(function(){
  enemies
    .attr('cx', randX)
    .attr('cy', randY);
  } , 1000);