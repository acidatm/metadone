export default class User{
	constructor(){
		this.liked = []
		this.saved = []
		this._init()
	}
	like(post){
		this.liked.push(post.content)
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
			console.log("Set user data from local storage")
		}
		else{
			console.log("No local user data found!")
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
		console.log(this)
	}
	_getLocalStorage(){
		const data = localStorage.getItem("data")
		const json = JSON.parse(data)
		return json
	}
	_setLocalStorage(){
		console.log(this)
		localStorage.setItem("data", this._toJSON())
	}
	_toJSON(){
		return JSON.stringify({
			liked: this.liked,
			saved: this.saved
		})
	}
}