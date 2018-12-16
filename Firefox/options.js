function saveOptions(e) {
  // update variables on form submit
  console.log('Saving options')
  e.preventDefault();
  console.log(document.querySelector("#remove_sponsored_posts").checked,document.querySelector("#remove_pop_across_fb_posts").checked);
  browser.storage.sync.set({
    "remove_sponsored_posts": document.querySelector("#remove_sponsored_posts").checked,
    "remove_pop_across_fb_posts": document.querySelector("#remove_pop_across_fb_posts").checked
  });
}

function setCurrentChoice(result) {
  console.log("Initialize variables..")
  // check if keys are already there in the storage
  if ("remove_sponsored_posts" in result && "remove_pop_across_fb_posts" in result){
    document.querySelector("#remove_sponsored_posts").checked = result.remove_sponsored_posts;
    document.querySelector("#remove_pop_across_fb_posts").checked = result.remove_pop_across_fb_posts;
  }
  else{  // create keys with default value of true (yeah I hate both type of posts)
    console.log("Setting options for first time");
    browser.storage.sync.set({
      remove_sponsored_posts: true,
      remove_pop_across_fb_posts: true
    });
    document.querySelector("#remove_sponsored_posts").checked = true;
    document.querySelector("#remove_pop_across_fb_posts").checked = true;
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function InitializeOptions() {
  var getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);
}
// browser.storage.sync.clear()
document.addEventListener("DOMContentLoaded", InitializeOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
