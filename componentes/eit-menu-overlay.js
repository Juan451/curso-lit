import { LitElement, html, css } from 'lit';

export class EitMenuOverlay extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                position: relative;
            }
            .overlay {
                display: none;
                position: absolute;
                background-color: beige;
                padding: 1em;
                border: 1px solid #ddd;
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                width: 250px;
            }
            .opened {
                display: block;
            }
            ::slotted(div) {
                font-family: sans-serif;
            }
        `
    ];

    static get properties() {
      return {
        opened: { type: Boolean }
      };
    }
    //metodo del ciclo de vida que sirve para inicializar el componente
    constructor() {
        super();
        console.log('constructor ejecutado...');
        this.opened = false;
        this.documentCloseHandler = this.close.bind(this);
    }


    //esto callback llamado connectedCallback se utilizan para cuando el componente aparece
    //dentro del contenido de la pagina, y disconnectedCallback sirve para cuando lo
    //desconectamos de la pagina

    //metodo que se ejecuta cuando el componente se conecta a la pagina
    connectedCallback() {
        super.connectedCallback();
        console.log('connectedCallback ejecutado...');
        //me suscribo a este manejador de evento tipo click
        //cuando elimino el elemento eit-menu-overlay, el evento sigue
        //siendo disparado, por lo que debo desuscribirme
        //hay que referenciarla para borrarla usando 
        // document.addEventListener('click', (e) => {
        //     console.log(`han hecho clic en ${e.clientX} x ${e.clientY}`);
        // });
        //video 11 hora 01h:10min
        document.addEventListener('click',  this.documentCloseHandler);
    }

    //metodo que se ejecuta cuando el componente se desconecta de la pagina
    disconnectedCallback() {
        super.disconnectedCallback();
        console.log('disconnectedCallback ejecutado...');
        //cuando elimino el elemento eit-menu-overlay, entonces uso un borrado de
        //manejador de evento que sea el evento click que dispara esa funcion
        document.removeEventListener('click',  this.documentCloseHandler);
    }

    //estos eventos callback son utilizados cuando por ejemplo tu quieres suscribirte a un
    //componente y quieres conectarte con connectedCallback a el desde tu pagina principal y luego al salirte de ese
    //componente quieres desconectarte de el usando disconnectedCallback
    //SUSCRIBIRSE A EVENTOS ES LLAMAR A EVENTOS

    render() {
        return html`
          <a href="#" @click="${this.toggle}">
            <slot name="trigger"></slot>
          </a>
          <div class="overlay ${this.opened ? "opened" : ""}">
            <slot name="menu"></slot>
          </div>
        `;
    }
    toggle(e) {
        this.opened = !this.opened;
        //cuando haces click en el trigger, no quiero que se ejecute el click en el close
        //para que no se propage por el componente pongo 
        //stopPropagation y preventDefault
        //se suelen colocar los dos metodos porque
        //CUANDO yo estoy diciendo el connectedCallback
        //cuando hago click en el documento que me cierre el menu,
        //entonces pasa lo siguiente, entonces lo que hace es abrir los menus
        //pero los eventos click en Javascript de manera nativa lo que hace es que 
        //primero los capturas y los escalas al padre al llegar al document y luego el window,
        //es decir la burbuja del evento va subiendo hasta que llega al top del DOM
        //entonces lo que pasa es lo siguiente
        //primero se muestra y luego se cierra, cuando el trigger se ejecuta
        //el evento se pare y siga subiendo, llega a close y cierra el menu 
        //entonces se ejecuta el otro evento, quiero decir para que se
        //ejecute ese en especifico ya que tambien tiene el boolean 'this.opened'
        e.stopPropagation();
        //preventDefault se pone cuando es un href a un enlace 
        e.preventDefault();
    }

    close() {
        console.log('close en menu overlay ',this);
        this.opened = false;
    }

    showClickPosition(e) {
        // console.log('en el ', this);
        console.log(`han hecho clic en ${e.clientX} x ${e.clientY} `);
    }
}
customElements.define('eit-menu-overlay', EitMenuOverlay);
