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
        this.load.image('candy','assets/images/candy.png')
        this.load.image('gameover','assets/images/gameover.png')
        this.load.image('fun','assets/images/happy.png')
        this.load.image('health','assets/images/heart.png')
        this.load.spritesheet('pet','assets/images/pet.png',97,83)
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

        this.pet.animations.add('funnyfaces',[1,2,3,1],7,false)
        this.pet.customParams= {health:100,fun: 100}

        this.pet.inputEnabled = true
        this.pet.input.enableDrag()

        //apple
        this.apple = this.game.add.sprite(this.game.width/6,550,'apple')
        this.apple.anchor.setTo(0.5,0.5)
        this.apple.scale.setTo (0.8,0.8)
        this.apple.inputEnabled = true 
        this.apple.customParams = { health:20} 

        //candy
        this.candy = this.game.add.sprite(this.game.width/2-60,550,'candy')
        this.candy.anchor.setTo(0.5,0.5)
        this.candy.scale.setTo (0.8,0.8)
        this.candy.inputEnabled = true 
        this.candy.customParams = { health:-10,fun:15} 

        //toy
        this.toy = this.game.add.sprite(this.game.width/2+60,550,'toy')
        this.toy.anchor.setTo(0.5,0.5)
        this.toy.scale.setTo (0.8,0.8)
        this.toy.inputEnabled = true 
        this.toy.customParams = { fun:30} 

        //rotate
        this.rotate = this.game.add.sprite(this.game.width/1.2,550,'rotate')
        this.rotate.anchor.setTo(0.5,0.5)
        this.rotate.scale.setTo (0.8,0.8)
        this.rotate.inputEnabled = true 
        this.rotate.events.onInputDown.add(this.rotatePet,this)


        this.apple.events.onInputDown.add(this.pickItem,this)
        this.candy.events.onInputDown.add(this.pickItem,this)
        this.toy.events.onInputDown.add(this.pickItem,this)
        
        this.buttons = [this.apple,this.candy,this.toy,this.rotate]
        this.selectedItem = null
        this.uiBlocked = false

        let style = {font : 'bold 25px Arial', fill: '#fff'}

        this.healthImage = this.game.add.sprite(this.game.width/10,this.game.height/15,'health')
        this.healthImage.scale.setTo(0.6,0.6)
        this.healthImage.anchor.setTo(1,1)

        this.healthText=this.game.add.text(this.game.width/9,this.game.height/15,0,style)
        this.healthText.anchor.setTo(0,1)

        this.funImage = this.game.add.sprite(this.game.width/10,this.game.height/7,'fun')
        this.funImage.scale.setTo(0.6,0.6)
        this.funImage.anchor.setTo(1,1)

        this.funText=this.game.add.text(this.game.width/9,this.game.height/7,0,style)
        this.funText.anchor.setTo(0,1)

        this.refreshStats()
      
    },
    refreshStats:function(){
        this.healthText.text = this.pet.customParams.health 
        this.funText.text = this.pet.customParams.fun 
    },
    pickItem: function(sprite){
    if (!this.uiBlocked){
        this.clearSelection()
        sprite.alpha = 0.4
        this.selectedItem = sprite
    }
    },
    clearSelection: function(){
        this.buttons.forEach(function(element){
            element.alpha = 1
        })
        this.selectedItem = null 


    },
    placeItem: function(sprite,event) {
        if(this.selectedItem && !this.uiBlocked){
            let x = event.position.x
            let y = event.position.y

            let newItem =  this.game.add.sprite(x,y,this.selectedItem.key)
            newItem = this.anchor.setTo(0.5)
            newItem.customParams = this.selectedItem.customParams
            
            this.uiBlocked = true
            let petMovement = this.game.add.tween(this.pet)
            petMovement.to({x:x, y:y},700)

            petMovement.onComplete.add(function(){
                newItem.destroy()
                this.pet.animations.play('funnyfaces')
                this.uiBlocked = false;
                console.log(newItem)
                let stat; 
                for (stat in newItem.customParams){
                if (newItem.customParams.hasOwnProperty(stat)){
                    console.log(stat)
                    this.pet.customParams[stat] += newItem.customParams[stat]
                }
            }
            this.refreshStats;
        }, this);
        }
        petMovement.start();

    
        
        
    },
    rotatePet:function(sprite){
        if(!this.iuBlocked){
            this.uiBlocked =true 
            this.clearSelection()
            sprite.alpha = 0.4
            let petRotation = this.game.add.tween(this.pet)
            petRotation.to({angle:'+720'},2000)
            petRotation.onComplete.add(function(){
                this.uiBlocked = false
                sprite.alpha = 1
                this.pet.customParams.fun +=15
                this.refreshStats() 
                
            },this)
            petRotation.start()

            
        }
    }


}
game.state.add('Gamestate',GameState)
game.state.start('Gamestate')
