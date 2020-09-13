a. Intro to React
- JSX is a pretty neat concept -- too bad it's proprietary

b. JavaScript
- [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS)
- https://egghead.io/
- https://javascript.info/

c. Component state, event handlers
- destructuring
    - interesting how there are a lot of neat syntax tricks to make writing in React really compact
        - does feel like a slight burden for people learning though to pick up these "syntax sugar"
        - but also understandbly makes development and reading code in the long run much more managable
- re-rendering page is not! recommended -- makes sense, since we'd rerender components that are unchanged as well
- event handlers in react must be **function or function reference**
    - this is because event handlers *rerender the component* -- which would re-trigger function if we passed a function call instead
    - e.g. `<button onClick={setCounter(counter + 1)}>` vs `<button onClick={() => setCounter(counter + 1)}>`
- best practices oto define event handlers outside a JSX template
- [lifting the state up](https://reactjs.org/docs/lifting-state-up.html) (to-read)
- **changes in state cause rerendering**

d. A more complex state, debugging React apps
- **do not mutate states directly. make copies and make changes to the new copies of data!!!**
    - otherwise, can result in unwanted side effects
- conditional rendering! -- pretty useful
    - rendering components differently depending on state of application
- Rules of Hooks
    - useState *must not be called inside of a loop, conditional, or any place that is not a function defining a component*

```javascript
const App = (props) => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

- entire section on event handlers is good material to re-visit
    - just to reiterate: **event handlers must always be functions or a reference to a function**
- love how the course material cuts straight into the meat: often asks and then explains "what's the point"
    - lives up to the "by coders for coders"
- double-arrow notation for functions returning functions might trip me up, e.g.
```js
 const setToValue = (newValue) => () => {
    setValue(newValue)
  }
```

-  don't define components within other components! ever!