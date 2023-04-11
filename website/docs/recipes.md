---
sidebar_position: 3
---

# Recipes

## Vanilla JS

### dynamic import

```javascript
import { setIdleTask } from 'idle-task';

// this module is loaded during a browser's idle periods because it is not important for UI.
const taskKey = setIdleTask(() => import('./sendAnalyticsData'))

const button = document.getElementById('button');
button.addEventListener('click', async () => {
    // You should use waitForIdleTask if the module is not important.
    // On the other hand, I recommend to use forceRunIdleTask if the module is important. 
    const { default: sendAnalyticsData } = await waitForIdleTask(taskKey);
    // Send analytics data to server when the browser is idle.
    setIdleTask(sendAnalyticsData);
})
```

### fetch external resources

```typescript
import { getResultFromIdleTask } from 'idle-task';

const checkAccessTokenWhenIdle = (accessToken: string): Promise<any> => {
    const fetchCheckAccessToken = async (): Promise<any> => {
        const response = await fetch(`https://yourdomain/api/check?accessToken=${accessToken}`);
        // Promise callback will execute immediately after fetching completely even if the browser is busy.
        // One of the solutions is to run it when next browser's idle time.
        return getResultFromIdleTask(() => response.json());
    };
    return getResultFromIdleTask(fetchCheckAccessToken);
}

const { isSuccess } = await checkAccessTokenWhenIdle('1234');
```

## React

### fetch external resources

```jsx
import {useState, useEffect} from 'react';
import {setIdleTask, cancelIdleTask, waitForIdleTask} from 'idle-task';

const fetchNewsList = async () => {
  const response = await fetch('https://yourdomain/api/news');
  return response.json();
}

// this is not important UI for the website main content like e-commerce sites.
export default function WebsiteNewsList() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch news list when the browser is idle and cache it.
    const taskKey = setIdleTask(fetchNewsList)
    waitForIdleTask(taskKey)
        .then(setNewsList)
        .finally(() => setIsLoading(false));
    return () => {
        // stop to fetch news list and remove the cache when the component re-render.
        cancelIdleTask(taskKey)
    };
  }, [])
  
  if (isLoading) {
      return <div>Loading...</div>
  }
  return newsList.map(news => (
      <div id={news.id}>
        {news.publiedDate}
        {news.title}
        {news.description}
      </div>
  ))
}
```

### React.lazy

```jsx
import {useState, useEffect, lazy, Suspense} from 'react';
import {setIdleTask, waitForIdleTask, forceRunIdleTask} from 'idle-task';

const taskKey = setIdleTask(() => import('~/components/Modal'))
const taskPromise = waitForIdleTask(taskKey)
const Modal = lazy(() => taskPromise);

export default function WebsiteNewsList() {
  const [isClicked, setIsClicked] = useState(false);
  const onClick = () => setIsClicked(true);

  useEffect(() => {
    if (isClicked) {
      // Import Modal immediately whether importing it was completed during the browser's idle periods or not.
      forceRunIdleTask(taskKey);
    }
  }, [isClicked])

  return (
      <>
        <button type='button' onClick={onClick} />
        <Suspense>
          {isClicked && <Modal />}
        </Suspense>
      </>
  )
}
```