const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var particles=[];
var plinkos = [];
var divisions =[];
var divisionHeight = 300;
var ground;
var gameState="start"
var count=0;
var turn=0;
var score=0;

function setup() {
	createCanvas(480, 800);


	engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20)
  

  for(var k = 0;k<=width;k = k+80){
    divisions.push(new Division(k,height-divisionHeight/2,10,divisionHeight))
  }

  for(var j = 75; j <=width; j=j+50)
  {
    plinkos.push(new Plinko(j,75));
  }

  for(var j = 50; j<=width-10; j=j+50)
  {
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 75; j<=width;j=j+50)
  {
    plinkos.push(new Plinko(j,275));
  }

  for(var j = 50; j<=width-10; j=j+50)
  {
    plinkos.push(new Plinko(j,375));
  }

  
  
  
  
  
  Engine.run(engine);
  
}


function draw() {
  background("black");
  textSize(35)
  text("Score: "+score,20,40)
  text("Count: "+count,40,60)
   
  textSize(35)
  fill("lightgreen")
  text("500",5,550)
  text("400",90,550)
  text("300",180,550)
  text("200",260,550)
  text("150",340,550)
  text("100",410,550)

  Engine.update(engine);
  ground.display();

  for(var i=0;i<plinkos.length;i++){
    plinkos[i].display();
  }
  
  if(frameCount%60===0){
    particles.push(new Particle(random(width/2-30,width/2+30),10,10))
    //score++;
  }

  for(var j = 0; j<particles.length;j++){
    particles[j].display();
  }

  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }
  
  if (particles.body.position.y>600) 
  {
    if(particles.body.position.x >= 0 && particles.body.position.x<=330)
    {
   
      score=score+500;
      particles=null;
      if(count>= 5) {gameState ="end";}
    }      
  }
}

if(particles!=null)
{    
  particles.display();
  if (particles.body.position.y>600) 
  {      
    if (particles.body.position.x>330 && particles.body.position.x<=520) 
    {
      //count--;  //reducing one extra increase 
      score=score+100;
      particles=null;
      if(count >= 5) {gameState ="end";}               
    }     
  }
}

if(particles!=null)
{
  particles.display();
  if (particles.body.position.y>600) 
  {      
    if (particles.body.position.x>520 && particles.body.position.x<800) 
    {
     
      score=score+200;
      particles=null;
      if(count >= 5) {
        gameState ="end";
      }
    }     
  }
}

if (gameState == "end") {
  textSize(80)
  text("GAME OVER!!!", 150, 350)
}


function mousePressed()
{
if (gameState != "end")
{
  count++;  
  particles = new Particle(mouseX, 10, 10, 10);    
}
}
  








 
