import { LitElement, html, css } from "lit";
import "dile-pages/dile-pages.js";
import "./eit-page-switch.js";
import "./eit-prop.js";
import "./eit-page-links.js";

export class EitPageSwitch extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];
  static get properties() {
    return {
      pages: { type: Array },
      active: { type: Boolean,// reflect: true 
    },
      page: { type: String, reflect: true },
      test: { type: String },
    };
  }
  constructor() {
    super();
    this.active = true;
    this.page = 'tres';
    this.test = '5';
    this.pages = ['uno', 'dos', 'tres'];
  }
  render() {
    return html`
      <!--Si queremos bindear un valor a una propiedad booleana, 
            debemos de usar la sintaxis del interrogante, la propiedad checked
            es del componente eit-switch-->
      <!-- <eit-prop .propString="${this.test}" propNumber="${this.test}"></eit-prop>   -->
      <!--Si estas bindeando a un array, hay que poner el punto ".pages"-->
      <eit-page-links .pages="${this.pages}" selectedPage="${this.page}"
      @eit-page-links-change="${this.doSelectedChange}"
      ></eit-page-links>
      <!---Esto sirve para escuchar el evento del componente eit-switch-->
      <eit-switch ?checked="${this.active}"
      @eit-switch-change="${this.changeActiveListener}"
      ></eit-switch>
      <button @click="${this.changeActive}">Cambiar active</button>
      <button @click="${this.showOne}">Cambiar página 1</button>
      <!--Cuando pones una arroba, haces un bindeo al-->
      <button @click="${this.show("dos")}">Cambiar página 2</button>
      <button @click="${this.show("tres")}">Cambiar página 3</button>

      ${this.active ? 
        this.pagesTemplate 
        : ''
        }
    `;
  }

  show(pageParameter) {
    return () => {
      this.page = pageParameter;
    };
  }
  get pagesTemplate() {
    return html`


    <eit-prop propString="5" propNumber="5"></eit-prop>


      <!--Para enviar datos a los atributos html del componente
            usamos la sintaxis basica, enviando como valor una
            propiedad reactiva dle componente-->
      <dile-pages attrForSelected="name" selected="${this.page}">
        <div name="uno">
          <p>Esta es la página 1</p>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisl eget consectetur
          </p>
        </div>
        <div name="dos">
          <p>Esta es la página 2</p>
          <ul>
            <li>Hola</li>
            <li>Adiós</li>
          </ul>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisl eget consectetur
          </p>
        </div>
        <div name="tres">
          <p>Esta es la página 3</p>
          <blockquote>Esto es un poco de contenido para hacer bulto</blockquote>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisl eget consectetur
          </p>
        </div>
      </dile-pages>
    `;
  }

  changeActive() {
    this.active = !this.active;
  }

  showOne() {
    this.page = "uno";
  }
  changeActiveListener(e) {
    //aqui cogemos la informacion que recogemos del eit-switch
    this.active = e.detail.checked;
  }
  doSelectedChange(e) {
    this.page = e.detail.selectedPage;
  }
}
customElements.define("eit-page-switch", EitPageSwitch);
