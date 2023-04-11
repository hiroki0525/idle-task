"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[514,893],{5553:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Ce});var a=n(7378),l=n(8944),o=n(8831),r=n(5484),i=n(3149),c=n(6100),s=n(5611),d=n(2095),m=n(8788),u=n(9213),b=n(3457),p=n(4993);const h="backToTopButton_iEvu",E="backToTopButtonShow_DO8w";function f(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[n,l]=(0,a.useState)(!1),o=(0,a.useRef)(!1),{startScroll:r,cancelScroll:i}=(0,b.Ct)();return(0,b.RF)(((e,n)=>{let{scrollY:a}=e;const r=n?.scrollY;r&&(o.current?o.current=!1:a>=r?(i(),l(!1)):a<t?l(!1):a+window.innerHeight<document.documentElement.scrollHeight&&l(!0))})),(0,p.S)((e=>{e.location.hash&&(o.current=!0,l(!1))})),{shown:n,scrollToTop:()=>r(0)}}({threshold:300});return a.createElement("button",{"aria-label":(0,u.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,l.Z)("clean-btn",r.k.common.backToTopButton,h,e&&E),type:"button",onClick:t})}var g=n(3620),v=n(8357),k=n(624),_=n(898),C=n(5773);function I(e){return a.createElement("svg",(0,C.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}const S="collapseSidebarButton_oTwn",N="collapseSidebarButtonIcon_pMEX";function Z(e){let{onClick:t}=e;return a.createElement("button",{type:"button",title:(0,u.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,u.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,l.Z)("button button--secondary button--outline",S),onClick:t},a.createElement(I,{className:N}))}var T=n(10),w=n(1763);const x=Symbol("EmptyContext"),y=a.createContext(x);function L(e){let{children:t}=e;const[n,l]=(0,a.useState)(null),o=(0,a.useMemo)((()=>({expandedItem:n,setExpandedItem:l})),[n]);return a.createElement(y.Provider,{value:o},t)}var A=n(376),M=n(8862),B=n(1884),F=n(6457);function H(e){let{categoryLabel:t,onClick:n}=e;return a.createElement("button",{"aria-label":(0,u.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:t}),type:"button",className:"clean-btn menu__caret",onClick:n})}function P(e){let{item:t,onItemClick:n,activePath:o,level:i,index:s,...d}=e;const{items:m,label:u,collapsible:b,className:p,href:h}=t,{docs:{sidebar:{autoCollapseCategories:E}}}=(0,k.L)(),f=function(e){const t=(0,F.Z)();return(0,a.useMemo)((()=>e.href?e.href:!t&&e.collapsible?(0,c.Wl)(e):void 0),[e,t])}(t),g=(0,c._F)(t,o),v=(0,M.Mg)(h,o),{collapsed:_,setCollapsed:I}=(0,A.u)({initialState:()=>!!b&&(!g&&t.collapsed)}),{expandedItem:S,setExpandedItem:N}=function(){const e=(0,a.useContext)(y);if(e===x)throw new w.i6("DocSidebarItemsExpandedStateProvider");return e}(),Z=function(e){void 0===e&&(e=!_),N(e?null:s),I(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:l}=e;const o=(0,w.D9)(t);(0,a.useEffect)((()=>{t&&!o&&n&&l(!1)}),[t,o,n,l])}({isActive:g,collapsed:_,updateCollapsed:Z}),(0,a.useEffect)((()=>{b&&null!=S&&S!==s&&E&&I(!0)}),[b,S,s,I,E]),a.createElement("li",{className:(0,l.Z)(r.k.docs.docSidebarItemCategory,r.k.docs.docSidebarItemCategoryLevel(i),"menu__list-item",{"menu__list-item--collapsed":_},p)},a.createElement("div",{className:(0,l.Z)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":v})},a.createElement(B.Z,(0,C.Z)({className:(0,l.Z)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!h&&b,"menu__link--active":g}),onClick:b?e=>{n?.(t),h?Z(!1):(e.preventDefault(),Z())}:()=>{n?.(t)},"aria-current":v?"page":void 0,"aria-expanded":b?!_:void 0,href:b?f??"#":f},d),u),h&&b&&a.createElement(H,{categoryLabel:u,onClick:e=>{e.preventDefault(),Z()}})),a.createElement(A.z,{lazy:!0,as:"ul",className:"menu__list",collapsed:_},a.createElement(U,{items:m,tabIndex:_?-1:0,onItemClick:n,activePath:o,level:i+1})))}var R=n(5626),D=n(6125);const W="menuExternalLink_BiEj";function V(e){let{item:t,onItemClick:n,activePath:o,level:i,index:s,...d}=e;const{href:m,label:u,className:b,autoAddBaseUrl:p}=t,h=(0,c._F)(t,o),E=(0,R.Z)(m);return a.createElement("li",{className:(0,l.Z)(r.k.docs.docSidebarItemLink,r.k.docs.docSidebarItemLinkLevel(i),"menu__list-item",b),key:u},a.createElement(B.Z,(0,C.Z)({className:(0,l.Z)("menu__link",!E&&W,{"menu__link--active":h}),autoAddBaseUrl:p,"aria-current":h?"page":void 0,to:m},E&&{onClick:n?()=>n(t):void 0},d),u,!E&&a.createElement(D.Z,null)))}const Y="menuHtmlItem_OniL";function z(e){let{item:t,level:n,index:o}=e;const{value:i,defaultStyle:c,className:s}=t;return a.createElement("li",{className:(0,l.Z)(r.k.docs.docSidebarItemLink,r.k.docs.docSidebarItemLinkLevel(n),c&&[Y,"menu__list-item"],s),key:o,dangerouslySetInnerHTML:{__html:i}})}function j(e){let{item:t,...n}=e;switch(t.type){case"category":return a.createElement(P,(0,C.Z)({item:t},n));case"html":return a.createElement(z,(0,C.Z)({item:t},n));default:return a.createElement(V,(0,C.Z)({item:t},n))}}function O(e){let{items:t,...n}=e;return a.createElement(L,null,t.map(((e,t)=>a.createElement(j,(0,C.Z)({key:t,item:e,index:t},n)))))}const U=(0,a.memo)(O),G="menu_jmj1",K="menuWithAnnouncementBar_YufC";function J(e){let{path:t,sidebar:n,className:o}=e;const i=function(){const{isActive:e}=(0,T.nT)(),[t,n]=(0,a.useState)(e);return(0,b.RF)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return a.createElement("nav",{"aria-label":(0,u.I)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,l.Z)("menu thin-scrollbar",G,i&&K,o)},a.createElement("ul",{className:(0,l.Z)(r.k.docs.docSidebarMenu,"menu__list")},a.createElement(U,{items:n,activePath:t,level:1})))}const q="sidebar_CUen",Q="sidebarWithHideableNavbar_w4KB",X="sidebarHidden_k6VE",$="sidebarLogo_CYvI";function ee(e){let{path:t,sidebar:n,onCollapse:o,isHidden:r}=e;const{navbar:{hideOnScroll:i},docs:{sidebar:{hideable:c}}}=(0,k.L)();return a.createElement("div",{className:(0,l.Z)(q,i&&Q,r&&X)},i&&a.createElement(_.Z,{tabIndex:-1,className:$}),a.createElement(J,{path:t,sidebar:n}),c&&a.createElement(Z,{onClick:o}))}const te=a.memo(ee);var ne=n(3471),ae=n(2335);const le=e=>{let{sidebar:t,path:n}=e;const o=(0,ae.e)();return a.createElement("ul",{className:(0,l.Z)(r.k.docs.docSidebarMenu,"menu__list")},a.createElement(U,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&o.toggle(),"link"===e.type&&o.toggle()},level:1}))};function oe(e){return a.createElement(ne.Zo,{component:le,props:e})}const re=a.memo(oe);function ie(e){const t=(0,v.i)(),n="desktop"===t||"ssr"===t,l="mobile"===t;return a.createElement(a.Fragment,null,n&&a.createElement(te,e),l&&a.createElement(re,e))}const ce="expandButton_YOoA",se="expandButtonIcon_GZLG";function de(e){let{toggleSidebar:t}=e;return a.createElement("div",{className:ce,title:(0,u.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,u.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t},a.createElement(I,{className:se}))}const me={docSidebarContainer:"docSidebarContainer_y0RQ",docSidebarContainerHidden:"docSidebarContainerHidden_uArb",sidebarViewport:"sidebarViewport_EJ1r"};function ue(e){let{children:t}=e;const n=(0,d.V)();return a.createElement(a.Fragment,{key:n?.name??"noSidebar"},t)}function be(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:o}=e;const{pathname:i}=(0,g.TH)(),[c,s]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{c&&s(!1),o((e=>!e))}),[o,c]);return a.createElement("aside",{className:(0,l.Z)(r.k.docs.docSidebarContainer,me.docSidebarContainer,n&&me.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(me.docSidebarContainer)&&n&&s(!0)}},a.createElement(ue,null,a.createElement("div",{className:(0,l.Z)(me.sidebarViewport,c&&me.sidebarViewportHidden)},a.createElement(ie,{sidebar:t,path:i,onCollapse:d,isHidden:c}),c&&a.createElement(de,{toggleSidebar:d}))))}const pe={docMainContainer:"docMainContainer_sTIZ",docMainContainerEnhanced:"docMainContainerEnhanced_iSjt",docItemWrapperEnhanced:"docItemWrapperEnhanced_PxMR"};function he(e){let{hiddenSidebarContainer:t,children:n}=e;const o=(0,d.V)();return a.createElement("main",{className:(0,l.Z)(pe.docMainContainer,(t||!o)&&pe.docMainContainerEnhanced)},a.createElement("div",{className:(0,l.Z)("container padding-top--md padding-bottom--lg",pe.docItemWrapper,t&&pe.docItemWrapperEnhanced)},n))}const Ee="docPage_KLoz",fe="docsWrapper_ct1J";function ge(e){let{children:t}=e;const n=(0,d.V)(),[l,o]=(0,a.useState)(!1);return a.createElement(m.Z,{wrapperClassName:fe},a.createElement(f,null),a.createElement("div",{className:Ee},n&&a.createElement(be,{sidebar:n.items,hiddenSidebarContainer:l,setHiddenSidebarContainer:o}),a.createElement(he,{hiddenSidebarContainer:l},t)))}var ve=n(3893),ke=n(505);function _e(e){const{versionMetadata:t}=e;return a.createElement(a.Fragment,null,a.createElement(ke.Z,{version:t.version,tag:(0,i.os)(t.pluginId,t.version)}),a.createElement(o.d,null,t.noIndex&&a.createElement("meta",{name:"robots",content:"noindex, nofollow"})))}function Ce(e){const{versionMetadata:t}=e,n=(0,c.hI)(e);if(!n)return a.createElement(ve.default,null);const{docElement:i,sidebarName:m,sidebarItems:u}=n;return a.createElement(a.Fragment,null,a.createElement(_e,e),a.createElement(o.FG,{className:(0,l.Z)(r.k.wrapper.docsPages,r.k.page.docsDocPage,e.versionMetadata.className)},a.createElement(s.q,{version:t},a.createElement(d.b,{name:m,items:u},a.createElement(ge,null,i)))))}},3893:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var a=n(7378),l=n(9213),o=n(8831),r=n(8788);function i(){return a.createElement(a.Fragment,null,a.createElement(o.d,{title:(0,l.I)({id:"theme.NotFound.title",message:"Page Not Found"})}),a.createElement(r.Z,null,a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(l.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(l.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(l.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))))))}}}]);