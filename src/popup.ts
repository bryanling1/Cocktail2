import {CocktailPopout} from './models/CocktailPopout'

document.addEventListener('DOMContentLoaded', (event) => {

const popup = new CocktailPopout();

chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
    switch(req.message){
        case "success":
            popup.success(req);
            if(req.isHardCore){
                popup.popoutTimer.startCocktailtimer();
            }
            break; 
        case "hardcoreTimerStart":
            popup.hideElementsWhileTimerExist();
            popup.hideElementsWhileTimerOn();
            popup.popoutTimer.setTimerVal(req.timerVal);
            popup.popoutTimer.startTimer();
            break;
    }
})

})