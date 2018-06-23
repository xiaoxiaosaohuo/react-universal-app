import React from 'react';
import universal from "react-universal-component";
import styles from "./style.css";
import Loading from "./Loading";
import NotFound from "./NotFound";
console.log(styles)
const UniversalTab = universal(({tab})=>import(`./${tab}`),{
  minDelay: 300,
  alwaysDelay: true,//总是延迟500ms,即使加载过。
  loadingTransition: false,
  error: NotFound,
  //动态注入reducer
  onLoad: (module, info, props, context)=>{
    if (module.reducers) {
      context.store.injectReducers(module.reducers)
    }
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 'Home',loading:true }
  }
  loadStart = ()=>{
    this.setState({
      loading:true
    })
  }
  loadEnd = () => {
    this.setState({
      loading: false
    })
  }
  render() {
    return (
      <div className={styles.mainContainer}>
      {this.state.loading&&<Loading></Loading>}
      <div className={this.state.loading? styles.loading:""}>
          <UniversalTab 
          tab={this.state.selected} 
          onBefore={this.loadStart}
          onAfter={this.loadEnd}
          onError={(error) => console.log(error)}
          />
      </div>
      
        {['Home', 'Foo', 'Bar',"Error"].map((tab, i) =>
          <button
            key={i}
            onClick={() => this.setState({ selected: tab,loading:false })}
            //预加载
            // onMouseEnter={() => 
            // UniversalTab.preload({ tab: tab})}
          >
            {tab}
          </button>)}
      </div>
    )
  }
}

