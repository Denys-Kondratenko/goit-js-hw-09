const t={statrBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e=null;t.stopBtn.disabled=!0,t.statrBtn.addEventListener("click",(()=>{e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.statrBtn.disabled=!0,t.stopBtn.disabled=!1}),1e3)})),t.stopBtn.addEventListener("click",(()=>{clearInterval(e),t.statrBtn.disabled=!1,t.stopBtn.disabled=!0}));
//# sourceMappingURL=01-color-switcher.5c291d51.js.map
