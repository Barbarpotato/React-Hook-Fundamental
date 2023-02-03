# useContext Hook
### What and Why?
<img src="https://miro.medium.com/max/1400/1*cA8Ved2TR_bOpciUpYOLNg.png" width=400 height=240>
Assuming we have a different component where A is the independent component. D is Dependent with B (nested component of B). Finally C have 2 other nested component (E and F). The case is, we have the state named count that we are going to pass to a different components. There are component A, D and F. The problem of this thing is, we need to pass the property count from the root component to other component that doesnt need this property (e.g component B, C and E).<br/><br/>
To tackle this problem, useContext provides a way to pass data or state through the component tree without having to pass props down manually through each nested component. It is designed to share data that can be considered as global data for a tree of React components

### How to make it?
1. Create Context from the root component. In the jsx, wrap the children component that need the state with context.Provider and provide a value in it. dont forget to export the create context instance because its going to be used when nested component use the context
```
export const countContext = createContext()

function App() {

  return (
    <div>
      <countContext.Provider value={88}>
        <ComponentC />
      </countContext.Provider>
    </div>
  );
}
``` 
2. In Component F, we are going to use the context that we created in the root component
```
function ComponentF() {

    const count = useContext(countContext)

    return (
        <div>
            <h1>this is from the Component F {count}</h1>
        </div>
    )
}
```
3. With this, we dont have to passing the property count from component C and E instead we just immediately pass the value to the Component F.
4. We can actually make the multiple context nested aswell:
```
export const countContext = createContext()
export const nameContext = createContext()

function App() {

  return (
    <div>
      <countContext.Provider value={88}>
        <nameContext.Provider value={'Darmawan'}>
          <ComponentC />
        </nameContext.Provider>
      </countContext.Provider>
    </div>
  );
}
```
```
function ComponentF() {

    const count = useContext(countContext)
    const name = useContext(nameContext)
    return (
        <div>
            <h1>this is from the Component F {count}, and my name is {name}</h1>
        </div>
    )
}
```
