function clean_the_shit(){
	// updated values from the chrome storage
	chrome.storage.local.get(["remove_sponsored_posts", "remove_pop_across_fb_posts", "sponsored_count", "pop_count"], function(item) {
	  	remove_sponsored_posts = item.remove_sponsored_posts;
		remove_pop_across_fb_posts = item.remove_pop_across_fb_posts;
		sponsored_count = item.sponsored_count;
		pop_count = item.pop_count;
		// console.log('start:', remove_sponsored_posts, remove_pop_across_fb_posts, sponsored_count, pop_count);
		if (remove_sponsored_posts || remove_pop_across_fb_posts){
			// get all the posts
			elems = document.querySelectorAll("[id^='hyperfeed_story_id_']");
			// loop over all the posts
			// console.log(elems.length);
			for (let x = 0; x < elems.length; x++){
				if(remove_sponsored_posts){ // remove sponsored
					if (elems[x].innerText.indexOf("SpSonSsoSredS") >= 0){
						elems[x].remove();
						sponsored_count += 1;
					}
				}
				if(remove_pop_across_fb_posts){ //  remove popular across facebook posts
					if (elems[x].innerText.indexOf("Popular Across Facebook") >= 0){
						elems[x].remove();
						pop_count += 1;
					}
				}
			}
		}
		// console.log('count:', sponsored_count, pop_count);
	    chrome.storage.local.set({
	      "sponsored_count": sponsored_count,
	      "pop_count": pop_count
	    });
	});
}

setInterval(
	() => clean_the_shit(),
	500
);

// about:debugging
