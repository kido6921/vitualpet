let game = new Phaser.Game (500,600,Phaser.CANVAS)

let GameState = {
    init: function() {
        this.load.crossOrigin = 'Anonymous' ;

        this.scale.scaleMode = Phaser.ScaleManager. SHOW_ALL
        this.scale.pageAlignHorizantally= true
        this.scale.pageAlignvertically = true


    }
}
