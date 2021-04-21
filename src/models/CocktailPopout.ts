import {PopoutTimer} from "./Timer"
import {LevelSystem} from "./LevelSystem"
import {Stats, DateNodeType} from "./Stats"
const lvlDef = [
    {
        start: 1,
        end: 1,
        xpPerLevel: 3600,
    },
    {
        start: 2,
        end: 2,
        xpPerLevel: 3600*5,
    },
    {
        start: 3,
        end: 3,
        xpPerLevel: 3600*25,
    },
    {
        start: 4,
        end: 4,
        xpPerLevel: 3600*100,
    },
    {
        start: 5,
        xpPerLevel: 99999999999,
    }
]

const labelDef = [
    {
        start: 1,
        end: 1,
        label: "#74b9ff"
    },
    {
        start: 2,
        end: 2,
        label: "#0984e3"
    },
    {
        start: 3,
        end: 3,
        label: "#6c5ce7"
    },
    {
        start: 4,
        end: 4,
        label: "#cc2152"
    },
    {
        start: 5,
        xpPerLevel: 99999999999,
        label: "#d67047"
    }
]

const upgradeDef =[
    {
        start: 1,
        end: 1,
        xpPerLevel: 100,
    },
    {
        start: 2,
        end: 2,
        xpPerLevel: 500,
    },
    {
        start: 3,
        end: 3,
        xpPerLevel: 1000,
    },
    {
        start: 4,
        xpPerLevel: 99999999999999,
    }
]

const upgradeLabelDef = [
    {
        start: 1,
        end: 1,
        label: "1"
    },
    {
        start: 2,
        end: 2,
        label: "2"
    },
    {
        start: 3,
        end: 3,
        label: "3"
    },
    {
        start: 4,
        label: "4"
    }
]

const minutesDisplayDef = [
    {
        start: 1,
        end: 1,
        xpPerLevel: 60,
    },
    {
        start: 2,
        end: 2,
        xpPerLevel: 24*60,
    },
    {
        start: 3,
        end: 3,
        xpPerLevel: 7*24*60,
    },
    {
        start: 4,
        end: 4,
        xpPerLevel: 4*7*24*60,
    },
    {
        start: 5,
        end: 5,
        xpPerLevel: 12*4*7*24*60,
    },
    {
        start: 6,
        xpPerLevel: -1,
    },
]

const minutesDisplayLabelDef = [
    {
        start: 1,
        end: 1,
        label: "M"
    },
    {
        start: 2,
        end: 2,
        label: "H"
    },
    {
        start: 3,
        end: 3,
        label: "D"
    },
    {
        start: 4,
        end: 4,
        xpPerLevel: 4*7*24*60,
        label: "W"
    },
    {
        start: 5,
        end: 5,
        label: "M"
    },
    {
        start: 6,
        label: "Y"
    },
]

const cocktailIconRef = document.getElementById('cocktail-icon-text');
const timerIconRef = document.getElementById('timer-icon-text');
const cashIconRef = document.getElementById('cash-icon-text');
const cardXPRef = document.getElementById('card-xp-text');
const cardNameRef =  <HTMLElement>document.querySelector('.card-name');
const cardImageRef = <HTMLElement>document.querySelector(".cocktailIcon");
const cardProgress = <HTMLElement>document.querySelector(".progress");
const menuSelectorRef =  <HTMLElement>document.getElementById('selector');
const cardPlayButtonRef = <HTMLElement>document.querySelector("#card-play-button");
const dataColumns = document.querySelectorAll(".bars .column .val") as NodeListOf<HTMLElement>;
const eyeSwitchCheckRef = <HTMLInputElement>document.getElementById("eye-switch-check");
const eyeSwitchRefSlider = <HTMLElement>document.getElementById("eye-switch .slider");
const cardRef = <HTMLElement>document.querySelector(".cocktail-card-wrapper");
const minutesTodayRef = <HTMLElement>document.getElementById('today');
const navbarBlockerRef = <HTMLElement>document.getElementById('nav-block')
const clockRef = document.getElementById('clock');
const cockTimeRef = document.getElementById('cockTime');
const homeRef = document.getElementById("home")
const timerValRef = document.getElementById("cockTime")
const cocktimeIconRef = document.getElementById("cockTimeIcon") as HTMLImageElement;
const eyeRef = document.getElementById("eye") as HTMLImageElement;
const todayTimeRef = document.getElementById("today")
const eyeSwitchSliderRef =  <HTMLElement>document.getElementById("eye-switch").querySelector(".slider")
const timerToggleRef = document.getElementById("timerToggle");
const storeBlockerRef = <HTMLElement>document.querySelector(".store-container-block");
const cocktailButtonIcon = document.getElementById("cockTimeIcon")
const cocktailButtonText = document.getElementById("cockTime")
const statsRef = document.getElementById('stats');
const barRef = document.getElementById('bar');
const statsNavRef =  document.getElementById('stats-menu-icon');
const homeNavRef =  document.getElementById('home-menu-icon');
const barNavRef =  document.getElementById('bar-menu-icon');
const weekChartRef = document.querySelectorAll(".week .bars .column .val");
const monthChartRef = document.querySelectorAll(".month .bars .column .val");
const yearChartRef = document.querySelectorAll(".year .bars .column .val");
const weekRangeRef = document.getElementById('data-date');
const monthRangeRef = document.getElementById("data-date-month");
const yearRangeRef = document.getElementById("data-date-year");
const weekTabButtonRef =  document.getElementById('week-icon')
const monthTabButtonRef =  document.getElementById('month-icon');
const yearTabButtoRef =  document.getElementById('year-icon');
const weekRef =  document.querySelector('.stats-week');
const monthRef =  document.querySelector('.stats-month');
const yearRef =  document.querySelector('.stats-year');
//arrows
const leftArrowWeekRef = document.getElementById('left-arrow');
const rightArrowWeekRef = document.getElementById('right-arrow');
const leftArrowMonthRef = document.getElementById('left-arrow-month');
const rightArrowMonthRef = document.getElementById('right-arrow-month');
const leftArrowYearRef = document.getElementById('left-arrow-year');
const rightArrowYearRef = document.getElementById('right-arrow-year');
//store
const totalCashRef = <HTMLElement>document.querySelector(".cash-text")
const storeContainerRef = document.querySelector(".store-container")

export class CocktailPopout{
    levelSystem:LevelSystem;
    upgradeLevelSystem:LevelSystem;
    minutesDisplaySystem:LevelSystem
    rankColor: string;
    minutesToday: number;
    popoutTimer: PopoutTimer;
    stats: Stats;

    constructor(){
        this.popoutTimer =  new PopoutTimer(
            this.displayTime, 
            this.displayCocktailTime
        )
        this.levelSystem = new LevelSystem(lvlDef, labelDef);
        this.upgradeLevelSystem = new LevelSystem(upgradeDef, upgradeLabelDef);
        this.minutesDisplaySystem = new LevelSystem(minutesDisplayDef, minutesDisplayLabelDef);
        this.minutesToday = 0;
        this.stats = new Stats();
        this.init();
        
    }

    async init():Promise<{}>{
        return new Promise(async(resolve, reject)=>{
        //HOME
        await this.setBeverage();
        chrome.runtime.sendMessage({"message": "initClientTimer"}, (res)=>{
            //INIT TIMER
            if(res.isTimerExist){
                //timer
                this.popoutTimer.setTimerVal(res.timerVal);
                this.displayTime(this.popoutTimer.timerVal);
                res.isTimerOn && this.popoutTimer.startTimer();
                
                //display
                this.hideElementsWhileTimerExist();
                this.hideElementsWhileTimerOn();
                if(res.isTimerOn) clockRef.style.color = this.rankColor
            }
            //INIT COCKTAIL TIMER
            /**
             * TODO: Change cockTime color to this.rankColor when timer is on
             */
            //timer
            this.popoutTimer.setCocktailTimerVal(res.cocktailTimerVal);
            res.isCocktailTimerOn && this.popoutTimer.startCocktailtimer();
                
            //display
            this.displayCocktailTime(res.cocktailTimerVal);
            if(res.isCocktailTimerOn) cockTimeRef.style.color = this.rankColor;
            //init hardcore mode
            //timer

            //display
            if(res.isHardcore){
                this.displayHardcoreModeOn();
            }
        })

        //get minutes today
        const date = new Date().toDateString();
        chrome.storage.sync.get("allData", (data)=>{
            if(date in data["allData"]){
                this.minutesToday = data["allData"][date]
            }
            this.displayMinutesToday(this.minutesToday);
        })

        /////////////////////////SET BUTTONS/////////////////////
        //NAVBAR
        homeNavRef.onclick = ()=>{
            this.setHomeView()
        }
        
        statsNavRef.onclick = () =>{
            this.setStatsView()
        }
        
        barNavRef.onclick = () =>{
            this.setBarView()
        }
        //TIMER
        timerToggleRef.onclick = ()=>{
            chrome.runtime.sendMessage({"message": "toggleTimer"})
            this.popoutTimer.toggleTimer();
            if(this.popoutTimer.isTimerOn){
                this.hideElementsWhileTimerOn()
                this.hideElementsWhileTimerExist();
                
            }
            //Displays
            clockRef.style.color = this.popoutTimer.isTimerOn ? this.rankColor : '#3d3d3d';
        }

        cardPlayButtonRef.onclick = () => {
            chrome.runtime.sendMessage({"message": "toggleTimer"})
            this.popoutTimer.startTimer();

            //Displays
            this.hideElementsWhileTimerOn();
            this.hideElementsWhileTimerExist();
            clockRef.style.color = this.rankColor;
        }

        cocktailButtonText.onclick = () =>{
            chrome.runtime.sendMessage({"message": "cocktailButton"})
            this.popoutTimer.toggleCocktailtimer();
            cockTimeRef.style.color = this.popoutTimer.isCocktailTimerOn? this.rankColor : '#3d3d3d'
        }
        
        cocktailButtonIcon.onclick = cocktailButtonText.onclick;

        eyeSwitchCheckRef.addEventListener('change',()=>{
            chrome.runtime.sendMessage({"message": "hardcoreButton"}, (res)=>{
                if(res.message){
                    this.displayHardcoreModeOn();
                    if(this.popoutTimer.isCocktailTimerOn == false && !res.isTimerExist){
                        this.popoutTimer.startCocktailtimer();
                    }
                }else{
                    this.displayHardcoreModeOff();
                }
            })
        });
        //STATS
        this.loadStats();
        //stats navbar
        monthTabButtonRef.onclick=function(){
            yearRef.classList.add("hide-stats-type");
            monthRef.classList.remove("hide-stats-type");
            weekRef.classList.add("hide-stats-type");
            yearTabButtoRef.classList.remove("selected-data-mode");
            monthTabButtonRef.classList.add("selected-data-mode");
            weekTabButtonRef.classList.remove("selected-data-mode");
        }
        
        yearTabButtoRef.onclick=function(){
            yearRef.classList.remove("hide-stats-type");
            monthRef.classList.add("hide-stats-type");
            weekRef.classList.add("hide-stats-type");
            yearTabButtoRef.classList.add("selected-data-mode");
            monthTabButtonRef.classList.remove("selected-data-mode");
            weekTabButtonRef.classList.remove("selected-data-mode");
        }
        
        weekTabButtonRef.onclick=function(){
            yearRef.classList.add("hide-stats-type");
            monthRef.classList.add("hide-stats-type");
            weekRef.classList.remove("hide-stats-type");
            yearTabButtoRef.classList.remove("selected-data-mode");
            monthTabButtonRef.classList.remove("selected-data-mode");
            weekTabButtonRef.classList.add("selected-data-mode");
        }

        leftArrowWeekRef.onclick = ()=>{
            this.stats.shiftLeftWeek().then(()=>{
                this.dispayWeekVals(this.stats.weekData, this.stats.getHeights(this.stats.weekData));
                weekRangeRef.innerHTML = this.stats.getWeekRange();
                this.setWeekArrows();
            })
        }

        rightArrowWeekRef.onclick =()=>{
            if(!this.stats.isRecentWeekRange()){
                this.stats.shiftRightWeek().then(()=>{
                    this.dispayWeekVals(this.stats.weekData, this.stats.getHeights(this.stats.weekData));
                    weekRangeRef.innerHTML = this.stats.getWeekRange();
                    this.setWeekArrows();
                })
            }
        }

        leftArrowMonthRef.onclick = () =>{
            this.stats.shiftLeftMonth().then(()=>{
                this.displayMonthVals(this.stats.monthData, this.stats.getHeights(this.stats.monthData));
                monthRangeRef.innerHTML = this.stats.getMonthRange();
                this.setMonthArrows();
            })
        }

        rightArrowMonthRef.onclick = () =>{
            if(!this.stats.isRecentMonthRange()){
                this.stats.shiftRightMonth().then(()=>{
                    this.displayMonthVals(this.stats.monthData, this.stats.getHeights(this.stats.monthData));
                    monthRangeRef.innerHTML = this.stats.getMonthRange();
                    this.setMonthArrows();
                })
            }
        }

        leftArrowYearRef.onclick = () =>{
            this.stats.shiftLeftYear().then(()=>{
                this.displayYearVals(this.stats.yearData, this.stats.getHeights(this.stats.yearData));
                yearRangeRef.innerHTML = this.stats.getYearRange();
                this.setYearArrows();
            })
        }

        rightArrowYearRef.onclick = () =>{
            if(!this.stats.isRecentYearRange()){
                this.stats.shiftRightYear().then(()=>{
                    this.displayYearVals(this.stats.yearData, this.stats.getHeights(this.stats.yearData));
                    yearRangeRef.innerHTML = this.stats.getYearRange();
                    this.setYearArrows();
                })
            }
        }
        //STORE
        this.displayCash();
        this.renderStore()
        }) 
    }

    async setBeverage():Promise<{}>{
        return new Promise((resolve, reject)=>{
            try{
            chrome.storage.sync.get(['cocktailSet','cocktails'], (data)=>{
                //get the data from chrome storage
                const name = data['cocktailSet']
                const cocktailSeconds =  data["cocktails"][data['cocktailSet']]["cocktailSeconds"]
                const timeUntilReady = data["cocktails"][data['cocktailSet']]["timeUntilReady"]
                const cash = data["cocktails"][data['cocktailSet']]["cashPrize"]
                const uses = data["cocktails"][data['cocktailSet']]["uses"]
                const tier = data["cocktails"][data['cocktailSet']]["tier"]
                //set beverage in  background
                chrome.runtime.sendMessage({
                    "message":"setBeverage", 
                    cocktailSeconds,
                    timeUntilReady
                });
                //render displays
                const minutes = Math.floor(uses*timeUntilReady / 60);
                cocktailIconRef.innerHTML = Math.floor(cocktailSeconds / 60).toString();
                timerIconRef.innerHTML = Math.floor(timeUntilReady / 60).toString();
                cashIconRef.innerHTML = cash;
                cardXPRef.innerHTML = Math.floor(uses*timeUntilReady / 60).toString();
                cardNameRef.innerHTML = name;
                cardImageRef.style.backgroundImage = "url('./images/cocktails/"+name+"-tier"+tier+".png')";
                //displays related to starts
                const start = this.levelSystem.getNewLevel({level:1, xp:0}, uses*timeUntilReady);
                const lvlProgress = this.levelSystem.getProgress(start);
                cardProgress.style.setProperty('--percent', (lvlProgress.xp / lvlProgress.max * 100).toString());
                this.setLevelColors(this.levelSystem.getLabel(start.level));
                this.rankColor = this.levelSystem.getLabel(start.level);
                //set timer value
                this.popoutTimer.setTimerVal(timeUntilReady);
                resolve({});
            })
        }catch(e){
            reject(e)
        }
        })

    }

    setLevelColors(color:string):void{
        menuSelectorRef.style.backgroundColor = color;
        cardPlayButtonRef.style.backgroundColor = color;
        cardNameRef.style.color = color;
        cardProgress.style.stroke = color;
        cardXPRef.style.color = color;
        dataColumns.forEach(function(item){
            if(item.style.backgroundColor != "rgba(0, 0, 0, 0)"){
                item.style.backgroundColor = color
            }
            item.style.borderColor = color
        })
        if(eyeSwitchCheckRef.checked){
            eyeSwitchRefSlider.style.backgroundColor = color
        }
    }

    displayTime=(data:number):void=>{
        clockRef.innerHTML = this.secondsToClockString(data);
    }

    displayCocktailTime=(data)=>{
        cockTimeRef.innerHTML = this.secondsToClockString(data);
    }

    secondsToClockString(time:number){
        let minutes = Math.floor(time / 60); 
        let seconds = time % 60;
        let secondsDisplay = seconds < 10?("0" + seconds):(seconds);
        return minutes + ":" +  secondsDisplay;
    }
    hideElementsWhileTimerExist():void{
        cardRef.style.display = "none";
        minutesTodayRef.style.display = "none"
        navbarBlockerRef.style.display = "block";
    }
    showElementsWhileTimerNotExist():void{
        cardRef.style.display = 'initial'
        minutesTodayRef.style.display = "block"
        navbarBlockerRef.style.display = "none"
        storeBlockerRef.style.display = "none"
    }
    hideElementsWhileTimerOn():void{
        let selector = document.querySelectorAll(".hide-on-timer") as NodeListOf<HTMLElement>;
        selector.forEach(item=>{
            item.style.display = "none";
        })
    }

    showElementsWhenTimerOff():void{
        let selector = document.querySelectorAll(".hide-on-timer") as NodeListOf<HTMLElement>;
        selector.forEach(item=>{
            item.style.display = "block";
        })
    }

    displayMinutesToday(x:number):void{
        minutesTodayRef.innerHTML = x+" mins Today";
    }

    displayHardcoreModeOn():void{
        homeRef.style.backgroundColor = "#232323"
        homeRef.style.backgroundImage = "url('./images/table-dark.svg')"
        timerValRef.style.color = "white"
        cocktimeIconRef.src = "./images/cocktail-icon-light.svg"
        eyeRef.src = './images/eye-dark.svg'
        todayTimeRef.style.color = "white"
        eyeSwitchSliderRef.style.backgroundColor = this.rankColor;
        clockRef.style.color = this.popoutTimer.isTimerOn ? this.rankColor : "white"
        cockTimeRef.style.color = this.popoutTimer.isCocktailTimerOn ? this.rankColor : "white"
    }

    displayHardcoreModeOff():void{
        homeRef.style.backgroundColor = "white"
        homeRef.style.backgroundImage = "url('./images/table.svg')"
        timerValRef.style.color = "#3d3d3d"
        cocktimeIconRef.src = "./images/cocktail-icon.svg"
        eyeRef.src = './images/eye.svg'
        todayTimeRef.style.color = "#3d3d3d"
        eyeSwitchSliderRef.style.backgroundColor = "#3d3d3d"
        clockRef.style.color = this.popoutTimer.isTimerOn ? this.rankColor : "#3d3d3d"
        cockTimeRef.style.color = this.popoutTimer.isCocktailTimerOn? this.rankColor : "white"
    }

    success=(req):void=>{
        this.popoutTimer.stopTimer();
        this.displayCocktailTime(req.data);
        this.popoutTimer.setCocktailTimerVal(req.data);
        this.setBeverage();
        this.minutesToday += Math.floor(req.time/60)
        this.displayMinutesToday(this.minutesToday)
        this.showElementsWhenTimerOff()
        req.isHardcore && this.popoutTimer.startCocktailtimer();
        this.showElementsWhileTimerNotExist();
        this.loadStats();
        this.displayCash();
    }
    setHomeView(){
        menuSelectorRef.style.left = '132px';
        statsRef.style.display = "none";
        homeRef.style.display = "block";
        barRef.style.display = "none";
    }
    
    setStatsView(){
        // loadAllStats()
        menuSelectorRef.style.left = '33px';
        statsRef.style.display = "block";
        homeRef.style.display = "none";
        barRef.style.display = "none";
    }
    
    setBarView(){
        menuSelectorRef.style.left = '232px';
        statsRef.style.display = "none";
        homeRef.style.display = "none";
        barRef.style.display = "block";
    }

    //stat methods
    dispayWeekVals(stat_nodes_arr: DateNodeType[], height_arr:number[]):void{
        weekChartRef.forEach((item:HTMLElement, i:number)=>{
            item.style.height = height_arr[i].toString()+"%";
            if(stat_nodes_arr[i].minutes > 0){
                item.querySelector(".text").innerHTML = stat_nodes_arr[i].minutes.toString();
                const diff = new Date().getTime() - stat_nodes_arr[i].date.getTime();
                diff < 24*3600*1000 && 
                diff > 0 ? this.setBarStylingToToday(item) : this.setBarStylingToNotToday(item)
            }else{
                item.style.borderWidth = '0'
                item.querySelector(".text").innerHTML = "";
            }
        })
    }

    displayMonthVals(stat_nodes_arr: DateNodeType[], height_arr:number[]):void{
        const days = this.stats.getDaysInMonth(this.stats.monthRangeRoot.getFullYear(), this.stats.monthRangeRoot.getMonth() +1);
        const indexOfHeighest:number = height_arr.indexOf(Math.max(...height_arr))
        monthChartRef.forEach((item:HTMLElement, i:number)=>{
            if(i < days){
                item.style.height = height_arr[i].toString()+"%";

                if(stat_nodes_arr[i].minutes > 0 && i ==  indexOfHeighest){
                    item.querySelector(".text").innerHTML = stat_nodes_arr[i].minutes.toString();
                }else{
                    //if the bar is not the tallest     
                    item.querySelector(".text").innerHTML = "";
                }
                const diff = new Date().getTime() - stat_nodes_arr[i].date.getTime()
                diff < 24*3600*1000 && 
                diff > 0 &&
                stat_nodes_arr[i].minutes > 0? 
                this.setBarStylingToToday(item) : this.setBarStylingToNotToday(item)
            }
        })
    }

    displayYearVals(stat_nodes_arr: DateNodeType[], height_arr:number[]):void{
        const days = this.stats.getDaysInMonth(this.stats.monthRangeRoot.getFullYear(), this.stats.monthRangeRoot.getMonth() +1);
        const indexOfHeighest:number = height_arr.indexOf(Math.max(...height_arr))
        yearChartRef.forEach((item:HTMLElement, i:number)=>{
            item.style.height = height_arr[i].toString()+"%";

            if(stat_nodes_arr[i].minutes > 0 && i == indexOfHeighest){
                item.querySelector(".text").innerHTML = stat_nodes_arr[i].minutes.toString();
            }else{
                item.querySelector(".text").innerHTML = "";
            }
            const diff = new Date().getTime() - stat_nodes_arr[i].date.getTime()
            diff < 24*3600*1000*days && 
            diff > 0 && 
            stat_nodes_arr[i].minutes > 0 ? 
            this.setBarStylingToToday(item) : this.setBarStylingToNotToday(item)

        })
    }

    loadStats=()=>{
        this.stats.load().then((data)=>{
            console.log(data)
            //week
            this.dispayWeekVals(this.stats.weekData, this.stats.getHeights(this.stats.weekData));
            weekRangeRef.innerHTML = this.stats.getWeekRange();
            this.setWeekArrows();
            //month
            this.displayMonthVals(this.stats.monthData, this.stats.getHeights(this.stats.monthData));
            monthRangeRef.innerHTML = this.stats.getMonthRange();
            this.setMonthArrows();
            //year
            this.displayYearVals(this.stats.yearData, this.stats.getHeights(this.stats.yearData));
            yearRangeRef.innerHTML = this.stats.getYearRange();
            this.setYearArrows();
        })
    }

    setBarStylingToToday=(ref:HTMLElement):void=>{
        ref.style.backgroundColor = this.RGBToRGBA(ref.style.backgroundColor, 0)
        ref.style.boxSizing = "border-box"
        ref.style.borderWidth = "3.6px"
        ref.style.borderStyle = "Solid"
    }
    
    setBarStylingToNotToday=(ref:HTMLElement):void=>{
        ref.style.backgroundColor = this.RGBAToRGB(ref.style.backgroundColor)
        ref.style.borderWidth = "0px"
    }

    RGBToRGBA(rgb:string, a:number):string{
        let rgba = rgb.replace("rgb(",'').replace(")", '')
        rgba = rgba.split(",").join()
        rgba = "rgba(" + rgba + " ," + a + ")"
        return rgba
    }

    RGBAToRGB(rgba:string):string{
        let rgb = rgba.replace("rgba(",'').replace(")", '')
        rgb = rgb.split(",").slice(0, 3).join()
        return "rgb(" + rgb +")"
    }

    setWeekArrows=()=>{
        if(this.stats.isRecentWeekRange()){
            rightArrowWeekRef.classList.add("disabled-arrow")
        }else{
            rightArrowWeekRef.classList.remove("disabled-arrow")
        }
    }

    setMonthArrows=()=>{
        if(this.stats.isRecentMonthRange()){
            rightArrowMonthRef.classList.add("disabled-arrow")
        }else{
            rightArrowMonthRef.classList.remove("disabled-arrow")
        }
    }

    setYearArrows=()=>{
        if(this.stats.isRecentYearRange()){
            rightArrowYearRef.classList.add("disabled-arrow")
        }else{
            rightArrowYearRef.classList.remove("disabled-arrow")
        }
    }
    //STORE
    displayCash(){
        chrome.storage.sync.get('cash', function(data){
            const cash = data["cash"]
            totalCashRef.innerHTML = cash;
        })
    }

    renderStore(){
        chrome.storage.sync.get(['cocktails', 'cocktailSet', 'cash'], (data)=>{
            const cocktails = data["cocktails"]
            const cocktailSet = data["cocktailSet"]
            const cash = data["cash"]
            storeContainerRef.innerHTML = `<div class="store-container-block"></div>`;
            for(let [key, value] of Object.entries(cocktails)){

                const uses = value['uses'];
                const timeUntilReady = value['timeUntilReady']
                const start = this.levelSystem.getNewLevel({level:1, xp:0}, uses*timeUntilReady);
                const {xp, max} = this.levelSystem.getProgress(start);
                const progress = Math.floor(xp/max*100).toString() 
                const color = this.levelSystem.getLabel(start.level)
                const tier = value['tier']
                const isMaxTier = this.upgradeLevelSystem.levelsDef[this.upgradeLevelSystem.levelsDef.length - 1].start == tier;
                storeContainerRef.innerHTML += `
                <div id="${key}-card" class="store-card">

                <div class="store-card-hover">
                    <h1>${key.toUpperCase()}</h1>
                    <h2 style="color:${color}">${uses * timeUntilReady}</h2>
                    <div class="store-card-hover-button">Select</div>
                    <div class="store-card-hover-button store-card-hover-button-upgrade" 
                        id="${key}-upgrade-button"
                        style="background-color: ${color};
                                opacity: ${cash >= this.upgradeLevelSystem.getXp(tier) || isMaxTier? 1:0.4};
                                cursor: ${cash >= this.upgradeLevelSystem.getXp(tier) ? "pointer":"default"}
                            "
                    >${isMaxTier ? "MAX" : "$" + this.upgradeLevelSystem.getXp(tier)}</div>
                    <div class="upgrade-progress-wrapper">
                        <div class="upgrade-progress-block" style="background-color: ${color}"></div>
                        <div class="upgrade-progress-block" style="background-color: ${tier > 1 ? color:''}"></div>
                        <div class="upgrade-progress-block" style="background-color: ${tier > 2 ? color:''}"></div>
                        <div class="upgrade-progress-block" style="background-color: ${tier > 3 ? color:''}"></div>
                    </div>
                </div>

                <div class="store-card-stats-grid">
                  <svg id="store-card-cocktail" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.07 86.07">
                    <title>Cocktail</title>
                    <g>
                      <polygon points="28.17 30.25 56.59 30.25 57.37 29.32 60.06 26.16 24.7 26.16 28.17 30.25" style="fill: ${color}"/>
                      <path d="M787.45,743.51a43,43,0,1,0,43,43A43,43,0,0,0,787.45,743.51Zm23.18,23.31L804,774.68h0l-6.87,8.09-8.87,10.44v18l9.61,5.15H775.76l9.61-5.15v-18L763,766.82h37.55l9.3-10.44,2.13,1.89-7.61,8.54h6.31Z" transform="translate(-744.41 -743.51)" style="fill: ${color}"/>
                    </g>
                  </svg>
                  <svg id="store-card-timer" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.07 86.07">
                    <defs>
                      <style>
                        .cls-1-${key}{
                          fill:${color};
                        }
                      </style>
                    </defs>
                    <title>Cocktail</title>
                    <path class="cls-1-${key}" d="M911.24,743.51a43,43,0,1,0,43,43A43,43,0,0,0,911.24,743.51Zm0,38.47a4.38,4.38,0,1,1-4.38,4.38s0-.05,0-0.08l-0.08.08-7.33-11.78,11.78,7.35-0.07.07h0.07Zm0,31.84a27.46,27.46,0,0,1-19.42-46.88l3.61,3.61a22.36,22.36,0,1,0,18.36-6.4v6.28h-5.1V758.89h2.55A27.46,27.46,0,0,1,911.24,813.82Z" transform="translate(-868.2 -743.51)"/>
                  </svg>
                  <svg id="store-card-cash" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.07 86.07">
                    <defs>
                      <style>
                        .cls-2-${key}{
                          fill: ${color};
                        }
                      </style>
                    </defs>
                    <title>Cocktail</title>
                    <path class="cls-2-${key}" d="M1037.78,743.51a43,43,0,1,0,43,43A43,43,0,0,0,1037.78,743.51ZM1052,806.74a16.38,16.38,0,0,1-9.59,4.72,0.47,0.47,0,0,0-.36.43l0.07,4.65a0.86,0.86,0,0,1-.86.86h-7.16a0.86,0.86,0,0,1-.86-0.86l0.07-4.72a0.47,0.47,0,0,0-.36-0.43,17,17,0,0,1-9.55-5,13.55,13.55,0,0,1-3.47-9.52v-1.57a0.86,0.86,0,0,1,.86-0.86h7.73a0.85,0.85,0,0,1,.86.86v1.07a5.94,5.94,0,0,0,2.5,4.83,10.84,10.84,0,0,0,6.87,2q3.65,0,5.4-1.61a5.18,5.18,0,0,0,1.75-4,4.15,4.15,0,0,0-1.07-2.9,9.36,9.36,0,0,0-3-2.08q-1.9-.89-6-2.47a54.17,54.17,0,0,1-7.8-3.36,16.14,16.14,0,0,1-5.33-4.69,12,12,0,0,1-2.18-7.34,13,13,0,0,1,3.33-9.12,15.81,15.81,0,0,1,9-4.69,0.47,0.47,0,0,0,.36-0.43l-0.14-5.22a0.85,0.85,0,0,1,.86-0.86h7.16a0.85,0.85,0,0,1,.86.86l-0.07,5.37a0.47,0.47,0,0,0,.36.43,16.63,16.63,0,0,1,9.45,5.19,14.14,14.14,0,0,1,3.51,9.7V777a0.85,0.85,0,0,1-.86.86h-7.8a0.86,0.86,0,0,1-.86-0.86v-0.57a6.62,6.62,0,0,0-2.36-5.12,9.32,9.32,0,0,0-6.44-2.11,7.83,7.83,0,0,0-5,1.43,4.76,4.76,0,0,0-1.79,3.94,4.47,4.47,0,0,0,1,3,9.38,9.38,0,0,0,3.11,2.22q2.08,1,6.44,2.58a74.11,74.11,0,0,1,7.59,3.22,15.11,15.11,0,0,1,5,4.29,11.69,11.69,0,0,1,2.22,7.37A13.22,13.22,0,0,1,1052,806.74Z" transform="translate(-994.75 -743.51)"/>
                  </svg>
                  <div id="cocktail-text-card">${Math.floor(value['cocktailSeconds'] / 60)}</div>
                  <div id="cash-text-card">${value['cashPrize']}</div>
                  <div id="timer-text-card">${Math.floor(value['timeUntilReady'] / 60)}</div>
                </div>
                <div class="card-cocktail-preview" style="background-image:url('./images/cocktails/${key+"-tier"+value["tier"]}.png')"></div>
    
                <div class="card-progress-lower">
                  <div class="inner" style="background-color: ${color}; width: ${progress}%"></div>
                </div>
          
              </div>
              <style>
                    #${key}-card{
                        border: 4px solid ${key === cocktailSet ? (color):("#ededed")};
                    }
              </style>
                `; 
            }
            for(let [key, value] of Object.entries(cocktails)){
                document.getElementById(`${key}-card`).onclick = ()=>{
                    this.storeClickSetBeverage(`${key}`);
                }

                document.getElementById(`${key}-upgrade-button`).onclick = ()=>{
                    this.upgradeBeverage(`${key}`);
                    this.storeClickSetBeverage(`${key}`);
                }
            }
    
        })
    }

    storeClickSetBeverage(beverage:string):void{
        chrome.storage.sync.set({cocktailSet: beverage}, ()=>{
            this.renderStore();
            this.setBeverage();
            this.loadStats();
        })
    }

    upgradeBeverage(beverage:string):void{
        chrome.storage.sync.get(["cocktailSeconds", 'cocktailSet','cocktails', 'cash'], (data)=>{
            const cash = data['cash'];
            let cocktails = data["cocktails"];

            if(cocktails[beverage]){
                const tier = (cocktails[beverage]['tier'])
                const price = this.upgradeLevelSystem.getXp(tier)
                if( cash >= price && tier < this.upgradeLevelSystem.levelsDef[this.upgradeLevelSystem.levelsDef.length - 1].start){
                    cocktails[beverage]['tier'] = tier + 1;
                    chrome.storage.sync.set({
                        cocktails: cocktails,
                        cash: cash - price
                    });
                    this.displayCash();
                    this.renderStore();
                }
            }
        });
    }

    
}