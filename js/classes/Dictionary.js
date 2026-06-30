
export default class Dictionary{
	constructor(lang){
		this.LANGUAGES = lang
		return (async () => {
	      this.init()
	      return this
	    })()
	}
	async init(){
		this.loadDictionaries()
	}
	async loadDictionaries(){
		for(let lang of this.LANGUAGES){
			let path = `/data/dict/${lang}/${lang}.js`
			let key = String(lang).toUpperCase()
			import(path)
				.then((dict) => this[key] = dict.default)
				.catch(err => console.log(err))
		}
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