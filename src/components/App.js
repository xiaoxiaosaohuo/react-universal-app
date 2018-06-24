import React from 'react';
import universal from "react-universal-component";
import { Switch, Route,Link } from 'react-router-dom';
import styles from "./style.css";
import Loading from "./Loading";
import NotFound from "./NotFound";
// import Home from "./Home";
// import Foo from "./Foo";
// import Bar from "./Bar";
const config = {
  minDelay: 300,
  alwaysDelay: true,//总是延迟500ms,即使加载过。
  loadingTransition: true,
  error: NotFound,
  loading: Loading,
  onError:(error)=>console.log(error),
  //动态注入reducer
  onLoad: (module, info, props, context) => {
    if (module.reducers) {
      console.log(module.reducers)
      context.store.injectReducers(module.reducers)
    }
  }
};
const Home = universal(({ props }) => import(`./Home`), config);
const Foo = universal(({ props }) => import(`./Foo`), config);
const Bar = universal(({ props }) => import(`./Bar`), config);
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 'Home',loading:true }
  }

  render() {
    return (
      <div className={styles.mainContainer}>
      
      
        {['Home', 'Foo', 'Bar',"Error"].map((tab, i) =>
          <Link
            key={i}
            to={`/${tab.toLowerCase()}`}
            //预加载
            // onMouseEnter={() => 
            // UniversalTab.preload({ tab: tab})}
          >
            {tab}
          </Link>)}
          
        <Switch>
          <Route exact path='/' component={Foo} />
          < Route path="/foo" exact component={Foo} />
          < Route path="/home" exact component={Home} />
          <Route path="/bar" exact component={Bar}/>
        </Switch>
      </div>
    )
  }
}

