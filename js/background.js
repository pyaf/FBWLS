chrome.runtime.onInstalled.addListener(function() {
    console.log("Setting options for first time");
    chrome.storage.local.set({
      "remove_sponsored_posts": true,
      "remove_pop_across_fb_posts": true,
      "sponsored_count": 0,
      "pop_count": 0
    });
    console.log('Done')
});