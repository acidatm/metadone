import PRIMARY_COLORS from "/data/lists/primaryColors.js"
import MELLOW_COLORS from "/data/lists/mellowColors.js"
import IMPACT_WORDS from "/data/lists/impactWords.js"

export class primaryColors{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return PRIMARY_COLORS[Math.floor(this.seed*PRIMARY_COLORS.length)].name + " is beautiful"
	}
}

export class mellowColors{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return MELLOW_COLORS[Math.floor(this.seed*MELLOW_COLORS.length)].name + " is mellow"
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



export class singleWords{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return IMPACT_WORDS[Math.floor(this.seed*IMPACT_WORDS.length)].toLowerCase()
	}
}

export class colorfulTypography{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		return IMPACT_WORDS[Math.floor(this.seed*IMPACT_WORDS.length)].toLowerCase()
	}
}

export class repeatWords{
	constructor(seed){
		this.seed = seed
		this.caption = this.init()
	}
	init(){
		let w = IMPACT_WORDS[Math.floor(this.seed*IMPACT_WORDS.length)].toLowerCase()
		return (w + " ").repeat(10)
	}
}

export class nothing{
	constructor(){
		this.caption = ""
	}
}