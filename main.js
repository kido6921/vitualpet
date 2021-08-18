let game = new Phaser.Game (500,600,Phaser.CANVAS)

let GameState = {
    init: function() {
        this.load.crossOrigin = 'Anonymous' ;

        this.scale.scaleMode = Phaser.ScaleManager. SHOW_ALL
        this.scale.pageAlignHorizantally= true
        this.scale.pageAlignvertically = true


    },

    preload: function () {
        this.load.image('background','assets/images/background.png')
        this.load.image('apple','assets/images/apple.png')
        this.load.image('candy','assets/images/apple.png')
        this.load.image('gameover','assets/images/gameover.png')
        this.load.image('happy','assets/images/happy.png')
        this.load.image('heart','assets/images/heart.png')
        this.load.image('pet','assets/images/pet.png')
        this.load.image('toy','assets/images/toy.png')
        this.load.image('rotate','assets/images/rotate.png')
 
 
    },
    create: function() {
        this.background= this.game.add.sprite(0,0 ,'background')
        this.background.inputEnable= true
        this.background.events.onInputDown.add(this.placeItem,this)

        this.pet= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'pet')
        this.pet.anchor.setTo (0.5,0.5)
        this.pet.scale.setTo(0.8,0.8)

        this.pet.animation.add('funnyfaces',[1,2,3,1],7,false)
        this.pet.customParams= {health:100,fun: 100}
    },

    placeItem: function(sprite,event) {},


}
game.state.add('Gamestate',GameState)
game.state.start('Gamestate')
