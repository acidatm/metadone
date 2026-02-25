import CREATORS from "/data/creators.js"
import {uidFromArray} from "/js/tools/tools.js"

export default class ContentCreator{
	constructor(creator){
		this.creator = creator
		if(!this.creator || this.creator == null){
			this.creator = CREATORS[Math.floor(Math.random() * CREATORS.length)]
		}
		else if(this.creator != null && typeof this.creator == "object"){
			if(this.creator.length == 0){
				this.creator = null
			}
			else{
				let c = this.creator[Math.floor(Math.random() * this.creator.length)]
				let creator = uidFromArray(c,CREATORS)
				this.creator = creator
			}
			
		}

		if(this.creator){
			for(var k in this.creator){
				this[k] = this.creator[k]
			}
		}
	}
}