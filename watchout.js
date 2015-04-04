// start slingin' some d3 here.
var width = 700;
var height = 450;
var enemyCount = 10;
var radius = 10;
var x, y;
var score = 0;
var maxScore = 0;
var collisions = 0;
var highScore = d3.select('#high-score');
var currentScore = d3.select('#current-score');
var collisionCount = d3.select('#collision-count');


var randX = function(){
  return radius + Math.floor(Math.random() * (width -  2 * radius));
};
var randY = function(){
  return radius + Math.floor(Math.random() * (height -  2 * radius));
};
var checkCollisions = function(x, y) {
  var playerX = d3.select('circle.player').attr('cx');
  var playerY = d3.select('circle.player').attr('cy');
  var distance = Math.sqrt(Math.pow((playerX - x), 2) + Math.pow((playerY - y), 2));
  return distance < 2 * radius;
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
  enemies.transition() // watch for collisions in here
    .attr('cx', randX)
    .attr('cy', randY)
    .duration(1000)
    .tween('custom', function(d, i) {
      //console.log('Factory function. this: ' + this);
      //console.log('d.x: ' + d.x);
      return function(t) {
        //console.log('d.x: '+ d.x); 
        //console.log('d.y: '+ d.y);
        //console.log(enemies[0][i].getAttribute('cx'));
        //debugger;
        var enemy = enemies[0][i];
        
        if (checkCollisions(enemy.getAttribute('cx'), enemy.getAttribute('cy'))) {
          if (score > maxScore) {
            maxScore = score;
            highScore.text(maxScore);
          }
          score = 0;
          collisions++;
          collisionCount.text(collisions);
        }
      };
    });
  } , 1000);

setInterval(function() {
  score += 1;
  currentScore.text(score);
}, 50);

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
  .attr('class', 'player')
  .call(drag)
  .style('fill', function(d) {return d.color;});








