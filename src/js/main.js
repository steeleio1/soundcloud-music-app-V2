import $ from "jquery";

var client_id = "bf6bd2f4cf3e9219e73be126fe29fa20";



function getTracks (query) {
  return $.ajax({
	url: "http://api.soundcloud.com/tracks",
	data: {
		client_id: client_id,
		q: query
	},
    dataType: 'json'
  });
}

// gets the datafrom gettracks function, puts the data in the empty gettracks(), 
// i pull that data using response
	getTracks().then(function(response){
	console.log(response); 

	var resultsHTML = response.map(addMusicToPage);
	$(".search-results").html(resultsHTML)
	$(".songtitle").on("click", returnsongs)

});


$("button").on("click", function(event) {
	event.preventDefault()
	var search = $("input").val()
		console.log(search)
	getTracks(search).then(function(response){
		console.log(response)

		var resultsHTML = response.map(addMusicToPage);
		$(".search-results").html(resultsHTML)
		$(".songtitle").on("click", returnsongs)
		// $('.search-results').replaceAll(html);
		})
})


function returnsongs (event) {
	console.log(event.target.dataset.stream_url)
var song =  `    <audio class="audioplayer" controls="controls">
					<source src="${event.target.dataset.stream_url}?client_id=${client_id}" type="audio/mp3">
				 </audio>`;
$(".audioplayerbox").html(song);

}



function addMusicToPage (data){
  if (data.artwork_url === null){
    data.artwork_url = './images/smiley-face2.png'
  };
	var html = `

	<div class="artist-box">

		<div class="artistinfobox">
			<div class="artworkbox">
			 <img src="${data.artwork_url}" style="width: 100%;max-height: 100%">
		</div>

		<div class="songartistbox">
			<div class="songtitle" data-stream_url=${data.stream_url} >
			  <span data-stream_url=${data.stream_url}>${data.title}</span>
			</div>
		  <hr>

				<div class="artisttitle">
				  <span>${data.user.username}</span>
				</div>
			</div>

		</div>

	</div> `
    return html;
 };











