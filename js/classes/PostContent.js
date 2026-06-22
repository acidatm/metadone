import * as HTML_GENERATORS from "/js/generators/htmlGenerators.js"
import * as AUDIO_GENERATORS from "/js/generators/audioGenerators.js"
import * as CAPTION_GENERATORS from "/js/generators/captionGenerators.js"
import * as SHADER_GENERATORS from "/js/generators/shaderGenerators.js"
import {RNG} from "/js/tools/tools.js"
import visualCreators from "/data/visualCreators.js"
import textCreators from "/data/textCreators.js"
import producers from "/data/producers.js"
import env from "/data/env.js"

export default class PostContent{
	constructor(values,ctx){
		this.PARAMETERS = values.parameters

		this.creator = values.creator
		this.producer1 = values.producer1
		this.producer2 = values.producer2

		this.ctx = ctx

		this.html = []
		this.sound = []
		this.captions = []
		this.shader = ""

		this.seed = (Math.random() * performance.now()) % 1 
		
		this.init()
	}
	init(){
		let inputs = this.PARAMETERS.parameters[this.creator.uid].map(v => RNG.base36ToFloat(v))
		this.generateHTML(inputs)
		this.generateSound()
		this.generateCaption(inputs)
		if(this.creator.shader){
			this.generateShader(inputs)
		}
		
	}
	generateShader(inputs){
		let shader = new SHADER_GENERATORS[this.creator.uid](inputs)
		this.shader = shader.shader
	}
	generateHTML(inputs){
		this.html.push(new HTML_GENERATORS[this.creator.uid]({inputs:inputs,dict:this.creator.uid}).html)	
	}
	generateSound(){
		let p1 = this.PARAMETERS.parameters[this.producer1.uid].map(v => RNG.base36ToFloat(v))
		let p2 = this.PARAMETERS.parameters[this.producer2.uid].map(v => RNG.base36ToFloat(v))
		this.sound.push(new AUDIO_GENERATORS[this.producer1.uid](p1,this.ctx))
		this.sound.push(new AUDIO_GENERATORS[this.producer2.uid](p2,this.ctx))
	}
	generateCaption(inputs){
		this.captions.push(new CAPTION_GENERATORS[this.creator.uid]({inputs:inputs,dict:this.creator.uid}).caption)
	}	
}