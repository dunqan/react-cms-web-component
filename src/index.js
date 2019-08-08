import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

function CurrentRoute({ routing }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const subscription = routing
      .getRouterState()
      .subscribe(state => setUrl(state.state.url));
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  return <span>{url}</span>;
}

function CmsData({ CmsComponentData }) {
  const [data, setData] = useState('Loading...');

  useEffect(() => {
    const subscription = CmsComponentData.data$.subscribe(data =>
      setData(data)
    );

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <span>
      <h1>{CmsComponentData.uid}</h1>
      <p>{JSON.stringify(data)}</p>
    </span>
  );
}

class CurrentRouteWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    // get spartacus API from web component
    const cxApi = this.cxApi || {};
    render(<CurrentRoute {...cxApi}></CurrentRoute>, mountPoint);
  }
}

class CmsDataWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    // get spartacus API from web component
    const cxApi = this.cxApi || {};
    render(<CmsData {...cxApi}></CmsData>, mountPoint);
  }
}

customElements.define('current-route', CurrentRouteWebComponent);
customElements.define('cms-data', CmsDataWebComponent);
