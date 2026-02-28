import COLORS from "/data/lists/colors.js"
import WORDS from "/data/lists/words.js"

export class ad{
	constructor(){
		this.caption = "This artwork is financed through advertisement!"
	}
}
export class gradients{
	constructor(data,cocreators){
		this.seed = data.seed
		this.cocreator = cocreators.color
		this.caption = this.init()
	}
	init(){
		return "from " + this.content(this.seed) + " to " + this.content((this.seed + 0.5) % 1)
	}
	content(seed){
		return this.cocreator.content(seed)
	}
}
export class splits{
	constructor(data,cocreators){
		this.seed = data.seed
		this.cocreator = cocreators.color
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + " and " + this.content((this.seed + 0.5) % 1)
	}
	content(seed){
		return this.cocreator.content(seed)
	}
}
export class primaryColors{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return COLORS.primary[Math.floor(seed*COLORS.primary.length)].name
	}
}

export class mellowColors{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return COLORS.mellow[Math.floor(seed*COLORS.mellow.length)].name
	}
}


export class shadesOfGrey{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return "shade #" + Math.ceil(this.seed * 200)
	}
}

export class colorType{
	constructor(data,cocreators){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.text = cocreators.text
		this.color = cocreators.color
		this.caption = this.init()
	}
	init(){
		return this.text.content(this.seed,this.list,this.language) + " set in " + this.color.content(this.seed)
	}
	content(){
		return ""
	}
}

export class singleWords{
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
		return WORDS[list][Math.floor(seed*WORDS[list].length)]["en"]
	}
}
export class transWords{
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
		return WORDS[list][Math.floor(seed*WORDS[list].length)]["en"]
	}
}

export class repeatWords{
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
		// return ((WORDS.impactful[Math.floor(seed*WORDS.impactful.length)].toUpperCase()) + " ").repeat(10)
		return WORDS[list][Math.floor(this.seed*WORDS[list].length)]["en"]
	}
}

export class nothing{
	constructor(){
		this.caption = ""
	}
}