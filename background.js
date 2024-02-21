
 chrome.tabs.onUpdated.addListener((tabId, tab) => {
     if (tab.url.includes("symble.app")) {
        chrome.tabs.sendMessage(tabId, {type: "init"});
     }
 });

 
 chrome.runtime.onInstalled.addListener(async () => {
     for (const cs of chrome.runtime.getManifest().content_scripts) {
       for (const tab of await chrome.tabs.query({url: cs.matches})) {
         chrome.scripting.executeScript({
           target: {tabId: tab.id},
           files: cs.js,
         });
       }
     }
   });
 