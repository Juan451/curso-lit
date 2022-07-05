import { html, css, LitElement } from "lit";
import "./eit-user.js";
import "./eit-page-links.js";

import { users } from "../users.js";
//importamos el mixin
import { PerformanceMixin } from '../mixins/performanceMixin.js';

export class UserList extends PerformanceMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];
  static get properties() {
    return {
      // users: { type: Array },
      orderTypes: { type: Array },
      selectedOrder: { type: String },
      times: { type: Number },
      orderedUsers: { type: Array },
    };
  }

  constructor() {
    super();
    //cuando estemos usando un array, el template se dibuja inmediatamente
    //y entonces this.users es undefined, hasta que no tiene un valor el
    //array esta valiendo undefined
    // this.users = [];
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(response => response.json())
    // .then(users => this.users = users)
    // .catch(console.error());

    this.orderTypes = ["asc", "desc"];
    this.selectedOrder = "asc";
    //basicamente estoy haciendo aqui un array
    //de usuarios que hace un nuevo array que
    //esta ordenando todo esto
    //esto es una propiedad reactiva que ordena el array
    //en orden descendente
    //cuando queremos ordenar,buscar array debemos de
    //meter un spread operator
    this.usersAsc = [
      ...users.sort((a, b) => {
        if (a.name === b.name) {
          return 0;
        }
        return a.name > b.name ? 1 : -1;
      }),
    ];
    this.usersDesc = [
      ...users.sort((a, b) => {
        if (a.name === b.name) {
          return 0;
        }
        return a.name < b.name ? 1 : -1;
      }),
    ];
    this.orderedUsers = this.usersAsc;
  }

  render() {
    return html`
      <!---100 renderizaciones con esa repeticion--->
      <button @click=${this.change100Times}>100</button>
      <!--Hay que bindear el padre <user-list> para coger el objeto hijo -->
      <!--que es normalmente donde tenemos las propiedades a llamar
                    aqui solamente controlamos la entrada de datos que es el JS o el servicio-->
      <eit-page-links
        .pages="${this.orderTypes}"
        selectedPage="${this.selectedOrder}"
        @eit-page-links-change="${this.changeSelectedOrder}"
      ></eit-page-links>
      ${this.mapRepeatTemplate}
    `;
  }

  get mapRepeatTemplate() {
    //Este map cambia cada 100 veces para producir 100 iteraciones de
    //repeticion sobre el template
    return html`
      ${this.orderedUsers.map(
        (user) => html` <eit-user .user="${user}"></eit-user> `
      )}
    `;
  }

  changeSelectedOrder(e) {
    this.selectedOrder = e.detail.selectedPage;
    if (this.selectedOrder === "asc") {
      this.orderedUsers = this.usersAsc;
    } else {
      this.orderedUsers = this.usersDesc;
    }
  }
  doOrder(order) {
    //ordenacion de numeros, es decir en los usuarios
    //hay que hacer un requestUpdate para que se
    //actualice la referencia
    //he cambiado el array de orden asi que tengo
    //que actualizar el template con requestUpdate

    const usersOrdered = users.sort((a, b) => {
      if (a.name === b.name) {
        return 0;
      }
      if (order === "asc") {
        return a.name > b.name ? 1 : -1;
      } else {
        return a.name < b.name ? 1 : -1;
      }
    });
    //devuelvo un nuevo array donde todos
    //sus elementos van a ser "usersOrdered"
    //entonces aqui me estoy asegurando donde
    //las referencias siempre me van a cambiar
    //usando el spreadOperatos
    //esto hace un nuevo array con los mismos datos
    //que se van actualizando con el usersOrdered
    //CUANDO HACEMOS ACTUALIZACIONES DEL ARRAY!!!
    return [...usersOrdered];
  }

  //fucion que hace el cambio 100 veces
  //si times es igual a 0
  change100Times() {
    // console.log("Tardó " + this.times + " milisegundos.");
    if (this.times === 0) {
      //entonces coge los milisegundos de este instante
      //aqui llamamos la funcion del mixin
      this.startTime();
    }
    //times es menor que 3??
    if (this.times < 3) {
      //entonces agrego +1 al contador de times
      this.times++;
      //estamos en 0 o 1?
      //si vale 1 usersAsc, si no pues usersDesc, se cambia
      //con cada iteracion
      this.orderedUsers = this.times % 2 ? this.usersAsc : this.usersDesc;
      //updateComplete es un ciclo de vida de los componentes
      //es una propiedad que va en una promesa, cuando se reactiva
      //una propiedad que esta en la promesa, despues de haber cambiado
      //una propiedad, en este caso orderedUsers hago
      //un then, se va a ejecutar cuando el template se haya actualizadio
      //atencion, esto se hace cuando cambias una propiedad reactiva
      //como orderedUsers, le estoy poniendo el array descendente con usersAsc
      //o descendente con el usersDesc
      //el template se a actalizado ya?? entonces cuando se ha actualizado
      //disparamos el this.updateComplete con el then.
      this.updateComplete.then(() => this.change100Times());
    } else {
      this.endTime();
      //pongo el times igual a 0 para que vuelva a hacerlo otra vez cuando se llame
      //al template
      this.reportPerformance();
      this.times = 0;
    }
  }
}
customElements.define("user-list", UserList);
