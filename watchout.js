var h = 450,
    w = 700,
    container = d3.select('#board')
                  .attr({
                    width : w,
                    height : h
                  });


var playArea = {
  width: w,
  height: h,
  // x : w * 0.1,
  // y : h * 0.1,
  x : 0,
  y : 0,
  rx : 20,
  ry : 20,
};
// setup player area (player can't move outside of this rect)
container.append('rect').attr(playArea);

var randomPlayAreaX = function() {
  return Math.random() * playArea.width + playArea.x;
};

var randomPlayAreaY = function() {
  return Math.random() * playArea.height + playArea.y;
};

var resetEnemyList = function() {return d3.range(5);};
var enemyList = resetEnemyList();

var enemyRadius = 15,
  randomX = function() {return Math.random() * w;},
  randomY = function() {return Math.random() * h;},
  enemies = container.selectAll('circle.enemy')
                     .data(enemyList)
                     .enter()
                     .append('circle')
                     .attr({
                        class: 'enemy',
                        cx : randomX,
                        cy : randomY,
                        r : enemyRadius,
                        fill: 'url(#image)'
                     });

var enemySpeed = 1;

var move = function() {
  enemies.transition()
         .ease('linear')
         .duration(1000/enemySpeed)
         .attr({
          cx : randomX,
          cy : randomY
         })
         .each('end', move);
};
move();

var playerRadius = 15,
    player = container.append('circle')
                      .attr({
                        cx : w / 2,
                        cy : h / 2,
                        r : playerRadius,
                        fill : 'blue'
                      });

player.call(d3.behavior.drag()
                       .on('drag', function() {
                          
                        if (d3.event.x < playArea.width+playArea.x-playerRadius && d3.event.x > playArea.x+playerRadius) {
                          d3.select(this).attr('cx', d3.event.x);
                        }
                        if (d3.event.y < playArea.height+playArea.y-playerRadius && d3.event.y > playArea.y+playerRadius) {
                          d3.select(this).attr('cy', d3.event.y);
                        }

                       }));


var detectEnemyCollision = function() {
  enemies.each(function() {
    var enemy = d3.select(this);
    var x = Math.abs(enemy.attr('cx') - player.attr('cx'));
    var y = Math.abs(enemy.attr('cy') - player.attr('cy'));
    var distance = Math.sqrt((x*x) + (y*y));
    if (distance <= enemyRadius + playerRadius) collideWithEnemy();
  });
};

var collideWithEnemy = function() {
  enemySpeed = 1;
  currentScore = 0;
  enemyList = resetEnemyList();
  container.selectAll('circle.enemy')
           .data(enemyList)
           .exit()
           .remove();
  player.attr('fill', 'red');
  setTimeout(function() {
    player.attr('fill', 'blue');
  }, 0);
};

d3.timer(detectEnemyCollision);

var detectSlowDownOrbCollision = function() {
  container.selectAll('circle.slowDownOrb').each(function() {
    var orb = d3.select(this);
    var x = Math.abs(orb.attr('cx') - player.attr('cx'));
    var y = Math.abs(orb.attr('cy') - player.attr('cy'));
    var distance = Math.sqrt((x*x) + (y*y));
    if (distance <= enemyRadius + playerRadius) collideWithSlowDownOrb();
  });
};

var collideWithSlowDownOrb = function() {
  enemySpeed *= 0.95;
  container.selectAll('circle.slowDownOrb')
           .data([])
           .exit()
           .remove();
};

d3.timer(detectSlowDownOrbCollision);

var calculateSpeedPercentage = function() {
  return enemySpeed*100;
};

var currentScore = 0,
    hiScore = 0,

    updateScoreBoard = function() {
      hiScore = Math.max(hiScore, currentScore);
      currentScore += enemyList.length-4;
      d3.select('.enemies span').text(enemyList.length);
      d3.select('.current span').text(currentScore);
      d3.select('.high span').text(hiScore);
      d3.select('.enemySpeed span').text(Math.round(calculateSpeedPercentage())+'%');
      d3.select('.enemyCount span').text(enemyList.length);
    };
setInterval(updateScoreBoard, 100);

var addEnemy = function() {
  enemyList.push(1);
  container.selectAll('circle.enemy')
                     .data(enemyList)
                     .enter()
                     .append('circle')
                     .attr({
                        class : 'enemy',
                        cx : randomX,
                        cy : randomY,
                        r : enemyRadius,
                        fill: 'url(#image)'
                     });
  enemies = container.selectAll('circle.enemy');
};
setInterval(addEnemy, 5000);

var increaseEnemySpeed = function() {
  enemySpeed *= 1.01;
};
setInterval(increaseEnemySpeed, 1000);

var spawnSlowDownOrb = function() {
  if (container.selectAll('circle.slowDownOrb').empty()) {
    container.append('circle')
            .attr({
              class : 'slowDownOrb',
              r : enemyRadius,
              cx : randomPlayAreaX,
              cy : randomPlayAreaY,
              fill : 'cyan'
            });
  }
};
setInterval(spawnSlowDownOrb, 1000);


// TODO: 
// add bomb that resets enemy count
// refactor detectCollision functions into a single more general function that takes a selection and a callback


