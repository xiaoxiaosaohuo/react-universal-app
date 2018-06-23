import React from 'react'
import { connect } from 'react-redux'
import { setIndex } from '../../store/actions/foo'
import foo, { getIndex } from '../../store/reducers/foo'
import styles from './style.css';
//此处导出reducers 为了在app.js动态注入reducer。。。名字只能是reducers
export const reducers = { foo }

const Foo = ({ index, setIndex }) =>
    <div className={styles.Foo}>
        Foo is Loaded: {index}
        <button onClick={() => setIndex(index + 1)}>+</button>
        <button onClick={() => setIndex(index - 1)}>-</button>
    </div>

const mapStateToProps = (state) => ({
    index: getIndex(state)
})

const mapDispatchToProps = { setIndex }

export default connect(mapStateToProps, mapDispatchToProps)(Foo)