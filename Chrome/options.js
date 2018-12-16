function saveOptions(e) {
  // update variables on form submit
  console.log('Saving options')
  e.preventDefault();
  console.log(document.querySelector("#remove_sponsored_posts").checked,document.querySelector("#remove_pop_across_fb_posts").checked);
  chrome.storage.sync.set({
    "remove_sponsored_posts": document.querySelector("#remove_sponsored_posts").checked,
    "remove_pop_across_fb_posts": document.querySelector("#remove_pop_across_fb_posts").checked
  });
  window.close();  // close the popup

}

function InitializeOptions() {
  chrome.storage.sync.get("remove_sponsored_posts", function(item) {
      document.querySelector("#remove_sponsored_posts").checked = item.remove_sponsored_posts;
  });
  chrome.storage.sync.get("remove_pop_across_fb_posts", function(item) {
    document.querySelector("#remove_pop_across_fb_posts").checked = item.remove_pop_across_fb_posts;
  });  
}

document.addEventListener("DOMContentLoaded", InitializeOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
var element = document.getElementById('stats');

element.addEventListener("click", function (e) {
  e.preventDefault(); // important
  chrome.storage.sync.get(["sponsored_count", "pop_count"], function(item) {
    sponsored_count = item.sponsored_count;
    pop_count = item.pop_count;
    alert('Total Sponsored posts removed: ' + sponsored_count + '\n' + 'Total "Popular Across Facebook" posts removed: ' + pop_count)
    window.close();
  });
});


//sync is async process