import * as HTML_GENERATORS from "/js/generators/htmlGenerators.js"
import * as AUDIO_GENERATORS from "/js/generators/audioGenerators.js"
import * as CAPTION_GENERATORS from "/js/generators/captionGenerators.js"

export default class PostContent{
	constructor(creators,producers,ctx){
		this.creators = creators
		this.producers = producers
		this.ctx = ctx

		this.html = []
		this.sound = []
		this.captions = []

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
			this.html.push(new HTML_GENERATORS[c.uid](this.seed,c))
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
		for(let c of this.creators){
			this.captions.push(new CAPTION_GENERATORS[c.uid](this.seed,c).caption)
		}
	}
}