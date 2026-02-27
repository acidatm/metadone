import COLORS from "/data/lists/colors.js"
import WORDS from "/data/lists/words.js"


export class gradients{
	constructor(seed,cocreators){
		this.seed = seed
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
export class primaryColors{
	constructor(seed){
		this.seed = seed
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
	constructor(seed){
		this.seed = seed
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
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return "shade #" + Math.ceil(this.seed * 200)
	}
}

export class colorType{
	constructor(seed,cocreators){
		this.seed = seed
		this.text = cocreators.text
		this.color = cocreators.color
		this.caption = this.init()
	}
	init(){
		return this.text.content(this.seed) + " set in " + this.color.content(this.seed)
	}
	content(){
		return ""
	}
}

export class singleWords{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed)
	}
	content(seed){
		return WORDS.impactful[Math.floor(this.seed*WORDS.impactful.length)].toUpperCase()
	}
}

export class repeatWords{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed)
	}
	content(seed){
		// return ((WORDS.impactful[Math.floor(seed*WORDS.impactful.length)].toUpperCase()) + " ").repeat(10)
		return WORDS.impactful[Math.floor(this.seed*WORDS.impactful.length)].toUpperCase()
	}
}

export class nothing{
	constructor(){
		this.caption = ""
	}
}