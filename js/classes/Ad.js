import Post from "./Post.js"

export default class Ad extends Post{
	constructor(root,id,content,user){
		super(root,id,content,user,true)
		this.id = "container-f93df89f606631407709f4d216ee7f95"
		// this.node = document.createElement("div")
		let inner = document.createElement("div")
		this.node.classList.add("post_ad")
		inner.classList.add("post_ad-inner")
		inner.id = this.id
		// this.node.style.background = "red"
		this.node.appendChild(inner)
	}
}