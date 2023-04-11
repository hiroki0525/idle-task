"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[683],{5318:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),s=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=s(n),k=a,m=d["".concat(o,".").concat(k)]||d[k]||u[k]||l;return n?r.createElement(m,c(c({ref:t},p),{},{components:n})):r.createElement(m,c({ref:t},p))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,c=new Array(l);c[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var s=2;s<l;s++)c[s]=n[s];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4207:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=n(5773),a=(n(7378),n(5318));const l={sidebar_position:5},c="cancelIdleTask",i={unversionedId:"api/cancelIdleTask",id:"api/cancelIdleTask",title:"cancelIdleTask",description:"You can cancel the task.",source:"@site/docs/api/cancelIdleTask.md",sourceDirName:"api",slug:"/api/cancelIdleTask",permalink:"/api/cancelIdleTask",draft:!1,editUrl:"https://github.com/hiroki0525/idle-task/docs/api/cancelIdleTask.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"forceRunIdleTask",permalink:"/api/forceRunIdleTask"},next:{title:"cancelAllIdleTasks",permalink:"/api/cancelAllIdleTasks"}},o={},s=[{value:"Usage",id:"usage",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Returns",id:"returns",level:3}],p={toc:s};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"cancelidletask"},"cancelIdleTask"),(0,a.kt)("p",null,"You can cancel the task."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"cancelIdleTask(taskKey);\n")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import { setIdleTask, cancelIdleTask } from 'idle-task';\n\nconst taskKey = setIdleTask(() => console.log(\"task will be canceled.\"));\ncancelIdleTask(taskKey);\n")),(0,a.kt)("p",null,"You can stop to run a task by using ",(0,a.kt)("inlineCode",{parentName:"p"},"cancelIdleTask")," if it is not executed."),(0,a.kt)("h3",{id:"parameters"},"Parameters"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"taskKey"),": Object which ",(0,a.kt)("inlineCode",{parentName:"li"},"setIdleTask")," returns.")),(0,a.kt)("h3",{id:"returns"},"Returns"),(0,a.kt)("p",null,"No return value."))}u.isMDXComponent=!0}}]);