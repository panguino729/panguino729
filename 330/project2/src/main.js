import * as components from "./vue-components.js";

function init() {
	components.load();

	// Local Storage
	let searchField = document.querySelector("#tvSearchField");

	let prefix = "kft3635-tvShow-";
	let showKey = prefix + "showName";

	// Get local storage
	let storedShow = window.localStorage.getItem(showKey);

	let app = new Vue({
		el: '#app',
		data: {
			title: "TV Search",
			tvInput: "",
			vidSearch: [],
			shows: {},
			videos: [],
			watchListSize: 0,
			watchList: {},
		}, // end data
		created() {
			// If previous search term, fill in field
			if (storedShow) {
				this.tvInput = window.localStorage.getItem(showKey);
				this.search();
			}
		}, // end Created
		methods: {
			search() {
				if (!this.tvInput) return;
				// clear previous searches
				this.vidSearch = [];
				this.videos = [];

				fetch(`https://api.tvmaze.com/search/shows?q=:${this.tvInput}`)
					.then(response => {
						if (!response.ok) {
							throw Error(`ERROR: ${response.statusText}`);
						}
						return response.json();
					})
					.then(json => {
						this.shows = json; // set shows
						window.localStorage.setItem(showKey, document.querySelector("#tvSearchField").value); // set search in local storage
						this.getShowNames(); // searches for videos based on show names
					});
			}, // end search
			getShowNames() {
				console.log("getShowNames");
				// pushes a list of show names
				for (let s of this.shows) {
					this.vidSearch.push(s.show.name);
				}

				// searches for videos based on show names
				for (let i = 0; i < this.vidSearch.length; i++) {
					console.log(this.vidSearch[i]);
					this.searchVid(this.vidSearch[i]);
				}
			}, // end getShowNames
			searchVid(vidName) {
				console.log(`Search Vid w/ name: ${vidName}`);
				vidName = encodeURI(vidName);
				fetch(`https://api.dailymotion.com/videos?fields=id,thumbnail_url%2Ctitle&search=${vidName}+tv+show&limit=10`)
					.then(response => {
						if (response.ok) {
							return response.json();
						}
						else {
							throw new Error("This is not a valid URL");
						}
					})
					.then(json => {
						this.videos.push(json);
					})
					.catch(error => {
						//console.log(error);
					})
					.finally(() => {
						let str = "There are no videos";
						//console.log(str);
						return str;
					})
			}, // end searchVid
			clearLocal() {
				// Remove items from local storage
				window.localStorage.removeItem(showKey);

				// Reset values
				this.tvInput = "";
				this.vidSearch = [];
				this.shows = {};
				this.videos = [];
			} // end clearLocal
		} // end methods
	}); // end app
}

export { init };