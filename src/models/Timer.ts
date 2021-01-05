interface Timer<T>{
    timer: T;
    cocktailTimer: T;
    isHardcore: boolean;
    timerVal: number;
    isTimerExist: boolean;
    isTimerOn: boolean;
    initTimerVal:number;
    isCocktailTimerOn: boolean;
    cocktailTimerVal: number;
    init():void;
    startTimer():void;
    stopTimer():void;
    startCocktailtimer():void;
    stopCocktailtimer():void;
    setTimerVal(val:number): void;
    success():void;
}

export class PopoutTimer implements Timer<NodeJS.Timeout>{
    timer:NodeJS.Timeout;
    cocktailTimer:NodeJS.Timeout;
    isHardcore:boolean;
    timerVal:number;
    isTimerExist: boolean;
    isTimerOn: boolean;
    initTimerVal:number;
    isCocktailTimerOn: boolean;
    cocktailTimerVal: number;

    constructor(
            public onClockDown:(time)=>void,
            public onCocktailClockDown:(time)=>void
        ){
        this.isHardcore = false;
        this.isTimerExist = false;
        this.isTimerOn = false
        this.isCocktailTimerOn = false;
    }

    init():void{
 
    };

    success():void{

    }

    clockDown=():void=>{
        if(this.timerVal <= 0){
            clearInterval(this.timer);
            this.isTimerExist = false;
            this.isTimerOn = false;
        }else{
            this.onClockDown(this.timerVal);
            this.setTimerVal(this.timerVal - 1);
        }
    }

    cocktailClockDown=():void=>{
        if(this.cocktailTimerVal <= 0){
            this.cocktailTimerVal = 0;
            this.stopCocktailtimer();
            this.onCocktailClockDown(this.cocktailTimerVal);
        }else{
            this.onCocktailClockDown(this.cocktailTimerVal);
            this.setCocktailTimerVal(this.cocktailTimerVal - 1);
        }
    }

    startTimer=():void=>{
            this.stopCocktailtimer();
            this.onClockDown(this.timerVal);
            if(this.isTimerExist === false) this.isTimerExist = true;
            this.isTimerOn = true;
            this.timer = setInterval(this.clockDown, 1000);
    };

    stopTimer=():void=>{
        this.isTimerOn = false;
        clearInterval(this.timer)
    };
    toggleTimer=():void=>{
        if(this.isTimerOn){
            this.stopTimer();
        }else{
            this.startTimer();
        }
    }
    startCocktailtimer=():void=>{
        this.isCocktailTimerOn = true;
        this.cocktailTimer = setInterval(this.cocktailClockDown, 1000);
    };
    stopCocktailtimer():void{
        clearInterval(this.cocktailTimer);
        this.isCocktailTimerOn = false;
    };
    toggleCocktailtimer = ():void =>{
        if(this.isCocktailTimerOn){
            this.stopCocktailtimer();
        }else{
            this.startCocktailtimer();
        }
    }
    setTimerVal=(val:number):void=>{
        this.timerVal = val;
    }
    setIsTimerOn=(x:boolean):void=>{
        this.isTimerOn = x;
    };
    setCocktailTimerVal=(val:number):void=>{
        this.cocktailTimerVal = val;
    }
}

export class BackgroundTimer implements Timer<NodeJS.Timeout>{
    timer:NodeJS.Timeout;
    cocktailTimer:NodeJS.Timeout;
    isHardcore:boolean;
    timerVal:number;
    isTimerExist: boolean;
    isTimerOn: boolean;
    initTimerVal:number;
    isCocktailTimerOn: boolean;
    cocktailTimerVal: number;
    reward: number;

    constructor(public onSuccess:()=>void, public onCocktailempty:()=>void){
        this.isHardcore = false;
        this.isTimerExist = false;
        this.isTimerOn = false
        this.isCocktailTimerOn = false;
        this.cocktailTimerVal = 10;
        //initate the current beverage
        chrome.storage.sync.get(['cocktailSet','cocktails'], (data)=>{
                if(data["cocktails"]){
                    //get the data from chrome storage
                    const cocktailSeconds =  data["cocktails"][data['cocktailSet']]["cocktailSeconds"]
                    const timeUntilReady = data["cocktails"][data['cocktailSet']]["timeUntilReady"]
                    this.setBeverage(cocktailSeconds, timeUntilReady);
                }else{
                    //no chrome storage data, so initiate with first cocktail
                    this.setBeverage(10, 60)
                }
        })
    }

    setBeverage(cocktailSeconds:number, timeUntilReady:number):void{
        this.reward = cocktailSeconds;
        this.timerVal = timeUntilReady;
        this.initTimerVal = timeUntilReady;
    }

    clockDown=():void=>{
        if(this.timerVal <= 0){
            this.success();
        }else{
            this.setTimerVal(this.timerVal - 1);
        }
    }


    init():void{

    };
    setTimerVal(x:number):void{
        this.timerVal = x;
    }
    success=():void=>{
        clearInterval(this.timer);
        this.isTimerExist = false;
        this.isTimerOn = false;
        chrome.storage.sync.get(["cocktailSeconds", 'cocktailSet','cocktails', 'cash'], (data)=>{
            const name = data['cocktailSet'];
            const cash = data['cash'];
            let cocktails = data["cocktails"];
            cocktails[name]["uses"] = cocktails[name]["uses"] + 1;
            chrome.storage.sync.set({
                cocktails: cocktails,
                cash: cash + cocktails[name]["cashPrize"]
            });
            chrome.runtime.sendMessage({
                "message": "success", 
                "time": this.initTimerVal,
                "data": this.cocktailTimerVal +  this.reward, 
                "isHardcore":this.isHardcore
            })
            this.setCocktailTimerVal(this.cocktailTimerVal + this.reward);
            this.setTimerVal(this.initTimerVal);
            this.onSuccess();
            this.saveSeconds(this.initTimerVal);
            if(this.isHardcore){
                this.startCocktailtimer();
            }
        });
    }

    startTimer():void{
        this.stopCocktailtimer();
        if(this.isTimerExist === false) this.isTimerExist = true;
        this.isTimerOn = true;
        this.timer = setInterval(this.clockDown, 1000);
    };

    stopTimer():void{
        this.isTimerOn = false;
        clearInterval(this.timer);
    };

    toggleTimer():void{
        if(this.isTimerOn){
            this.stopTimer();
        }else{
            this.startTimer();
        }
    }

    startCocktailtimer():void{
        if(this.isCocktailTimerOn == false){
            this.isCocktailTimerOn = true;
            this.cocktailTimer = setInterval(this.cocktailClockDown, 1000);
        }
    };

    stopCocktailtimer():void{
        this.isCocktailTimerOn = false;
        clearInterval(this.cocktailTimer);
    };
    
    toggleCocktailtimer = ():void =>{
        if(this.isCocktailTimerOn){
            this.stopCocktailtimer();
        }else{
            this.startCocktailtimer();
        }
    }
    toggleHardcore(){
        this.isHardcore = !this.isHardcore;
    }
    setCocktailTimerVal=(val:number):void=>{
        this.cocktailTimerVal = val;
    }
    setTimerVal=(val:number):void=>{
        this.timerVal = val;
    }
    saveSeconds(seconds:number):void{
        let minutes = Math.floor(seconds / 60);
        let date = new Date().toDateString();
        let date2 = date.split(" ")[1]+date.split(" ")[3];
        let allData = {};
        chrome.storage.sync.get("allData", function(data){
            if(data){
                allData = data["allData"];
            }
            if(date in allData){
                allData[date] += minutes;
            }else{
                allData[date] = minutes;
            }
            //for the whole month
            if(date2 in allData){
                allData[date2] += minutes;
            }else{
                allData[date2] = minutes;
            }
            chrome.storage.sync.set({'allData': allData});
        })
    }
    cocktailClockDown=():void=>{
        if(this.cocktailTimerVal <= 0){
            this.cocktailTimerVal = 0;
            this.onCocktailempty();
            this.stopCocktailtimer();
            //hardcore mode
            if(this.isHardcore){
                this.startTimer()
                chrome.runtime.sendMessage({
                    "message":"hardcoreTimerStart",
                    'timerVal': this.timerVal
                })
            }
        }else{
            this.setCocktailTimerVal(this.cocktailTimerVal - 1);
        }
    }
}