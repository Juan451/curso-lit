import { LitElement, html, css } from "lit";
import { pagesStyles } from './styles/page-styles.js';

export class EitPageLinksNumpages extends LitElement {
  static styles = [
     pagesStyles,
     css`
  `];
  static get properties() {
    return {
      numPages: { type: Number },
      selectedPage: { type: Number, reflect: true },
    };
  }
  constructor() {
    super();
    this.numPages = 5;
    this.selectedPage = 3;
  }

  render() {
    return html`
            <ul>
                ${this.createdPagesTemplate()}
            </ul>
    `;
  }
  //no es un getter
  createdPagesTemplate() {
    const templates = [];
    for(let i = 1; i <= this.numPages; i++) {
      templates.push(html`
          <li
              class="${this.selectedPage === i ? 'selected' : ''}"
          >${i}</li>
      `)
    }
    //devolvemos el template una vez construido
    //se devuelve el array de template
    return templates;
  }
}
customElements.define("eit-page-links-numpages", EitPageLinksNumpages);
