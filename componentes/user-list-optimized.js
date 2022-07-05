import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { UserList } from "./user-list.js";

//cuando pones una clase export, significa que la puedes usar en un nuevo componente
//por ejemplo el export class UserList lo puedes usar en cualquier otra clase y tambien puedes
//usar las caracteristicas de esa clase
//esto esta optimizado, por lo que el tiempo de respuesta es mas corto
export class UserListOptimized extends UserList {
//aqui puyedo usar una superclase dentro de la clase
  render() {
    return html`
        <!---Aqui estoy usando el render de la clase UserList, ya que es la que extiendo--->
        ${super.render()}
        ${this.footerTemplate}
    `;
}
  get mapRepeatTemplate() {
    //aqui usamos en un getter la directiva de repeticion "repeat"
    //primero ponemos el array, luego el identificador del array
    //hace una identificador con los usuarios unicos y lo uso para
    //poder darle una key con los elementos para los elementos de repeticion
    //uso dos parametros como user e index del array que empieza por 0
    return html`
      ${repeat(
        this.orderedUsers,
        (user) => user.id,
        (user, index) => {
          return html`<eit-user .user="${user}"></eit-user> `;
        }
      )}
    `;
  }

  get footerTemplate() {
    return html`
        <footer>Hemos listado ${this.orderedUsers.length} usuarios</footer>
    `;
}
  
}
customElements.define("user-list-optimized", UserListOptimized);
