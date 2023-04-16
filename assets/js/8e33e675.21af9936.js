"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[590],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var s=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,s,r=function(e,t){if(null==e)return{};var n,s,r={},a=Object.keys(e);for(s=0;s<a.length;s++)n=a[s],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(s=0;s<a.length;s++)n=a[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=s.createContext({}),l=function(e){var t=s.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return s.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},p=s.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=l(n),m=r,f=p["".concat(c,".").concat(m)]||p[m]||u[m]||a;return n?s.createElement(f,i(i({ref:t},d),{},{components:n})):s.createElement(f,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var l=2;l<a;l++)i[l]=n[l];return s.createElement.apply(null,i)}return s.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5569:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var s=n(5773),r=(n(7378),n(5318));const a={sidebar_position:3},i="Recipes",o={unversionedId:"recipes",id:"recipes",title:"Recipes",description:"Vanilla JS",source:"@site/docs/recipes.md",sourceDirName:".",slug:"/recipes",permalink:"/idle-task/recipes",draft:!1,editUrl:"https://github.com/hiroki0525/idle-task/docs/recipes.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"configureIdleTask",permalink:"/idle-task/api/configureIdleTask"}},c={},l=[{value:"Vanilla JS",id:"vanilla-js",level:2},{value:"dynamic import",id:"dynamic-import",level:3},{value:"fetch external resources",id:"fetch-external-resources",level:3},{value:"React",id:"react",level:2},{value:"fetch external resources",id:"fetch-external-resources-1",level:3},{value:"React.lazy",id:"reactlazy",level:3}],d={toc:l};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,s.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"recipes"},"Recipes"),(0,r.kt)("h2",{id:"vanilla-js"},"Vanilla JS"),(0,r.kt)("h3",{id:"dynamic-import"},"dynamic import"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { setIdleTask } from 'idle-task';\n\n// this module is loaded during a browser's idle periods because it is not important for UI.\nconst taskKey = setIdleTask(() => import('./sendAnalyticsData'))\n\nconst button = document.getElementById('button');\nbutton.addEventListener('click', async () => {\n    // You should use waitForIdleTask if the module is not important.\n    // On the other hand, I recommend to use forceRunIdleTask if the module is important. \n    const { default: sendAnalyticsData } = await waitForIdleTask(taskKey);\n    // Send analytics data to server when the browser is idle.\n    setIdleTask(sendAnalyticsData);\n})\n")),(0,r.kt)("h3",{id:"fetch-external-resources"},"fetch external resources"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"import { getResultFromIdleTask } from 'idle-task';\n\nconst checkAccessTokenWhenIdle = (accessToken: string): Promise<any> => {\n    const fetchCheckAccessToken = async (): Promise<any> => {\n        const response = await fetch(`https://yourdomain/api/check?accessToken=${accessToken}`);\n        // Promise callback will execute immediately after fetching completely even if the browser is busy.\n        // One of the solutions is to run it when next browser's idle time.\n        return getResultFromIdleTask(() => response.json());\n    };\n    return getResultFromIdleTask(fetchCheckAccessToken);\n}\n\nconst { isSuccess } = await checkAccessTokenWhenIdle('1234');\n")),(0,r.kt)("h2",{id:"react"},"React"),(0,r.kt)("h3",{id:"fetch-external-resources-1"},"fetch external resources"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"import {useState, useEffect} from 'react';\nimport {setIdleTask, cancelIdleTask, waitForIdleTask} from 'idle-task';\n\nconst fetchNewsList = async () => {\n  const response = await fetch('https://yourdomain/api/news');\n  return response.json();\n}\n\n// this is not important UI for the website main content like e-commerce sites.\nexport default function WebsiteNewsList() {\n  const [newsList, setNewsList] = useState([]);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    // fetch news list when the browser is idle and cache it.\n    const taskKey = setIdleTask(fetchNewsList)\n    waitForIdleTask(taskKey)\n        .then(setNewsList)\n        .finally(() => setIsLoading(false));\n    return () => {\n        // stop to fetch news list and remove the cache when the component re-render.\n        cancelIdleTask(taskKey)\n    };\n  }, [])\n  \n  if (isLoading) {\n      return <div>Loading...</div>\n  }\n  return newsList.map(news => (\n      <div id={news.id}>\n        {news.publiedDate}\n        {news.title}\n        {news.description}\n      </div>\n  ))\n}\n")),(0,r.kt)("h3",{id:"reactlazy"},"React.lazy"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"import {useState, useEffect, lazy, Suspense} from 'react';\nimport {setIdleTask, waitForIdleTask, forceRunIdleTask} from 'idle-task';\n\nconst taskKey = setIdleTask(() => import('~/components/Modal'))\nconst taskPromise = waitForIdleTask(taskKey)\nconst Modal = lazy(() => taskPromise);\n\nexport default function WebsiteNewsList() {\n  const [isClicked, setIsClicked] = useState(false);\n  const onClick = () => setIsClicked(true);\n\n  useEffect(() => {\n    if (isClicked) {\n      // Import Modal immediately whether importing it was completed during the browser's idle periods or not.\n      forceRunIdleTask(taskKey);\n    }\n  }, [isClicked])\n\n  return (\n      <>\n        <button type='button' onClick={onClick} />\n        <Suspense>\n          {isClicked && <Modal />}\n        </Suspense>\n      </>\n  )\n}\n")))}u.isMDXComponent=!0}}]);