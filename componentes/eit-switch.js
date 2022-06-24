import { LitElement, html, css } from 'lit';

export class EitSwitch extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
            }
            section {
                width: 64px;
                height: 20px;
                border-radius: 10px;
                background-color: var(--eit-switch-bar-color, #ccc);
                display: flex;
                align-items: center;
                justify-content: flex-start;  
            }
            span {
                width: 32px;
                height: 32px;
                left: 0px;
                position: relative;
                border-radius: 50%;
                background-color: var( --eit-switch-off-state-color, #f66);
                transition: all 0.2s linear;
            }
            /**Selector de atributos */
            :host([checked]) span {
                left: 32px;
                background-color: var(--eit-switch-on-state-color, #69f);
            }
        `
    ];
  static get properties() {
    return {
        //refleja el valor de la propiedad en la etiqueta padre
      checked: { 
        type: Boolean,
        reflect: true
      },
    };
  }

  constructor() {
    super();
    this.checked = false;
  }

  render() {
    return html`
        <section @click="${this.toggle}">
            <span></span>
        </section> `;
  }

  toggle() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('eit-switch-change', {
        //bubbles: false → solo avisaría al padre, no a los abuelos,
        //es decir el evento no escalaria al abuelo
        bubbles: true,
        //composed: true → permite transmisión a 
        //través del shadow DOM.
        composed: true,
        detail: {
          //ponemos poner directamente lo propiedad checked,
          ///si este componente en el futuro tiene que avisar mas cosas
          //tengo que avisar de mas valores,
          checked: this.checked
       // element: this,
        }
    }))
  }
}
customElements.define('eit-switch', EitSwitch);