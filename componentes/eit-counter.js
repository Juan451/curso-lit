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
      font-size: 1.5em;
            }
    input {
      width: 30px;
    }
    @media(min-width: 500px) {
      .parrafo {
        font-size: 3em;
      }
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
      <slot></slot>
      <h2>Mi contador</h2>
      <input id="quantity" type="number" />
      <p class="parrafo">${this.counter}</p>
      <button @click="${this.incrementar}">+1</button>
      <button @click="${this.decrementar}">-1</button>
    `;
  }

  incrementar() {
    let quantity = this.shadowRoot.getElementById('parrafo').value;
    this.counter++;
  }

  decrementar() {
    this.counter--;
  }
}
customElements.define('eit-counter', EitCounter);