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

  let close = document.querySelector("#cucks_close");
  let move = document.querySelector("#cucks_move");
  let menu = document.querySelector("#tabContextMenu");

  menu.addEventListener("popupshowing", e => {
    let host = "cucks";
    try {
      host = hostOf(TabContextMenu.contextTab);
    }
    catch (ex) {
      console.error(ex);
    }
    close.setAttribute("label", `Close all ${host} tabs`);
    move.setAttribute("label", `Move all ${host} tabs to a new window`);
  }, true);

  close.addEventListener("click", e => {;
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

  move.addEventListener("click", e => {;
    let host = null;
    try {
      host = hostOf(TabContextMenu.contextTab);
    }
    catch (ex) {
      return;
    }

    let tomove = [];
    for (let tab of Array.from(gBrowser.tabs)) {
      try {
        if (hostOf(tab) === host) {
          tomove.push(tab);
        }
      }
      catch (ex) {
        console.error(ex);
      }
    }
    if (!tomove.length) {
      return;
    }
    let anchor = tomove.shift();
    tomove.reverse();
    let newwin = gBrowser.replaceTabWithWindow(anchor);
    newwin.addEventListener("load", e => {
      tomove.forEach(t => newwin.gBrowser.adoptTab(t, 1, false));
    });
  });
});
