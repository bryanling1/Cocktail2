export type DateNodeType = {
    date: Date;
    minutes: number;
}

export class Stats{
    weekRangeRoot:Date;
    monthRangeRoot:Date;
    yearRangeRoot:Date;
    weekData:DateNodeType[];
    monthData:DateNodeType[];
    yearData:DateNodeType[]; 

    constructor(){
        this.weekRangeRoot = new Date();
        this.monthRangeRoot = new Date();
        this.yearRangeRoot = new Date();
        this.weekData = this.initData(7);
        this.monthData = this.initData(31);
        this.yearData = this.initData(12);
    }

    load=async():Promise<void>=>{
        this.setCurrentWeekDates();
        await this.setWeekVals();
        this.setCurrentMonthDates();
        await this.setMonthVals();
        this.setCurrentYearDates();
        await this.setYearVals();
    }

    private initData(x:number):DateNodeType[]{
        let out:DateNodeType[] = [];
        for(let i=0; i<x; i++){
            out.push({date:null, minutes:0})
        }
        return out;
    }

    setCurrentWeekDates=():void=>{
        const index = this.weekRangeRoot.getDay();
        //set days before
        for(let i=0;i<=index;i++){
            const date = new Date( this.weekRangeRoot.getTime() - i*24*3600*1000);
            this.weekData[index - i].date = date;
        }
        //set days after
        for(let i=1;i<7-index;i++){
            const date = new Date( this.weekRangeRoot.getTime() + i*24*3600*1000);
            this.weekData[index + i].date = date;
        }
    }

    setWeekVals=():Promise<{}>=>{
        return new Promise((resolve, reject)=>{
            try{
                chrome.storage.sync.get("allData", (data)=>{
                    if(data){
                        const allData = data['allData'];
                        //get the largest value as reference
                        for(let i=0; i<this.weekData.length; i++){
                            const date = this.weekData[i].date.toDateString();
                            //set minute value
                            this.weekData[i].minutes = allData[date] ? (allData[date]):(0);
                        }  
                        resolve(this.weekData);
                    }
                    })
            }catch(e){
                reject(e);
            }
            
        })
        

    }

    getHeights=(arr:DateNodeType[]):number[]=>{
        let out:number[] = [];
        let largestVal = 0;
        
        for(let i=0; i<arr.length; i++){
            if(arr[i].minutes > largestVal){
                largestVal = arr[i].minutes;
            }
        }
        //empty
        if(largestVal == 0){
            for(let i=0; i<arr.length; i++){
                out.push(0);
            }
            return out;
        }
        
        for(let i=0; i<arr.length; i++){
            out.push(Math.floor(arr[i].minutes / largestVal * 100));
        }
        return out;
    }

    getWeekRange():string{
        const index = this.weekRangeRoot.getDay();
        let date = new Date(this.weekRangeRoot.getTime() - 24*3600*1000*index);
        const startDate = date.toDateString().split(" ")[1] + " " +date.toDateString().split(" ")[2];
        date = new Date(date.getTime() + 24*3600*1000*6);
        const endDate = date.toDateString().split(" ")[1] + " " +date.toDateString().split(" ")[2];
        return startDate + " - " + endDate;
    }

    isCurrentWeek():boolean{
        return new Date().getTime() - this.weekRangeRoot.getTime() <= 604800000 
    }

    isRecentWeekRange():boolean{
        return new Date().getTime() - this.weekRangeRoot.getTime() <= 604800000
    }

    isRecentMonthRange():boolean{
        const date = new Date(new Date().getFullYear(), new Date().getMonth());
        const left =  this.monthData[0].date.getTime()
        const right = this.monthData[this.getDaysInMonth(this.monthRangeRoot.getFullYear(), this.monthRangeRoot.getMonth()+1) - 1].date.getTime()
        return date.getTime() >= left && date.getTime() <= right
    }

    isRecentYearRange():boolean{
        const date = new Date(new Date().getFullYear(), 0)
        const left =  this.yearData[0].date.getTime()
        const right = this.yearData[11].date.getTime()
        return date.getTime() >= left && date.getTime() <= right
    }

    setCurrentMonthDates=():void=>{
        const date = new Date(this.monthRangeRoot.getFullYear(), this.monthRangeRoot.getMonth());
        const days = this.getDaysInMonth(this.monthRangeRoot.getFullYear(), this.monthRangeRoot.getMonth() + 1);
        for(let i=0; i<days; i++){
            const date2 = new Date(date.getTime() + i*24*3600*1000);
            this.monthData[i].date = date2
        }
    }

    getDaysInMonth(year:number, month:number):number{
        return new Date(year, month, 0).getDate();
    }

    setMonthVals=():Promise<{}>=>{
        return new Promise((resolve, reject)=>{
            try{
                chrome.storage.sync.get("allData", (data)=>{
                    if(data){
                        const allData = data['allData'];
                        const days = this.getDaysInMonth(this.monthRangeRoot.getFullYear(), this.monthRangeRoot.getMonth() + 1);
                        //get the largest value as reference
                        for(let i=0; i<days; i++){
                            let date = this.monthData[i]["date"].toDateString();
                            //set minute value
                            this.monthData[i]["minutes"] = allData[date] ? (allData[date]):(0);
                        }
                        resolve(this.monthData)
                    }
                    })
            }catch(e){
                reject(e)
            }
        })
        
    }

    getMonthRange():string{
       return this.monthRangeRoot.toDateString().split(" ")[1] + " " +this.monthRangeRoot.toDateString().split(" ")[3];
    }

    getYearRange():string{
        return this.yearRangeRoot.toDateString().split(" ")[3];
    }

    setCurrentYearDates(){
        let date = new Date(this.yearRangeRoot.getFullYear(), 0, 1);
        this.yearData[0]["date"] = new Date(this.yearRangeRoot.getFullYear(), 0, 1);
        for (let i=1; i<12; i++){
            date.setMonth(date.getMonth() + 1)
            this.yearData[i]["date"] = new Date(date);
        }
    }

    setYearVals():Promise<{}>{
        return new Promise((resolve, reject)=>{
            try{
                chrome.storage.sync.get("allData", (data)=>{
                    if(data){
                        const allData = data['allData'];
                        //get the largest value as reference
                        for(let i=0; i<this.yearData.length; i++){
                            let date = this.yearData[i]["date"].toDateString().split(" ")[1]+this.yearData[i]["date"].toDateString().split(" ")[3];
                            //set minute value
                            this.yearData[i]["minutes"] = allData[date] ? (allData[date]):(0);
                        }
                        resolve(this.yearData)
                    }
                })
            }catch(e){
                reject(e)
            }
        })
    }

    displayYearRange():string{
        return this.yearRangeRoot.toDateString().split(" ")[3];
    }
    
    shiftLeftWeek=async():Promise<{}>=>{
        this.weekRangeRoot = new Date(this.weekRangeRoot.getTime() - 604800000);
        this.setCurrentWeekDates();
        return this.setWeekVals();
    }

    shiftRightWeek=async():Promise<{}>=>{
        this.weekRangeRoot = new Date(this.weekRangeRoot.getTime() + 604800000);
        this.setCurrentWeekDates();
        return this.setWeekVals();
    }

    shiftLeftMonth=async():Promise<{}>=>{
        const days = this.getDaysInMonth(this.monthRangeRoot.getFullYear(), this.monthRangeRoot.getMonth());
        this.monthRangeRoot = new Date(this.monthRangeRoot.getTime() - 24*3600*1000*days);
        this.setCurrentMonthDates();
        return this.setMonthVals();
    }

    shiftRightMonth=async():Promise<{}>=>{
        const days = this.getDaysInMonth(this.monthRangeRoot.getFullYear(), this.monthRangeRoot.getMonth() + 1);
        if(new Date().getTime() - this.monthRangeRoot.getTime() > 24*3600*1000*days){
            this.monthRangeRoot = new Date(this.monthRangeRoot.getTime() + 24*3600*1000*days);
            this.setCurrentMonthDates();
            return this.setMonthVals();
        }
    }

    shiftLeftYear = async():Promise<{}>=>{
        this.yearRangeRoot = new Date(this.yearRangeRoot.getTime() - 24*3600*1000*this.daysInAYear(this.yearRangeRoot.getFullYear()));
        this.setCurrentYearDates();
        return this.setYearVals();
    }

    shiftRightYear = async():Promise<{}>=>{
        this.yearRangeRoot = new Date(this.yearRangeRoot.getTime() + 24*3600*1000*this.daysInAYear(this.yearRangeRoot.getFullYear()));
        this.setCurrentYearDates();
        return this.setYearVals();
    }

    daysInAYear=(year:number)=>
    {
      return this.isLeapYear(year) ? 366 : 365;
    }
    
    
    isLeapYear(year) {
         return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }


}