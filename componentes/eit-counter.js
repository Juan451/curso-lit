import { LitElement, html, css } from 'lit';

export class EitCounter extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      padding: 1em;
      border: 1px solid #ccc;
    }
    h2 {
      color: red;
    }
    .parrafo {
      color: blue;
      font-size: 1.5rem;
    }
  `;
  static get properties() {
    return {
      counter: { type: Number }
    };
  }
  constructor() {
    super();
    this.counter = 0;
  }
  render() {
    return html`
      <h2>Mi contador</h2>
      <p class="parrafo">${this.counter}</p>
    `;
  }
}
customElements.define('eit-counter', EitCounter);