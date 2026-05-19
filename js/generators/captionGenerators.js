import COLORS from "/data/lists/colors.js"
import WORDS from "/data/lists/words.js"

export class visualPost{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return "visual"
	}
}

export class textPost{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed,this.list,this.language)
	}
	content(seed,list,language){
		return "text"
	}
}