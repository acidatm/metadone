import {RNG} from "/js/tools/tools.js"
import visualCreators from "/data/visualCreators.js"
import textCreators from "/data/textCreators.js"
import PRODUCERS from "/data/producers.js"
import env from "/data/env.js"

export default class User{
	constructor(){
		this.ALGORITHM = env.User
		this.liked = []
		this.saved = []
		this.chances = {
			visualPostCreatorChances:[],
			textPostCreatorChances:[],
			producerChances:[]
		}
		this.parameters = {}
		this.statistics = {
			postsViewed: 0,
			postsLiked: 0,
			postsSaved: 0,
			averageViewTime: null
		}
		this._resetLocalStorage()
		this._init()
	}

	get trueRandomTextCreatorIndex(){
		let r = Math.random()
		return Math.floor(r * textCreators.length)
	}
	get randomTextCreatorIndex(){
		return 0
		let r = Math.random()
		let rB = this.chances.textPostCreatorChances[Math.floor(r*this.chances.textPostCreatorChances.length)]
		let _r = RNG.base36ToFloat(rB)
		return Math.floor(_r * textCreators.length)
	}

	get trueRandomVisualCreatorIndex(){
		let r = Math.random()
		return Math.floor(r * visualCreators.length)
	}
	get randomVisualCreatorIndex(){
		let r = Math.random()
		let rB = this.chances.visualPostCreatorChances[Math.floor(r*this.chances.visualPostCreatorChances.length)]
		let _r = RNG.base36ToFloat(rB)
		return Math.floor(_r * visualCreators.length)
	}

	get trueRandomAudioProducerIndex(){
		let r = Math.random()
		return Math.floor(r * PRODUCERS.length)
	}
	get randomAudioProducerIndex(){
		let r = Math.random()
		let rB = this.chances.producerChances[Math.floor(r*this.chances.producerChances.length)]
		let _r = RNG.base36ToFloat(rB)
		return Math.floor(_r * PRODUCERS.length)
	}

	getCreatorFromIndex(i){
		let c = null
		if(i < env.global.visualCreatorBufferCutoff){
			c = visualCreators[i]
		}
		else if(i < env.global.audioProducerBufferCutoff){
			c = textCreators[i - env.global.visualCreatorBufferCutoff]
		}
		else{
			c = PRODUCERS[i - env.global.audioProducerBufferCutoff]
		}
		return c
	}

	_initChances(){
		for(let c in this.chances){
			for(let i = 0; i < this.ALGORITHM.initialRandomNumbersAmount; i++){
				this.chances[c].push(RNG.floatToBase36(Math.random()))
			}
		}
	}
	_initParameters(){
		for(let p of PRODUCERS){
			this.parameters[p.uid] = []
			for(let n = 0; n < p.inputs; n++){
				let a = []
				for(let i = 0; i < this.ALGORITHM.initialRandomParametersAmount; i++){
					a.push(RNG.floatToBase36(Math.random()))
				}
				this.parameters[p.uid].push(a)
			}
		}
		for(let c of textCreators){
			this.parameters[c.uid] = []
			let a = []
			for(let i = 0; i < this.ALGORITHM.initialRandomParametersAmount; i++){
				a.push(RNG.floatToBase36(Math.random()))
			}
			this.parameters[c.uid].push(a)
		}
		for(let v of visualCreators){
			this.parameters[v.uid] = []
			for(let n = 0; n < v.inputs; n++){
				let a = []
				for(let i = 0; i < this.ALGORITHM.initialRandomParametersAmount; i++){
					a.push(RNG.floatToBase36(Math.random()))
				}
				this.parameters[v.uid].push(a)
			}
		}
	}
	_rateChance(key,value,dir){
		if(dir < 0){
			if(this.chances[key].length > 3){ //dont take the last
				this.chances[key].splice(this.chances[key].indexOf(value), 1)
			}
		}
		else{
			this.chances[key].push(value)
		}
	}
	_rewardParameters(p){
		for(let k in p){
			let i = 0
			for(let e of p[k]){
				this.parameters[k][i].push(e)
				i++
			}
		}
	}
	_punishParameters(parameters){
		for(let key in parameters){
			let i = 0
			for(let entry of parameters[key]){
				let n = 0
				let maxDelta = 1
				let indexToRemove = -1
				let entryValue = RNG.base36ToFloat(entry)
				for(let _e of this.parameters[key][i]){
					let _eValue = RNG.base36ToFloat(_e)
					let delta = Math.abs(entryValue - _eValue)
					if(delta < maxDelta){
						maxDelta = delta
						indexToRemove = n
					}
					n++
				}
				if(this.parameters[key][i].length > 3){ //dont take last element
					this.parameters[key][i].splice(indexToRemove,1)
				}
				i++
			}
		}
	}
	_ratePost(post,dir){
		let creator = post.content.creator.uid
		let chanceType = post.content.creator.type == "text" ? "textPostCreatorChances" : "visualPostCreatorChances"
		let producer1 = post.content.producer1.uid
		let producer2 = post.content.producer2.uid
		let parameters = post.content.PARAMETERS.parameters
		this._rateChance(chanceType,post.content.PARAMETERS.creator,dir)
		this._rateChance("producerChances",post.content.PARAMETERS.producer1,dir)
		this._rateChance("producerChances",post.content.PARAMETERS.producer2,dir)
		if(dir > 0){
			// this._rewardParameters(parameters)
			this._punishParameters(parameters)
		}
		else{
			this._punishParameters(parameters)
		}
	}
	_rewardPost(post){
		this._ratePost(post,1)
		// console.log("post rewarded")
	}
	_punishPost(post){
		this._ratePost(post,-1)
		// console.log("post punished")
	}
	like(post){
		this.statistics.postsLiked += 1
		this.liked.push(post.content)
		this._rewardPost(post)
		this._save()
	}
	unlike(post){
		this.statistics.postsLiked -= 1
		this.liked.splice(this.liked.indexOf(post.content),1)
		this._save()
	}
	save(post){
		this.statistics.postsSaved += 1
		this.saved.push(post.content)
		this._rewardPost(post)
		this._save()
	}
	remove(post){
		this.statistics.postsSaved -= 1
		this.saved.splice(this.saved.indexOf(post.content),1)
		this._save()
	}
	reviewPostViewTime(post){
		let t = post.statistics.viewTime
		if(!this.statistics.averageViewTime){ //first view
			this.statistics.averageViewTime = t 
		}
		else{
			if(t > (this.statistics.averageViewTime * 2)){ //dont skew statistics too much
				t = this.statistics.averageViewTime * 2
			}
			else if(t < (this.statistics.averageViewTime / 10)){ //dont skew statistics too much
				t = this.statistics.averageViewTime / 10
			}
			this.statistics.averageViewTime = ((this.statistics.averageViewTime * this.statistics.postsViewed) + t) / (this.statistics.postsViewed + 1)
		}
		this.statistics.postsViewed = this.statistics.postsViewed + 1
		if(t / this.statistics.averageViewTime < this.ALGORITHM.negativeViewtimeCutoff){
			this._punishPost(post)
		}
		else if(t / this.statistics.averageViewTime > this.ALGORITHM.positiveViewtimeCutoff){
			this._rewardPost(post)
		}
	}
	_init(){
		if(this._hasLocalData){
			this._refresh()
			console.log("Set user data from local storage")
		}
		else{
			this._initChances()
			this._initParameters()
			console.log("No local user data found!")
		}
	}
	_save(){
		// this._setLocalStorage()
		// this._refresh()
	}
	get _hasLocalData(){
		return false
		// return localStorage.getItem("data") != null
	}
	_resetLocalStorage(){
		localStorage.removeItem("data");
	}
	_refresh(){
		let json = this._getLocalStorage()
		this.liked = json.liked
		this.saved = json.saved

		for(let c in json.chances){
			this.chances[c] = RNG.stringToArray(json.chances[c])
		}

		for(let p in json.parameters){
			this.parameters[p] = RNG.stringToArray(json.parameters[p])
		}

	}
	_getLocalStorage(){
		const data = localStorage.getItem("data")
		const json = JSON.parse(data)
		return json
	}
	_setLocalStorage(){
		localStorage.setItem("data", this._toJSON())
	}
	_toJSON(){
		let _c = {}
		for(let c in this.chances){
			_c[c] = RNG.arrayToString(this.chances[c])
		}

		let _p = {}
		for(let p in this.parameters){
			_p[p] = RNG.arrayToString(this.parameters[p])
		}
		
		return JSON.stringify({
			liked: this.liked,
			saved: this.saved,
			chances: _c,
			parameters: _p
		})
	}
}