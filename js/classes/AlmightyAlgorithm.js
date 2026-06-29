import PostContent from "./PostContent.js"
import ContentCreator from "./ContentCreator.js"
import AudioProducer from "./AudioProducer.js"
import visualCreators from "/data/visualCreators.js"
import textCreators from "/data/textCreators.js"
import {RNG} from "/js/tools/tools.js"
import env from "/data/env.js"

export default class AlmightyAlgorithm{
	constructor(user,logic,audio){
		this.USER = user
		this.LOGIC = logic
		this.AUDIO = audio
		this.ALGORITHM = env.AlmightyAlgorithm
	}
	_selectCreator(history,user,surprise){ //determine the next creator based on history and user preferences
		if(history.length == 0){
			return 0
		}
		else if(surprise){
			if(history.length % 2 == 1){
				return env.global.visualCreatorBufferCutoff + this.USER.randomTextCreatorIndex
			}
			else{
				return this.USER.randomVisualCreatorIndex
			}
		}
		else{
			if(history.length % 2 == 1){
				return env.global.visualCreatorBufferCutoff + this.USER.trueRandomTextCreatorIndex
			}
			else{
				return this.USER.trueRandomVisualCreatorIndex
			}
		}
	}
	_selectProducer(history,collaborator,user,surprise){ //determine the next creator based on history and user preferences
		if(surprise){
			return env.global.audioProducerBufferCutoff + this.USER.trueRandomAudioProducerIndex
			// if(!collaborator){ //no collaborator given
			// 	return env.global.audioProducerBufferCutoff + this.USER.trueRandomAudioProducerIndex
			// }
			// else{ //when collaborator is given make sure to not feature with self
			// 	let p = this.USER.trueRandomAudioProducerIndex
			// 	let i = 0
			// 	while(p == (collaborator - env.global.audioProducerBufferCutoff) && i < 100){
			// 		p = this.USER.trueRndomAudioProducerIndex
			// 		i++
			// 	}
			// 	return env.global.audioProducerBufferCutoff + p
			// }
		}
		else{
			return env.global.audioProducerBufferCutoff + this.USER.randomAudioProducerIndex
			// if(!collaborator){ //no collaborator given
			// 	return env.global.audioProducerBufferCutoff + this.USER.randomAudioProducerIndex
			// }
			// else{ //when collaborator is given make sure to not feature with self
			// 	let p = this.USER.randomAudioProducerIndex
			// 	let i = 0
			// 	while(p == (collaborator - env.global.audioProducerBufferCutoff) && i < 100){
			// 		p = this.USER.randomAudioProducerIndex
			// 		i++
			// 	}
			// 	return env.global.audioProducerBufferCutoff + p
			// }
		}
		
	}
	_selectParameters(history,user,creator,surprise){
		let p = user.parameters[creator.uid]
		
		if(surprise){
			p = p.map(a => RNG.floatToBase36(Math.random()))
		}
		else{
			p = p.map(a => a[Math.floor(Math.random() * a.length)])
			p = p.map(function(v){
				let _v = RNG.base36ToFloat(v)
				_v = Math.max(0.00001,Math.min(_v + ((-1+Math.random()*2) * this.ALGORITHM.mutation),0.99999))
				_v = RNG.floatToBase36(_v)
				return _v
			}.bind(this))
		}
		
		return p
	}
	requestContent(history){
		this.ALGORITHM.stepsSinceLastSurprise += 1
		let surpriseChance = Math.random()
		let SURPRISE = false
		if((this.ALGORITHM.stepsSinceLastSurprise / this.ALGORITHM.surpriseAfter) > surpriseChance){
			this.ALGORITHM.stepsSinceLastSurprise = 0
			// console.log("SURPRISE")
			SURPRISE = true
		}


		let creatorIndex = this._selectCreator(history,this.USER,SURPRISE)
		let producer1Index = this._selectProducer(history,null,this.USER,SURPRISE)
		let producer2Index = this._selectProducer(history,producer1Index,this.USER,SURPRISE)

		let creator = this.USER.getCreatorFromIndex(creatorIndex)
		let producer1 = this.USER.getCreatorFromIndex(producer1Index)
		let producer2 = this.USER.getCreatorFromIndex(producer2Index)

		let params = {
			creator: creator,
			producer1: producer1,
			producer2: producer2,
			parameters: {
				creator: RNG.intToBase36(creatorIndex),
				producer1: RNG.intToBase36(producer1Index),
				producer2: RNG.intToBase36(producer2Index),
				parameters: {}
			}
		}

		params.parameters.parameters[creator.uid] = this._selectParameters(history,this.USER,creator,SURPRISE),
		params.parameters.parameters[producer1.uid] = this._selectParameters(history,this.USER,producer1,SURPRISE),
		params.parameters.parameters[producer2.uid] = this._selectParameters(history,this.USER,producer2,SURPRISE)

		let content = new PostContent(params,this.AUDIO)
		
		return content
	}
}