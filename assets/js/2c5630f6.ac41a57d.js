"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[955],{5318:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=a,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},555:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(5773),a=(r(7378),r(5318));const o={sidebar_position:4},i="forceRunIdleTask",s={unversionedId:"api/forceRunIdleTask",id:"api/forceRunIdleTask",title:"forceRunIdleTask",description:"You can get the result immediately whether the task was executed during a browser's idle periods or not.",source:"@site/docs/api/forceRunIdleTask.md",sourceDirName:"api",slug:"/api/forceRunIdleTask",permalink:"/idle-task/api/forceRunIdleTask",draft:!1,editUrl:"https://github.com/hiroki0525/idle-task/docs/api/forceRunIdleTask.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"getResultFromIdleTask",permalink:"/idle-task/api/getResultFromIdleTask"},next:{title:"cancelIdleTask",permalink:"/idle-task/api/cancelIdleTask"}},l={},c=[{value:"Usage",id:"usage",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Returns",id:"returns",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"forcerunidletask"},"forceRunIdleTask"),(0,a.kt)("p",null,"You can get the result immediately whether the task was executed during a browser's idle periods or not."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"forceRunIdleTask")," gets result from cache if the task was executed."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const result = await forceRunIdleTask(taskKey);\n")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import { forceRunIdleTask } from 'idle-task';\n\nconst generateRandomNumber = () => Math.floor( Math.random() * 100 );\nconst taskKey = setIdleTask(generateRandomNumber);\nconst randomNumber = await forceRunIdleTask(taskKey);\n")),(0,a.kt)("h3",{id:"parameters"},"Parameters"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"taskKey"),": Object which ",(0,a.kt)("inlineCode",{parentName:"li"},"setIdleTask")," returns.")),(0,a.kt)("h3",{id:"returns"},"Returns"),(0,a.kt)("p",null,"The Promise result of the function which is registered by ",(0,a.kt)("inlineCode",{parentName:"p"},"setIdleTask"),"."))}d.isMDXComponent=!0}}]);