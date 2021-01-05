import {LevelRange, LabelRange, UserLevel, Progress} from "./interfaces"
import {RangeModel} from "./RangeModel"

export class LevelSystem{
    levelsModel:RangeModel<LevelRange>;
    labelsModel:RangeModel<LabelRange>;
    constructor(
        public levelsDef:LevelRange[],
        public labelsDef:LabelRange[]
    ){
        this.levelsModel = new RangeModel<LevelRange>(levelsDef);
        this.labelsModel = new RangeModel<LabelRange>(labelsDef);
    }
    /**
     * getNewLevel
     * Given a user's data, return the new object with updated level and xp after adding addxp based on this.model definition
     * @param param0: UserLevel
     * @param addxp 
     */
    //Comment comment
    getNewLevel({level, xp}:UserLevel, addxp:number):UserLevel{
        //CASE 1: the current level is already passed the max
        const lastRange = this.levelsDef[this.levelsDef.length - 1]
        const i = this.labelsModel.getIndex(level);
        //once we found the index, we need to loop each levelRange in this.model
        //to find where the addition of xp ends

        //first lets go until the last level
        for(let x=i; x<this.levelsDef.length; x++){
            const {start: startLevel, end: endLevel, xpPerLevel} = this.levelsDef[x]
            if(endLevel){
                const levelsGained = Math.floor(xp + addxp / xpPerLevel);
                //end case
                if(level + levelsGained <= endLevel){
                    return{
                        level: level + levelsGained,
                        xp: (xp + addxp) % xpPerLevel
                    }
                }
                //we need to go to the next level
                addxp -= (xpPerLevel - xp) + (endLevel - level)*xpPerLevel;
                xp = 0;
                level = endLevel + 1;
            }
        }
        //we've reached the last level
        return{
            level: level + Math.floor(addxp / lastRange.xpPerLevel),
            xp: (addxp) % lastRange.xpPerLevel
        }
    }

    getLabel(level:number):string{
        const index = this.labelsModel.getIndex(level);
        return this.labelsDef[index].label
    }

    getProgress({level, xp}:UserLevel):Progress{
        const i = this.levelsModel.getIndex(level);
        return {
            xp: xp,
            max: this.levelsDef[i].xpPerLevel
        }
    }

    getXp(level:number):number{
        const i = this.levelsModel.getIndex(level);
        return this.levelsDef[i].xpPerLevel;
    }

    isLastGrou(level:number):boolean{
        const i = this.levelsModel.getIndex(level);
        return i == this.levelsDef.length - 1;
    }
}
