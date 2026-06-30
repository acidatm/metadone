import Dictionary from "/js/classes/Dictionary.js"
import PLACEHOLDERS from "/data/dict/placeholders.js"

setTimeout(function() {
  new Dictionary(["en","de","ru","ar","zh","hi","es","fr","he","uk"]).then((d) => DICTIONARY = d)
}, 1000);

let DICTIONARY = {}




export default {
	get textPostEN(){
		if(DICTIONARY["EN"]){
			return DICTIONARY.EN
		}
		else{
			return PLACEHOLDERS.EN
		}
	},
	get textPostDE(){
		if(DICTIONARY["DE"]){
			return DICTIONARY.DE
		}
		else{
			return PLACEHOLDERS.DE
		}
	},
	get textPostRU(){
		if(DICTIONARY["RU"]){
			return DICTIONARY.RU
		}
		else{
			return PLACEHOLDERS.RU
		}
	},
	get textPostAR(){
		if(DICTIONARY["AR"]){
			return DICTIONARY.AR
		}
		else{
			return PLACEHOLDERS.AR
		}
	},
	get textPostZH(){
		if(DICTIONARY["ZH"]){
			return DICTIONARY.ZH
		}
		else{
			return PLACEHOLDERS.ZH
		}
	},
	get textPostHI(){
		if(DICTIONARY["HI"]){
			return DICTIONARY.HI
		}
		else{
			return PLACEHOLDERS.HI
		}
	},
	get textPostES(){
		if(DICTIONARY["ES"]){
			return DICTIONARY.ES
		}
		else{
			return PLACEHOLDERS.ES
		}
	},
	get textPostFR(){
		if(DICTIONARY["FR"]){
			return DICTIONARY.FR
		}
		else{
			return PLACEHOLDERS.FR
		}
	},
	get textPostHE(){
		if(DICTIONARY["HE"]){
			return DICTIONARY.HE
		}
		else{
			return PLACEHOLDERS.HE
		}
	},
	get textPostUK(){
		if(DICTIONARY["UK"]){
			return DICTIONARY.UK
		}
		else{
			return PLACEHOLDERS.UK
		}
	},
}