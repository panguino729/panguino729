function load() {
	Vue.component('show-list-row', {
		props: ['s', 'v'],
		template: `
		<div>
		<div class="col-md-12">
			<h2>{{s.show.name}}</h2>
			<div class="row">
				<div class="col-md-4 col-sm-4">
					<show-image v-if="s.show.image != null" v-bind:image="getThumbnail(s.show.image)"></show-image>
					<p v-else>No image available</p>
				</div>
				<div class="col-lg-4 col-sm-5">
					<span v-html="s.show.summary"></span>
				</div>
				<div class="col-md-4 col-sm-3">
					<p><b>Language:</b> {{s.show.language}}</p>
					<p><b>Genres:</b> {{getGenres(s.show.genres)}}</p>
				</div>
			</div>
		</div>
		<div class="col-md-12">
			<video-button-component v-bind:s="s" v-bind:videos="v"></video-button-component>
		</div>
		</div>`,
		methods: {
			getThumbnail(thumbnailDict) {
				// Get value for medium image
				if (thumbnailDict != null) {
					return thumbnailDict["medium"];
				}
				else {
					return null;
				}
			}, // end getThumbnail
			getGenres(genres) {
				let string = "";

				// Check if genres listed
				if (genres.length == 0) {
					string = "No genres found";
				}
				// Looping through genres and put in single string
				for (let i = 0; i < genres.length; i++) {
					if (i + 1 < genres.length) {
						string += genres[i] + ", ";
					}
					else {
						string += genres[i];
					}
				}
				return string;
			} // end getGenres
		} // end methods
	}); // end show-list-row

	Vue.component('video-button-component', {
		props: ['s', 'videos'],
		template: `
		<div>
			<button type="button" class="btn btn-outline-dark vidComBtn" v-on:click="searchVid(s.show.name, 1)">Get Videos</button>
			<select id="limitSelect" class="vidComBtn">
				<option value="5">5</option>
				<option value="10" selected>10</option>
				<option value="25">25</option>
			</select>
			<button type="button" class="btn btn-outline-dark vidComBtn" id="previousPageBtn" v-on:click="previousPage(s.show.name)" disabled=true>Previous Page</button>
			<p id="currentPageNum" class="vidComBtn">1</p>
			<button type="button" class="btn btn-outline-dark vidComBtn" id="nextPageBtn" v-on:click="nextPage(s.show.name)" disabled=true>Next Page</button>
			
			<div :id="s.show.name.replace(/[^a-zA-Z]/g, '') + 'Collapse'">
			</div>
		</div>`,
		methods: {
			nextPage(vidName) {
				let page = document.querySelector("#currentPageNum");
				let pageNum = parseInt(page.innerHTML);

				console.log(pageNum);

				// If the page number has not yet reached 99
				if (pageNum + 1 < 100) {
					page.value = pageNum + 1;
					page.innerHTML = pageNum + 1;
					document.querySelector("#previousPageBtn").disabled = false;
					this.searchVid(vidName, pageNum + 1);
				}
				else {
					document.querySelector("#nextPageBtn").disabled = true;
				}

			}, // end nextPage
			previousPage(vidName) {
				let page = document.querySelector("#currentPageNum");
				let pageNum = parseInt(page.innerHTML);

				// If the page number has not yet reached 1
				if (pageNum - 1 > 0) {
					page.value = pageNum - 1;
					page.innerHTML = pageNum - 1;
					document.querySelector("#nextPageBtn").disabled = false;
					this.searchVid(vidName, pageNum - 1);
				}
				else {
					document.querySelector("#previousPageBtn").disabled = true;
				}
			}, // end previousPage
			searchVid(vidName, page) {
				let videos = [];
				let limit = document.querySelector("#limitSelect").value;
				let pageDiv = document.querySelector("#currentPageNum");

				// Set page num
				pageDiv.innerHTML = page;

				vidName = encodeURI(vidName);
				fetch(`https://api.dailymotion.com/videos?thumbnail_ratio=square&fields=id,thumbnail_url%2Ctitle&search=${vidName}+tv+show&limit=${limit}&page=${page}`)
					.then(response => {
						if (response.ok) {
							return response.json();
						}
						else {
							throw new Error("This is not a valid URL");
						}
					})
					.then(json => {
						videos.push(json);
					})
					.catch(error => {
						//console.log(error);
					})
					.finally(() => {
						// Check if can move to next page
						if (videos[0].has_more == false) {
							document.querySelector("#nextPageBtn").disabled = true;
						}
						else {
							console.log("has more");
							document.querySelector("#nextPageBtn").disabled = false;
						}

						// Add videos to the page
						this.addVid(vidName, videos);
						return videos;
					})
			}, // end searchVid
			addVid(vidName, videos) {
				vidName = vidName.replace(/[^a-zA-Z]/g, ''); // remove any special characters
				let showDiv = document.querySelector(`#${vidName}Collapse`);
				let vidDiv = document.createElement("div");
				vidDiv.id = `${vidName}Videos`;
				vidDiv.className = "row videoList";

				// Clear video list
				// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
				while (showDiv.firstChild) {
					showDiv.removeChild(showDiv.lastChild);
				}

				// Check if videos were found
				if (videos.length == 0) {
					let error = document.createElement('p');
					error.innerHTML = "No videos found";
					vidDiv.appendChild(error);
					showDiv.appendChild(error);
					return;
				}

				// For videos in list, show the thumbnails
				for (let i = 0; i < videos[0].list.length; i++) {
					// Set src to video thumbnail
					let vidImg = document.createElement('img');
					vidImg.className = "col-4 videoThumbnail"
					vidImg.src = videos[0].list[i].thumbnail_url;

					// Set video thumbnail link to video link
					let vidLink = document.createElement('a');
					vidLink.title = `${videos[0].list[i].title}`;
					vidLink.href = `https://www.dailymotion.com/video/${videos[0].list[i].id}`;

					// Append video thumbnail to link, then to overall div
					vidLink.appendChild(vidImg);
					vidDiv.appendChild(vidLink);
				}
				showDiv.appendChild(vidDiv);
			} // end addVid
		} // end Methods
	}); // end video-button-component

	Vue.component('show-image', {
		props: [`image`],
		template: `<div><img :src="image" alt="TV Show image"></div>`
	}); // end show-image
} // end load

export { load };