// define two global parameters for sponsored posts and popular across facebook posts each, set true by default
var remove_sponsored_posts = true;
var remove_pop_across_fb_posts = true;

function clean_the_shit(){
	// get updated values from the browser storage
	var result = browser.storage.sync.get();
	result.then(function(item) {
	  	remove_sponsored_posts = item.remove_sponsored_posts;
		remove_pop_across_fb_posts = item.remove_pop_across_fb_posts;
	});
	if (remove_sponsored_posts || remove_pop_across_fb_posts){
		// get all the posts
		elems = document.querySelectorAll("[id^='hyperfeed_story_id_']");
		// loop over all the posts
		for (let x = 0; x < elems.length; x++){
			if(remove_sponsored_posts){ // remove sponsored
				if (elems[x].innerText.indexOf("SpSonSsoSredS") >= 0){
					elems[x].remove();
				}
			}
			if(remove_pop_across_fb_posts){ //  remove popular across facebook posts
				if (elems[x].innerText.indexOf("Popular Across Facebook") >= 0){
					elems[x].remove();
				}
			}
		}
	}
}

setInterval(
	() => clean_the_shit(),
	100
);

// about:debugging