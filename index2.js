
"use strict"

// emojify returns the corresponding emoji image
function emojify(name) {
	var out = `<img src="emojis/` + name + `.png">`
	return out
}

Vue.component("swatch",{
	props:["active","swatch","effect"],
	template: `
		<div class="grid-item">
			<div class="grid-cell--top" :style="effect(swatch)" >
				<span
					v-html="swatch.emoji"
					:class="{ bounce: swatch == active }"
				></span>
			</div>
			<div class="grid-cell--bottom" :style="{ color: swatch.color }">
				{{ swatch.color.toUpperCase() }}
			</div>
		</div>
	`
})

var app = new Vue({
	el : "#app",
	data :{
		active:"",
		swatches :[
			{ emoji: emojify("lion"    ), color: "#ff691f" },
		    { emoji: emojify("tiger"   ), color: "#fab81e" },
		    { emoji: emojify("fish"    ), color: "#7fdbb6" },
		    { emoji: emojify("frog"    ), color: "#19cf86" },
		    { emoji: emojify("dolphin" ), color: "#91d2fa" },
		    { emoji: emojify("whale"   ), color: "#1b95e0" },
		    { emoji: emojify("elephant"), color: "#abb8c2" },
		    { emoji: emojify("octopus" ), color: "#e81c4f" },
		    { emoji: emojify("pig"     ), color: "#f58ea8" },
		    { emoji: emojify("unicorn" ), color: "#981ceb" },
		    { emoji: emojify("rabbit"  ), color: "#ffffff" },
		    { emoji: emojify("wolf"    ), color: "#000000" },
		],
	},
	methods: {
		// method to activate a swatch (emoji/color)
		activate: function(swatch){
			this.active = swatch
		},
		//gradient  returns a precomposed gradient
		gradient: function(swatch){
			return{
				background:"linear-gradient(100deg,whitesmoke -100%, "+swatch.color+")",
			}
		}
	},
})












/*var app = new Vue({
	el: "#app",
	data: {
		active: emojify("sirius--man"),
		// sirius is an object that contains two states: man and dog
		sirius: {
			man: emojify("sirius--man"),
			dog: emojify("sirius--dog")
		}
	},
	methods: {
		// an animagus is a wizard whom can shapeshift
		animagus: function () {
			this.active = (
				this.active == this.sirius.man ?
					this.sirius.dog :
					this.sirius.man
			)
		},
		// breathe returns the corresponding .breathe--*
		breathe: function () {
			return (
				this.active == this.sirius.man ?
					"breathe--man" :
					"breathe--dog"
			)
		},
		// background returns the corresponding background
		background: function () {
			return (
				this.active == this.sirius.man ?
					"" :
					"black"
			)
		},
	}
})*/