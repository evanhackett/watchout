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


var enemyData = [];
// [o]
for(var i = 0; i < enemyCount; i++){
  x = randX();
  y = randY();
  enemyData.push({x: x, y: y});
}

var board = d3.select('#board');

var enemies = board.selectAll('circle.enemy')
  .data(enemyData).enter()
  .append('circle');

enemies.attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;})
  .attr('r', radius)
  .attr('class', 'enemy');

setInterval(function(){
  enemies
    .attr('cx', randX)
    .attr('cy', randY);
  } , 1000);

// create friendly circle

var drag = d3.behavior.drag()
  .on('dragstart', function() {player.style('fill', 'blue');})
  .on('drag', function() {player.attr('cx', d3.event.x)
                                .attr('cy', d3.event.y); })
  .on('dragend', function() {player.style('fill', 'red');});

var playerData = [{'x' : width / 2, 'y' : height / 2, 'r' : radius, 'color' : 'red'}];
var player = board.selectAll('circle.player').data(playerData).enter().append('circle')
  .attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;})
  .attr('r', function(d) {return d.r;})
  .call(drag)
  .style('fill', function(d) {return d.color;});








