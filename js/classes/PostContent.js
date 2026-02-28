import * as HTML_GENERATORS from "/js/generators/htmlGenerators.js"
import * as AUDIO_GENERATORS from "/js/generators/audioGenerators.js"
import * as CAPTION_GENERATORS from "/js/generators/captionGenerators.js"
import {languages as LANGUAGES} from "/data/lists/words.js"

export default class PostContent{
	constructor(creators,producers,ctx){
		this.creators = creators
		this.producers = producers
		this.ctx = ctx

		this.html = []
		this.sound = []
		this.captions = []

		this.language = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)]
		this.topic = "soft"

		this.seed = (Math.random() * performance.now()) % 1 
		this.init()
	}
	init(){
		this.generateHTML()
		this.generateSound()
		this.generateCaption()
	}
	generateHTML(){
		for(let c of this.creators){
			let cocreators = {}
			if(c.cocreator){
				for(let k of Object.keys(c.cocreator)){
					cocreators[k] = new HTML_GENERATORS[c.cocreator[k].uid]({seed:this.seed,list:this.topic,language:this.language})
				}
			}
			this.html.push(new HTML_GENERATORS[c.uid]({seed:this.seed,list:this.topic,language:this.language},cocreators).html)
		}
	}
	generateSound(){
		for(let p of this.producers){
			if(p.uid){
				this.sound.push(new AUDIO_GENERATORS[p.uid](this.seed,this.ctx,p))
			}
		}
	}
	generateCaption(){
		for(let i = 0; i < this.creators.length; i++){
			let c = this.creators[i]
			let cocreators = {}
			if(c.cocreator){
				for(let k of Object.keys(c.cocreator)){
					cocreators[k] = new CAPTION_GENERATORS[c.cocreator[k].uid]({seed:this.seed,list:this.topic,language:this.language})
				}
			}
			this.captions.push(new CAPTION_GENERATORS[c.uid]({seed:this.seed,list:this.topic,language:this.language},cocreators).caption)
			if(i < this.creators.length -1){
				this.captions.push(" on ")
			}
			else{
				this.captions.push(".")
			}

		}
	}
}