import PostContent from "./PostContent.js"
import ContentCreator from "./ContentCreator.js"
import AudioProducer from "./AudioProducer.js"

export default class AlmightyAlgorithm{
	constructor(user,logic,audio){
		this.USER = user
		this.LOGIC = logic
		this.AUDIO = audio
	}
	requestContent(history){
		//DO ALGO STUFF
		// let creators = [new ContentCreator()]
		let creators = [new ContentCreator()]
		// let producers = [new AudioProducer(creators[0].collaborators.producers)]
		let producers = [new AudioProducer(["ikeda"])]


		let creatorCollab = Math.round(Math.random()) == 1 ? true : false
		let producerCollab = Math.round(Math.random()) == 1 ? true : false
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

		let content = new PostContent(creators,producers,this.AUDIO)
		
		return content
	}
}