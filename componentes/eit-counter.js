import { LitElement, html, css } from "lit";
import { WiredButton } from "wired-elements/lib/wired-button.js";
import { WiredCard } from "wired-elements/lib/wired-card.js";
import { WiredInput } from "wired-elements/lib/wired-input.js";
import { WiredSlider } from "wired-elements/lib/wired-slider.js";
import 'dile-input/dile-input.js';

export class EitCounter extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    h2 {
      color: red;
    }
    .parrafo {
      color: blue;
      font-size: 1.5em;
    }
    dile-input {
      width: 50px;
      font-size: 1rem;
      padding: 0.5em;
    }
    wired-button {
      background-color: #8cf;
    }
    wired-button.decrement {
      background-color: #fcc;
    }
    wired-card {
      margin: 1em;
      padding: 1em;
    }
    @media (min-width: 500px) {
      .parrafo {
        font-size: 3em;
      }
    }
  `;
  static get properties() {
    return {
      counter: {
        type: Number,
        reflect: true,
     /*  Declaración para 
          propiedades que permite 
          decidir qué tan "importante" 
          es un cambio en su valor 
          para que merezca la pena la 
          actualización del template. */

        //para ver como cambia la propiedad recibe 2
        //parametros
        //evalua si hay cambios en las propiedades
        //tanto de valor como tipo
        hasChanged: (newValue, oldValue) => {
          //si es multiplo de 5, la propiedad
          //se actualiza es decir
          //saldrian valores multiplos de 5
         return  newValue % 5 === 0;
        }
      },
      quantity: { type: Number },
    };
  }
  constructor() {
    super();
    this.counter = 10;
    this.quantity = 10;
  }
  render() {
    return html`
      <wired-card elevation="3">
        <slot></slot>
        <h2>Mi contador</h2>
        <p class="parrafo">${this.counter}</p>
        <p>
          <!--Hay que poner un punto para bindear a la propiedad del elemento 
            y no la del atributo-->
            <!---los atributos son aquellos datos que introducimos en las etiquetas html, cuando yo uso un 
            componente lo uso a traves de la etiqueta html a usar el html, atributo class, style, id--->
          <!---las propiedades es algo que depende del javascript, cualquier cosa que este dentro del componente se llama propiedad
          como counter o checked
              ---->
          <dile-input id="quantity" type="number" value="${this.quantity}" label="Cantidad"/>
          </dile-input>
        </p>
        <p>
          <wired-slider value="10" min="5" max="15" @change="${this.doChangeQuantity}">
          </wired-slider>
        </p>
        <wired-button @click="${this.incrementar}">Incrementar</wired-button>
        <wired-button @click="${this.decrementar}" class="decrement">Decrementar</wired-button>
      </wired-card>
    `;
  }

  // get quantity() {
  //   return this.shadowRoot.getElementById("quantity").value;
  // }

  incrementar() {
    this.counter += parseInt(this.quantity);
    console.log("quantity ", this.quantity);
  }

  decrementar() {
    this.counter -= parseInt(this.quantity);
  }

  doChangeQuantity(e) {
    this.quantity = e.detail.value;
    //console.log(this.quantity);
  }
}
customElements.define("eit-counter", EitCounter);
