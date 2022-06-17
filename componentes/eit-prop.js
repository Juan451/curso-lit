import { LitElement, html, css } from "lit";

export class EitProp extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  static get properties() {
    return {
      propString: {
        type: String,
        //aqui le pasamos una conversion que cuando se bindea pasa a
        //un string desde el atributo
        converter: {
          //aqui envio datos desde el atributo
          fromAttribute: (value, type) => {
            return "--" + value + "--";
          },
        },
      },
      propNumber: {
        type: Number,
        converter: {
          toAttribute: (value, type) => {
            return value.toString();
          },
        },
      },
    };
  }

  render() {
    return html`
      <p>PropString: ${this.propString} ${typeof this.propString}</p>
      <p>PropNumber: ${this.propNumber} ${typeof this.propNumber}</p>
    `;
  }
}
customElements.define("eit-prop", EitProp);
