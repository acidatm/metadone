import CREATORS from "/data/creators.js"
import {uidFromArray} from "/js/tools/tools.js"
import ContentCreator from "./ContentCreator.js"

export default class CoCreator{
	constructor(creator){
		this.creator = creator
		this.cocreators = {}

		if(this.creator){
			for(var k in this.creator){
				this[k] = this.creator[k]
			}
		}
		for(let k of Object.keys(this.collaborators.cocreators)){
			let c = this.collaborators.cocreators[k]
			this.cocreators[k] = new ContentCreator(CREATORS[c[Math.floor(Math.random() * c.length)]])
		}
		// console.log(this.cocreators)
	}
}