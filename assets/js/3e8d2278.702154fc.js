"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[42],{5318:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>k});var a=r(7378);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),u=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(r),m=n,k=c["".concat(l,".").concat(m)]||c[m]||d[m]||o;return r?a.createElement(k,i(i({ref:t},p),{},{components:r})):a.createElement(k,i({ref:t},p))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:n,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},4816:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var a=r(5773),n=(r(7378),r(5318));const o={sidebar_position:2},i="waitForIdleTask",s={unversionedId:"api/waitForIdleTask",id:"api/waitForIdleTask",title:"waitForIdleTask",description:"You can get the result of the task.",source:"@site/docs/api/waitForIdleTask.md",sourceDirName:"api",slug:"/api/waitForIdleTask",permalink:"/idle-task/api/waitForIdleTask",draft:!1,editUrl:"https://github.com/hiroki0525/idle-task/docs/api/waitForIdleTask.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"setIdleTask",permalink:"/idle-task/api/setIdleTask"},next:{title:"getResultFromIdleTask",permalink:"/idle-task/api/getResultFromIdleTask"}},l={},u=[{value:"Usage",id:"usage",level:2},{value:"Parameters",id:"parameters",level:3},{value:"<code>timeout?: number</code>",id:"timeout-number",level:4},{value:"<code>timeoutStrategy?: &#39;error&#39; | \u2019forceRun&#39;</code>",id:"timeoutstrategy-error--forcerun",level:4},{value:"Returns",id:"returns",level:3}],p={toc:u},c="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"waitforidletask"},"waitForIdleTask"),(0,n.kt)("p",null,"You can get the result of the task."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-javascript"},"const result = await waitForIdleTask(taskKey);\n")),(0,n.kt)("h2",{id:"usage"},"Usage"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-javascript"},"import { setIdleTask, waitForIdleTask } from 'setIdleTask';\n\nconst generateRandomNumber = () => Math.floor( Math.random() * 100 );\nconst taskKey = setIdleTask(generateRandomNumber);\nconst randomNumber = await waitForIdleTask(taskKey);\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"taskKey"),": Object which ",(0,n.kt)("inlineCode",{parentName:"li"},"setIdleTask")," returns."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"optional")," ",(0,n.kt)("inlineCode",{parentName:"li"},"options"),": The options as follows.")),(0,n.kt)("h4",{id:"timeout-number"},(0,n.kt)("inlineCode",{parentName:"h4"},"timeout?: number")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"waitForIdleTask")," maybe wait for the task eternally because it will be finished when the browser is idle.\n",(0,n.kt)("inlineCode",{parentName:"p"},"timeout")," option can prevent it."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-javascript"},"const generateRandomNumber = () => Math.floor( Math.random() * 100 );\nconst taskKey = setIdleTask(generateRandomNumber);\ntry {\n    const firstRandomNumber = await waitForIdleTask(taskKey, { timeout: 1000 });\n} catch (e) {\n    if (e instanceof WaitForIdleTaskTimeoutError) {\n        console.error('this is timeout error')\n    }\n}\n")),(0,n.kt)("p",null,"In this case, ",(0,n.kt)("inlineCode",{parentName:"p"},"waitForIdleTask")," will throw ",(0,n.kt)("inlineCode",{parentName:"p"},"WaitForIdleTaskTimeoutError")," as default if the task can't be finished within 1000 ms."),(0,n.kt)("h4",{id:"timeoutstrategy-error--forcerun"},(0,n.kt)("inlineCode",{parentName:"h4"},"timeoutStrategy?: 'error' | \u2019forceRun'")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-javascript"},"const generateRandomNumber = () => Math.floor( Math.random() * 100 );\nconst taskKey = setIdleTask(generateRandomNumber);\nconst firstRandomNumber = await waitForIdleTask(taskKey, { timeout: 1000, timeoutStrategy: 'error' });\n")),(0,n.kt)("p",null,"You can choose the movement when the idle task is timeout."),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"waitForIdleTask")," executes the task even if having not yet run it after the time has come."),(0,n.kt)("p",null,"If you set ",(0,n.kt)("inlineCode",{parentName:"p"},"error"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"waitForIdleTask")," throws an error if the task can't be finished within the time which you set."),(0,n.kt)("h3",{id:"returns"},"Returns"),(0,n.kt)("p",null,"The Promise result of the function which is registered by ",(0,n.kt)("inlineCode",{parentName:"p"},"setIdleTask"),"."))}d.isMDXComponent=!0}}]);