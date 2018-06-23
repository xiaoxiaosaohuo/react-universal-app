import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from '../src/components/App';
import configureStore from '../src/store'

const store = configureStore()
// This gets the clientStats from webpackHotServerMiddleware, you can see a
// middleware is returned which then sends the html response.
// For prod you'd pass in the clientStats manually after building with webpack.
export default ({ clientStats }) => (req, res) => {
    const initialState = JSON.stringify(store.getState());
    const context = {};
    const app = ReactDOM.renderToString(
    <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
    
          <App />
        </StaticRouter>
    </Provider>)
    const chunkNames = flushChunkNames()

    const {
        js,
        styles,
        cssHash,
        scripts,
        stylesheets
    } = flushChunks(clientStats, { chunkNames })

    console.log('PATH', req.path)
    console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
    console.log('SCRIPTS SERVED', scripts)
    console.log('STYLESHEETS SERVED', stylesheets)

    res.send(
        `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react universal from scratch</title>
          ${styles}
        </head>
        <body>
         <script>
            window.__INITIAL_STATE__ = ${initialState}
          </script>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
    )
}