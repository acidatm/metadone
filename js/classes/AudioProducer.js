import PRODUCERS from "/data/producers.js"
import {uidFromArray} from "/js/tools/tools.js"

export default class AudioProducer{
	constructor(producer){
		this.producer = producer

		if(!this.producer){
			this.producer = PRODUCERS[Math.floor(Math.random() * PRODUCERS.length)]
		}
		else if(typeof this.producer == "object"){
			if(this.producer.length == 0){
				this.producer = null
			}
			else{
				let p = this.producer[Math.floor(Math.random() * this.producer.length)]
				let producer = uidFromArray(p,PRODUCERS)
				this.producer = producer
			}
			
		}

		if(this.producer){
			for(var k in this.producer){
				this[k] = this.producer[k]
			}
		}
	}
}