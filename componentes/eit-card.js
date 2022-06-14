import { LitElement, html, css } from "lit";


export class EitCard extends LitElement {
  static styles =
    css`
      :host {
        display: block;
      }
      section {
        border: 1px solid #ccc;
        padding: 1em;
        border-radius: 0.5em;
        box-shadow: 0 0 0.5em #ccc;
      }
      footer {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #ccc;
      }
    `;

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "";
  }

  render() {
    return html`
      <section>
      <slot></slot>
        ${this.titleTemplate} ${this.bodyTemplate} ${this.footerTemplate}
      </section>
    `;
  }
  get titleTemplate() {
    return html` ${this.title === "" ? "" : html`<h1>${this.title}</h1>`} `;
  }
  get bodyTemplate() {
    return html` <div>Body</div> `;
  }
  get footerTemplate() {
    return html` <footer>
        <slot name="actions"></slot>
    </footer> `;
  }
}
customElements.define("eit-card", EitCard);
