addEventListener("load", e => {
  function uriOf(tab) {
    return tab.linkedBrowser.currentURI;
  }

  function hostOf(tab) {
    let host = uriOf(tab).host;
    if (!host) {
      throw Error("invalid host");
    }
    try {
      return Services.eTLD.getBaseDomainFromHost(host);
    }
    catch (ex) {
      return host;
    }
  }

  let mi = document.querySelector("#cucks_menuitem");
  let menu = document.querySelector("#tabContextMenu");

  menu.addEventListener("popupshowing", e => {
      let host = "cucks";
      try {
        host = hostOf(TabContextMenu.contextTab);
      }
      catch (ex) {
        console.error(ex);
      }
      mi.setAttribute("label", `Close all ${host} tabs`);
  }, true);

  mi.addEventListener("click", e => {;
      let host = null;
      try {
        host = hostOf(TabContextMenu.contextTab);
      }
      catch (ex) {
        return;
      }

      for (let tab of Array.from(gBrowser.tabs)) {
        try {
          if (hostOf(tab) === host) {
            gBrowser.removeTab(tab);
          }
        }
        catch (ex) {
          console.error(ex);
        }
      }
  });
});
