var pop_count = 0
var sponsored_count = 0
// if above not set, then following warning appears while addon submission
//Warning: Due to both security and performance concerns, this may not be set using dynamic values which have not been adequately sanitized. This can lead to security issues or fairly serious performance degradation.
function saveOptions(e) {
  // update variables on form submit
  console.log('Saving options')
  e.preventDefault();
  console.log(document.querySelector("#remove_sponsored_posts").checked,document.querySelector("#remove_pop_across_fb_posts").checked);
  chrome.storage.local.set({
    "remove_sponsored_posts": document.querySelector("#remove_sponsored_posts").checked,
    "remove_pop_across_fb_posts": document.querySelector("#remove_pop_across_fb_posts").checked
  });
  window.close();  // close the popup

}

function InitializeOptions() {
  // this function is called everytime extention icon is clicked / popup comes up
  chrome.storage.local.get(["remove_sponsored_posts", "remove_pop_across_fb_posts", "sponsored_count", "pop_count"], function(item) {
    // console.log("initializing", item);
    document.querySelector("#remove_sponsored_posts").checked = item.remove_sponsored_posts;
    document.querySelector("#remove_pop_across_fb_posts").checked = item.remove_pop_across_fb_posts;
    sponsored_count = item.sponsored_count;
    pop_count = item.pop_count;
    stat_div = document.getElementById("stat_div")
    if (stat_div){
      stat_div.remove();
    }
    var div = document.createElement('div');
    div.setAttribute("id", "stat_div");
    div.innerHTML = 'Total Sponsored posts removed: ' + sponsored_count + '<br>' + 'Total "Popular Across Facebook" posts removed: ' + pop_count; + '<br><br>';
    document.body.appendChild(div);
  });  
}
document.addEventListener("DOMContentLoaded", InitializeOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

//local is alocal process
