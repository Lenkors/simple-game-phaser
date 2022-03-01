const phaser = require('phaser');

const phaserConfig = {
    type: phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#0e0e0e',
    physics: {
       default: 'arcade',
       arcade: {
           gravity: { y: 200 }
       },
    },
    scene: {
       preload: preload,
       create: create,
       update: update,
    }
};

var game = new Phaser.Game(phaserConfig);

var data = {
    ball: false,
    paddle: false
};

 function preload () {
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // this.stage.backgroundColor = data.BackgroundColor; // это вариант для phaser 2
    
    this.load.image('ball', `public/image/ball.png`);
    this.load.image('paddle', 'public/image/paddle.png');
};

 function create () {
    // this.physics.startSystem(Phaser.Physics.ARCADE); // это вариант для phaser 2
    this.physics.arcade.checkCollision.down = false;
    data.ball = this.add.sprite(this.world.width*0.5, this.world.height-25, 'ball');
    data.ball.anchor.set(0.5);
    this.physics.enable(data.ball, Phaser.Physics.ARCADE);
    data.ball.body.velocity.set(150, -150);
    data.ball.body.collideWorldBounds = true;
    data.ball.body.bounce.set(1);
    data.ball.events.onOutOfBounds.add(function(){
        alert('Game over!');
        location.reload();
    }, this);

    data.paddle = this.add.sprite(this.world.width*0.5, this.world.height-5, 'paddle');
    data.paddle.anchor.set(0.5,1);
    this.physics.enable(data.paddle, Phaser.Physics.ARCADE);
    data.paddle.body.immovable = true;
};

 function update () {
    this.physics.arcade.collide(data.ball, data.paddle);
    paddle.x = this.input.x || this.world.width*0.5;
};