import Dictionary from "/js/classes/Dictionary.js"
import PLACEHOLDERS from "/data/dict/placeholders.js"

let DICTIONARY = {}
new Dictionary(["en","de","ru","ar","zh","hi","es","fr","he","uk"],window.SHARED_POST).then((d) => DICTIONARY = d)



export default {
	get textPostEN(){
		if(DICTIONARY.loaded){
			return DICTIONARY.EN
		}
		else{
			return PLACEHOLDERS.EN
		}
	},
	get textPostDE(){
		if(DICTIONARY.loaded){
			return DICTIONARY.DE
		}
		else{
			return PLACEHOLDERS.DE
		}
	},
	get textPostRU(){
		if(DICTIONARY.loaded){
			return DICTIONARY.RU
		}
		else{
			return PLACEHOLDERS.RU
		}
	},
	get textPostAR(){
		if(DICTIONARY.loaded){
			return DICTIONARY.AR
		}
		else{
			return PLACEHOLDERS.AR
		}
	},
	get textPostZH(){
		if(DICTIONARY.loaded){
			return DICTIONARY.ZH
		}
		else{
			return PLACEHOLDERS.ZH
		}
	},
	get textPostHI(){
		if(DICTIONARY.loaded){
			return DICTIONARY.HI
		}
		else{
			return PLACEHOLDERS.HI
		}
	},
	get textPostES(){
		if(DICTIONARY.loaded){
			return DICTIONARY.ES
		}
		else{
			return PLACEHOLDERS.ES
		}
	},
	get textPostFR(){
		if(DICTIONARY.loaded){
			return DICTIONARY.FR
		}
		else{
			return PLACEHOLDERS.FR
		}
	},
	get textPostHE(){
		if(DICTIONARY.loaded){
			return DICTIONARY.HE
		}
		else{
			return PLACEHOLDERS.HE
		}
	},
	get textPostUK(){
		if(DICTIONARY.loaded){
			return DICTIONARY.UK
		}
		else{
			return PLACEHOLDERS.UK
		}
	},
}