export default class User{
	constructor(){
		this.liked = []
		this.saved = []
		this.weights = {}
		this.statistics = {
			postsViewed: 0,
			averageViewTime: null
		}
		this._resetLocalStorage()
		this._init()
	}
	_setWeightFromInteraction(uid){
		if(this.weights[uid]){
			this.weights[uid] = this.weights[uid] + ((1 - this.weights[uid]) / 2)
		}
		else{
			this.weights[uid] = 0.75
		}
		console.log(this.weights)
	}
	_setWeightFromView(uid,time){
		let delta = time / this.statistics.averageViewTime
		delta = delta > 1 ? Math.sqrt(delta) : delta
		if(this.weights[uid]){
			this.weights[uid] = this.weights[uid] * delta
		}
		else{
			this.weights[uid] = delta
		}
		console.log(this.weights)
	}
	reviewPostViewTime(post){
		if(this.statistics.averageViewTime == null){
			this.statistics.postsViewed = 1
			this.statistics.averageViewTime = post.statistics.viewTime
		}
		else{
			this.statistics.postsViewed += 1
			this.statistics.averageViewTime = ((this.statistics.averageViewTime * (this.statistics.postsViewed -1)) + post.statistics.viewTime) / this.statistics.postsViewed
		}
		// for(let c of post.content.creators){
		// 	for(let input of c.inputs){
		// 		this._setWeightFromView(input.uid,post.statistics.viewTime)
		// 	}
		// }
		// console.log({post:this.statistics.postsViewed,time:post.statistics.viewTime,avg:this.statistics.averageViewTime})
	}
	like(post){
		this.liked.push(post.content)
		for(let c of post.content.creators){
			for(let input of c.inputs){
				this._setWeightFromInteraction(input.uid)
			}
		}
		this._save()
	}
	unlike(post){
		this.liked.splice(this.liked.indexOf(post.content),1)
		this._save()
	}
	save(post){
		this.saved.push(post.content)
		this._save()
	}
	remove(post){
		this.saved.splice(this.saved.indexOf(post.content),1)
		this._save()
	}
	_init(){
		if(this._hasLocalData){
			this._refresh()
			// console.log("Set user data from local storage")
		}
		else{
			// console.log("No local user data found!")
		}
	}
	_save(){
		this._setLocalStorage()
		this._refresh()
	}
	get _hasLocalData(){
		return localStorage.getItem("data") != null
	}
	_resetLocalStorage(){
		localStorage.removeItem("data");
	}
	_refresh(){
		let json = this._getLocalStorage()
		this.liked = json.liked
		this.saved = json.saved
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
		return JSON.stringify({
			liked: this.liked,
			saved: this.saved
		})
	}
}