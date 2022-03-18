const phaser = require('phaser');


var BreakOutGame = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function BreakOutGame ()
    {
        Phaser.Scene.call(this, { key: 'BreakOutGame' });

        this.bricks;
        this.paddle;
        this.ball;
    },

    preload: function () {
        this.load.atlas('assets', '../assets/img/breakout.png', '../assets/json/breakout.json');
    },

     create: function () {
    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
        key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
        frameQuantity: 10,
        gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
    });

    this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

    //  Our colliders
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    //  Input events
    this.input.on('pointermove', function (pointer) {

        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

        if (this.ball.getData('onPaddle'))
        {
            this.ball.x = this.paddle.x;
        }

    }, this);

    this.input.on('pointerup', function (pointer) {

        if (this.ball.getData('onPaddle'))
        {
            this.ball.setVelocity(-75, -300);
            this.ball.setData('onPaddle', false);
        }

    }, this);
},
hitBrick: function (ball, brick)
{
    brick.disableBody(true, true);

    if (this.bricks.countActive() === 0)
    {
        this.resetLevel();
    }
},

resetBall: function ()
{
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData('onPaddle', true);
},

resetLevel: function ()
{
    this.resetBall();

    this.bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);

    });
},
     update: function () {
        if (this.ball.y > 600)  {
            this.resetBall();
        }
    }
})

const phaserConfig = {
    type: phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#0e0e0e',
    physics: {
       default: 'arcade',
       arcade: {
        debug: true,
       },
    },
    scene: [BreakOutGame]
};

var game = new Phaser.Game(phaserConfig);