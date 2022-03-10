import '@logseq/libs'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const isDevelopment = import.meta.env.DEV

if (isDevelopment) {
  renderApp('browser')
} else {
  console.log('=== logseq-plugin-present loaded ===')
  logseq.ready(() => {

    logseq.provideModel({
      show() {
        renderApp('logseq')
        logseq.showMainUI()
      },
    })

    logseq.App.registerPageMenuItem('Present', async e => {
      console.log('[faiz:] === Present', e)
      const blocks = await logseq.Editor.getCurrentPageBlocksTree()
      const page = await logseq.Editor.getCurrentPage()
      console.log('[faiz:] === page', page, blocks)
    })

    logseq.App.registerUIItem('toolbar', {
      key: 'logseq-plugin-present',
      template: '<a data-on-click="show" class="button"><i class="ti ti-window"></i></a>',
    })

  })
}

function renderApp(env: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App env={env} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
