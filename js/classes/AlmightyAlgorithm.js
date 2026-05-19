import PostContent from "./PostContent.js"
import AdContent from "./AdContent.js"
import ContentCreator from "./ContentCreator.js"
import AudioProducer from "./AudioProducer.js"
import COLORS from "/data/lists/colors.js"

export default class AlmightyAlgorithm{
	constructor(user,logic,audio){
		this.USER = user
		this.LOGIC = logic
		this.AUDIO = audio
		this.ALGORITHM = {
			historyLength: 20,
			stepsSinceLastSurprise: 0,
			surpriseAfter: 20,
			surpriseShift: 2
		}
	}
	requestAd(){
		return new AdContent(new ContentCreator(["ad"]))
	}
	_determineUserPreference(user,list){
		let entries = []
		for(let e of list){
			let data = e.uid
			let weight = user.weights[data]
			e.weight = weight != null ? weight : 0.5 //user has no preference yet
			entries.push(e)
		}
		return entries
	}
	_weighByHistory(list,history){
		let values = []
		let length = Math.min(this.ALGORITHM.historyLength,history.length)
		for(let i = 0; i < length; i++){ //step back through history max of 20
				let post = history[history.length-1 - i]
				for(let c of post.content.creators){
					for(let input of c.inputs){
						for(let l of list){
							if(l.uid == input.uid){
								l.weight = l.weight * (0.9 + 0.1 * (1/(i+2)))
								// l.weight = l.weight / i
							}
						}
					}
				}
		}

		return list
	}
	_selectCreator(history,user){ //determine the next creator based on history and user preferences
		if(history.length == 0){
			return "visualPost"
		}
		else if(history[history.length - 1].content.creators[0].uid == "visualPost"){
			return "textPost"
		}
		else{
			return "visualPost"
		}
	}
	_setList(history,user,list){
		let l = null
		for(let k of Object.keys(list)){
			l = k
		}
		return l
	}
	_setEntry(history,user,list){
		let userPreferences = this._determineUserPreference(user,list)
		// userPreference.sort((a,b) => a.weight < b.weight)
		// console.log({...userPreference[0]})
		let historyPreferences = this._weighByHistory(userPreferences,history)
		let randomPreferences = historyPreferences
		// let randomPreferences = historyPreferences.map((e) => e.weight = e.weight * (1 + Math.random() * 0.1))
		randomPreferences.sort((a,b) => a.weight < b.weight)
		let entry = randomPreferences[0]
		let surprise = Math.pow(Math.random(),this.ALGORITHM.surpriseShift)
		if(surprise < this.ALGORITHM.stepsSinceLastSurprise / this.ALGORITHM.surpriseAfter){
			entry = randomPreferences[Math.floor(randomPreferences.length * Math.random())]
				this.ALGORITHM.stepsSinceLastSurprise = 0
				console.log("SURPRISE")
		}
		// console.log(history.length)
		// historyPreference.map((i) => console.log({id:i.name,weight:i.weight}))
		return entry
	}
	_setInputs(history,user,creator){
		let inputs = []
		for(let i in creator.creator.inputs){
			let input = creator.creator.inputs[i]
			switch(input){
				case "color":
					let list = this._setList(history,user,COLORS)
					let color = this._setEntry(history,user,COLORS[list])
					inputs[i] = color
					break
			}
		}
		return inputs
	}
	requestContent(history){
		this.ALGORITHM.stepsSinceLastSurprise += 1
		//DO ALGO STUFF
		let creator = this._selectCreator(history,this.USER)
		let creators = [new ContentCreator(creator)]
		// let creators = [new ContentCreator(["ad"])]
		let producers = [new AudioProducer(creators[0].collaborators.producers)]
		// let producers = [new AudioProducer(["ikeda"])]


		let creatorCollab = Math.round(Math.random()) == 1 ? true : false
		let producerCollab = Math.round(Math.random()) == 1 ? true : false
		creatorCollab = false
		producerCollab = true

		if(creators[0].cocreators){
			creators[0].cocreator = {}
			for(let k of Object.keys(creators[0].cocreators)){
				creators[0].cocreator[k] = new ContentCreator(creators[0].cocreators[k])
			}
		}

		if(creatorCollab){
			if(creators[0].collaborators.creators.length > 0){
				creators.push(new ContentCreator(creators[0].collaborators.creators))
			}
		}
		if(producerCollab){
			if(creators[0].collaborators.producers.length != 0){
				let selection = [...creators[0].collaborators.producers]
				selection.splice(selection.indexOf(producers[0].uid))
				producers.push(new AudioProducer(selection))
			}
		}
		
		// for(let c of creators){
		// 	c.inputs = this._setInputs(history,this.USER,c)
		// }

		let content = new PostContent(creators,producers,this.AUDIO)
		
		return content
	}
}