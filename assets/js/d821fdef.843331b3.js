"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[712],{5318:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>k});var n=r(7378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=p(r),c=a,k=m["".concat(s,".").concat(c)]||m[c]||d[c]||o;return r?n.createElement(k,i(i({ref:t},u),{},{components:r})):n.createElement(k,i({ref:t},u))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},7962:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=r(5773),a=(r(7378),r(5318));const o={sidebar_position:3},i="getResultFromIdleTask",l={unversionedId:"api/getResultFromIdleTask",id:"api/getResultFromIdleTask",title:"getResultFromIdleTask",description:"You can get the result of the task.",source:"@site/docs/api/getResultFromIdleTask.md",sourceDirName:"api",slug:"/api/getResultFromIdleTask",permalink:"/idle-task/api/getResultFromIdleTask",draft:!1,editUrl:"https://github.com/hiroki0525/idle-task/docs/api/getResultFromIdleTask.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"waitForIdleTask",permalink:"/idle-task/api/waitForIdleTask"},next:{title:"forceRunIdleTask",permalink:"/idle-task/api/forceRunIdleTask"}},s={},p=[{value:"Usage",id:"usage",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Returns",id:"returns",level:3}],u={toc:p},m="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getresultfromidletask"},"getResultFromIdleTask"),(0,a.kt)("p",null,"You can get the result of the task."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const result = await getResultFromIdleTask(func, options);\n")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import { getResultFromIdleTask } from 'idle-task';\n\nconst generateRandomNumber = () => Math.floor( Math.random() * 100 );\nconst randomNumber = await getResultFromIdleTask(generateRandomNumber, {\n    priority: 'high',\n    taskName: 'generateRandomNumber',\n    timeout: 3000,\n    timeoutStrategy: 'error'\n});\n")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"This is same as belows."),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const taskKey = setIdleTask(generateRandomNumber, { priority: 'high', taskName: 'generateRandomNumber'})\nconst randomNumber = await waitForIdleTask(taskKey, { timeout: 3000, timeoutStrategy: 'error' });\n"))),(0,a.kt)("p",null,"You can get the result by using ",(0,a.kt)("inlineCode",{parentName:"p"},"getResultFromIdleTask")," if you don't need the task key which is created by ",(0,a.kt)("inlineCode",{parentName:"p"},"setIdleTask"),"."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"getResultFromIdleTask")," can also be set options which is ",(0,a.kt)("inlineCode",{parentName:"p"},"SetIdleTaskOptions.priority")," , ",(0,a.kt)("inlineCode",{parentName:"p"},"SetIdleTaskOptions.taskName")," , ",(0,a.kt)("inlineCode",{parentName:"p"},"WaitForIdleTaskOptions.timeout")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"WaitForIdleTaskOptions.timeoutStrategy"),"."),(0,a.kt)("h3",{id:"parameters"},"Parameters"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"func"),": The function which you want to run when the browser is idle."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"optional")," ",(0,a.kt)("inlineCode",{parentName:"li"},"options"),": The options are ",(0,a.kt)("inlineCode",{parentName:"li"},"SetIdleTaskOptions.priority")," and  ",(0,a.kt)("inlineCode",{parentName:"li"},"WaitForIdleTaskOptions.timeout"),".")),(0,a.kt)("h3",{id:"returns"},"Returns"),(0,a.kt)("p",null,"The Promise result of the ",(0,a.kt)("inlineCode",{parentName:"p"},"func"),"."))}d.isMDXComponent=!0}}]);