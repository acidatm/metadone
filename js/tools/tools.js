export function uidFromArray(uid,array){
	for(let a of array){
		if(a.uid == uid){
			return a
		}
	}
	return null
}

export const RNG = {
	base: (36*36*36*36*36*36)-1,
	floatToBase36: function(float){
		return Math.floor(float * RNG.base).toString(36).padStart(6,"0")
	},
	intToBase36: function(int){
		return (int).toString(36).padStart(6,"0")
	},
	base36ToFloat: function(base36){
		return parseInt(base36, 36) / RNG.base
	},
	base36ToInt: function(base36){
		return parseInt(base36, 36)
	},
	filterFloat: function(float){
		return RNG.base36ToFloat(RNG.floatToBase36(float))
	},
	selectFromList(seed,list){
		return list[Math.floor(seed * list.length)]
	},
	arrayToString(a){
		return a.join("")
	},
	stringToArray(s){
		return s.split(/(.{6})/).filter(Boolean)
	}
}

