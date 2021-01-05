import {RangeNode} from "./interfaces"

export class RangeModel<T extends RangeNode>{
    constructor(public model:T[]){
        this.verifyModel(model)
    }
    
    get data():T[]{
        return this.model;
    }
    /**
     * VerifyModel
     * @param model: LevelRange[]
     * Used during construction to verify that the loaded model for level ranges is valid
     */
    //the first item in levelSystemModel must have its firstLevel set to 1
    //the last LevelModel should not have an endLevel
    //this assumes that there is no level cap
    verifyModel(model:T[]):void{
        if(model.length < 1) throw new Error('ERROR: model is empty')
        if(model[0].start !== 1) throw new Error('ERROR: First level must start at 1')
        if(model[model.length - 1].end) throw new Error('ERROR: Last level must not have an endLevel property')
    
        let prevLastLevel = model[0].end;
    
        for(let i=1; i<model.length; i++){
            const endLevel = model[i].end
            if(endLevel && prevLastLevel){
                //startLevel should never be greater than endLevel
                if(model[i].start > endLevel) throw new Error(`ERROR: startLevel > endLevel ${i}`)
                //the current startLevel should be 1 more than the previous endLevel
                if(model[i].start - prevLastLevel !== 1) throw new Error(`ERROR: Level overlap/gap at index ${i}`)
                prevLastLevel = model[i].end
            }else{
                //its ok if it its the last one
                if(i !== model.length - 1) throw new Error(`ERROR: Index ${i} needs an endLevel property`)
                //check last start
                if(prevLastLevel){
                    if(model[i].start - prevLastLevel !== 1) throw new Error(`ERROR: Level overlap/gap at index ${i}`)
                }
            }
        }
    }

    //Finds the index from the range
    //returns the index via binary search
    getIndex(x:number):number{
        if(x < 1) throw new Error('x(level) must be atleast 1')
        //CASE 1: passed the last index
        const len = this.model.length;
        if(x >= this.model[len - 1].start){
            return len - 1;
        }

        //CASE 2 somewhere in the middle
        let start = 0;
        let end = len -2;
        let mid = Math.floor((start + end)/2);
        let startRange = this.model[mid].start;
        let endRange = this.model[mid].end;

        while(start <= end){
            mid = Math.floor((start + end)/2);
            startRange = this.model[mid].start;
            endRange = this.model[mid].end;
            
            if(endRange && x >= startRange && x <= endRange){
                break
            }
            else if(x < startRange){
                end = mid - 1;
            }else{
                start = mid + 1;
            }
        }
        return mid
    }
}
