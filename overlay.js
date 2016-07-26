addEventListener("load", e => {
    function list_tabs() {
      let rv = [];
      for (let tab of Array.from(gBrowser.tabs)) {
        rv.push(tab.linkedBrowser.currentURI.spec);
      }
      return rv;
    }

    let mi = document.querySelector("#cucks_menuitem");
    mi.addEventListener("click", e => {
        alert(list_tabs().join("\n"));
        for (let tab of Array.from(gBrowser.tabs)) {
            try {
                let host = tab.linkedBrowser.currentURI.host;
                console.log(host);
                if (host === "www.mozilla.org") {
                    gBrowser.removeTab(tab);
                }
            }
            catch (ex) {
                console.error(ex);
            }
        }
    });
});
