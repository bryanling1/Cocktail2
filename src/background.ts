import {BackgroundTimer} from "./models/Timer"
const backgroundTimer = new BackgroundTimer(pushSuccessNotification, pushCocktailEmptyNotification);
//init
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.get("cocktailSeconds", function(data){
        if(data["cocktailSeconds"] == undefined && details.reason == "install"){
            chrome.storage.sync.set(
                {
                cocktailsMade: 0,
                allData: {},
                cocktailSeconds: 0,
                cocktails: {
                    "test":{
                        "cocktailSeconds": 10,
                        "timeUntilReady": 60,
                        "cashPrize": 10,
                        "tier": 1,
                        "uses": 0
                    },
                    "shotgun":{
                        "cocktailSeconds": 300,
                        "timeUntilReady": 1200,
                        "cashPrize": 20,
                        "tier": 1,
                        "uses": 0
                    },
                },
                cocktailSet: "test",
                cash: 0
            }
            );
        }
    })
})

function pushSuccessNotification():void{
    let hardCoreMessage = ""
    if(backgroundTimer.isHardcore){
        hardCoreMessage = "Break timer started!"
    }
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Your Cocktail is Ready!", 
      {
          "icon": "./images/drink-icon.png",
          "body": "Enjoy! " +  hardCoreMessage
      }
       );
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            var notification = new Notification(
                "Your Cocktail is Ready!", 
            {
                "icon": "./images/drink-icon.png",
                "body": "Enjoy! " +  hardCoreMessage
            }
             );
        }
      });
    }
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}

function pushCocktailEmptyNotification():void{
    let hardCoreMessage = ""
    if(backgroundTimer.isHardcore){
        hardCoreMessage = "Timer just started!"
    }
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("You're out of cocktails!", 
      {
          "icon": "./images/drink-icon.png",
          "body": "Get back on it! "+ hardCoreMessage
      }
       );
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            var notification = new Notification("You're out of cocktails!", 
            {
                "icon": "./images/drink-icon.png",
                "body": "Get back on it! " + hardCoreMessage
            }
            );
        }
      });
    }
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}


chrome.runtime.onMessage.addListener((req, sender, sendResponse)=> {
    
    switch(req.message){
        case "initClientTimer": 
            const {
                isTimerExist,
                isTimerOn,
                initTimerVal,
                timerVal,
                isCocktailTimerOn,
                cocktailTimerVal,
                isHardcore
            } = backgroundTimer
            sendResponse({  
                isTimerExist, 
                isTimerOn, 
                initTimerVal, 
                timerVal, 
                isCocktailTimerOn, 
                cocktailTimerVal,
                isHardcore
            });
            break;
        case "setBeverage":
            if((backgroundTimer.isTimerOn == false && backgroundTimer.timerVal == backgroundTimer.initTimerVal) || backgroundTimer.timerVal == 0){
                backgroundTimer.setBeverage(req.cocktailSeconds, req.timeUntilReady)
            }
            break;
        case "toggleTimer":
            backgroundTimer.toggleTimer();
            break;
        case "cocktailButton":
            backgroundTimer.toggleCocktailtimer();
            break;
        case "hardcoreButton":
            backgroundTimer.toggleHardcore();
            sendResponse({"message": backgroundTimer.isHardcore, "isTimerExist": backgroundTimer.isTimerExist})
            if(backgroundTimer.isHardcore && !backgroundTimer.isCocktailTimerOn && !backgroundTimer.isTimerExist){
                backgroundTimer.startCocktailtimer();
            }
            break;
    }
})