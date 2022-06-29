import { LitElement, html, css } from 'lit';
import './eit-user.js';
import './eit-page-links.js';

import { users } from '../users.js';

export class UserList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
    static get properties() {
      return {
        users: { type: Array },
        orderTypes: { type: Array},
        selectedOrder: { type: String},
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

        this.orderTypes = ['asc','desc'];
        this.selectedOrder = 'asc';
    }

    render() {
        return html`
                <!--Hay que bindear el padre <user-list> para coger el objeto hijo -->
                <!--que es normalmente donde tenemos las propiedades a llamar
                    aqui solamente controlamos la entrada de datos que es el JS o el servicio-->

                <eit-page-links
                    .pages="${this.orderTypes}"
                    selectedPage="${this.selectedOrder}"
                    @eit-page-links-change="${this.changeSelectedOrder}"
                ></eit-page-links>
                ${this.doOrder(this.selectedOrder).map(user => html`   
                            <eit-user .user="${user}"></eit-user>
                `)}
        `;
    }

    changeSelectedOrder(e) {
        this.selectedOrder = e.detail.selectedPage;
    }
    doOrder(order) {
        return users.sort(a, b) => {
            
        }
    }
}
customElements.define('user-list', UserList);
