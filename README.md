# Mobx Storage

Persist and rehydrate a mobx store.

### Quickstart

```
npm install --save mobx-storage
```

#### Basic Usage

Basic usage involves providing a store to `AsyncThunk` and `options`.

```js
   // app.js
   import { AsyncThunk } from 'mobx-storage';
   
   const rootStore = new RootStore();

    const options = {
                      debug: true,
                      whiteList: ['userStore'],
                      ignoreKeys: ['rootStore'],
     }
     
     const thunk = new AsyncThunk(rootStore, options, localStorage);
    
    thunk.init().then(() => {
      // rootStore already rehydrated
      console.log(rootStore)
    });
```

If you are using react, you can wrap your root component with `PersistGate`. It delays rendering an application until a store is fully rehydrated.

```js
    import { PersistGate } from 'mobx-storage';

    // do initial setup for thunk the same as in basic setup

    const App = () => {
      return (
        <PersistGate loading={null} thunk={rootStore}>
          <Navigation/>
        </PersistGate>
      )
    }
```

###Migrations
Mobx storage supports basic usage of migrations. Migrations runs every time when rehydration process starts. See example/react-counter for details.

```js
    const migrations = {
      0: (state) => {
        return {
          ...state,
        }
      },
      1: (state) => {
        return{
          ...state,
        }
      }
    };
    
    const thunk = new AsyncThunk(storeInstance, {
      debug: true,
      whiteList: ['userStore'],
      ignoreKeys: ['rootStore'],
      version: 1,
      migrations,
    }, localStorage);
```


#FAQ

##### Does it work with react-native ?
It does. Just pass AsyncStorage as a third parameter in AsyncThunk.
