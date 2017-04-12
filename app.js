new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameisRunning: false,
        turns: []
    },
    methods:{
        startGAME: function(){
            this.gameisRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns =[]
        },
        attack: function(){
            var damage = this.calculateDamage(3,10)
            this.monsterHealth -= damage;
            if(this.checkWin()){
                return
            } 
            this.turns.unshift({
                isPlayer: true,
                text: 'PLAYER HITS MONSTER FOR' + damage
            })
            this.monsterAttack()
        },
        monsterAttack: function(){ 
            var damage =  this.calculateDamage(5,12)
            this.playerHealth -= damage; 
            this.turns.unshift({
                isPlayer: false,
                text: 'MONSTER HITS PLAYER FOR' + damage
            }) 
            this.checkWin();
        },
        specialAttack: function(){
            var damage= this.calculateDamage(4,15)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'PLAYER HITS MONSTER HARD FOR' + damage
            }) 
            if(this.checkWin()){
                return
            } 
            this.monsterAttack() 
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth +=10
            } else {
                this.playerHealth = 100
            } 
            this.turns.unshift({
                isPlayer: true,
                text: 'PLAYER HEALS MONSTE FOR 10'
            }) 
            this.monsterAttack();
        },
        giveUp: function(){
            this.gameisRunning = false 
        }, 
        calculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random()* max)+ 1 ,min)
        },
        checkWin: function(){ 
            if(this.monsterHealth <= 0){
                if (confirm('YOU WON! NEW GAME?')){;
                this.startGAME()
                                                  }
                else{
                    this.gameisRunning = false
                }
                return true;                      
            }else if(this.playerHealth<= 0){
                if (confirm('YOU lost! NEW GAME?')){;
                this.startGAME()                 }
                else{
                    this.gameisRunning = false
                }
                return true;                      
            }
            return false;
            
        }
    }
});