export function uidFromArray(uid,array){
	for(let a of array){
		if(a.uid == uid){
			return a
		}
	}
	return null
}