
export default class Dictionary{
	constructor(lang,synced){
		this.LANGUAGES = lang
		this.LANG_KEYS = this.LANGUAGES.map((l) => String(l).toUpperCase())
		this.LANGUAGES_LOADED = 0
		this.loaded = false
		return (async () => {
	      this.init(synced)
	      return this
	    })()
	}
	async init(synced){
		this.loadDictionaries(synced)
	}
	async loadDictionaries(synced){
		let i = 0
		for(let lang of this.LANG_KEYS){
			i++
			let path = `/data/dict/${lang}/${lang}.js`
			let key = String(lang).toUpperCase()
			if(synced){
				import(path)
				.then(function(dict){
					this[key] = dict.default
					this.LANGUAGES_LOADED += 1
					if(this.LANGUAGES_LOADED >= this.LANGUAGES.length){
						this.loaded = true
					}
				})
			}
			else{
				setTimeout(function() {
					import(path)
					.then(function(dict){
						this[key] = dict.default
						this.LANGUAGES_LOADED += 1
						// console.log("loaded " + key)
						if(this.LANGUAGES_LOADED >= this.LANGUAGES.length){
							this.loaded = true
							// console.log("loaded")
							// console.log(this.randomWords(100))
						}
					}.bind(this))
					.catch(err => console.log(err))
				}.bind(this), i*400);
			}
		}
	}
	randomWords(n){
		let r = {}
		for(let l of this.LANG_KEYS){
			r[l] = []
			for(let i = 0; i < n; i++){
				r[l].push(this[l][Math.floor(Math.random() * this[l].length)])
			}
		}
		return r
	}
	// async loadDictionary(lang){
	// 	let path = `/data/dict/${lang}/${lang}.js`
	// 	let d = null
	// 	import(path)
	// 		.then(function(obj){
	// 			 return obj.default
	// 		})
	// 		.catch(err => console.log(err))
	// }
}