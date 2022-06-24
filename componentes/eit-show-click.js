import { LitElement, html, css } from 'lit';

export class EitShowClick extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            x: { type: Number },
            y: { type: Number },
            foo: { type: String},
        };
    }

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        //para que pueda borrar el evento click, necesito cachearlo en la propiedad
        //esta funcion que se genera al vuelo la cacheo en esta variable
        this.clickHander =  this.showClickPosition.bind(this);
       
    }

    //siempre que tengais necesidad de acceder al DOM
    //del componente o tengais que acceder a propiedades aseguraándos
    //vais hacerlo dentro del firstUpdated
    firstUpdated() {
        //aparece 100 y 300 porque lo hemos seteado desde fuera
        console.log(this.x, this.y, this.shadowRoot.getElementById('elinput'));
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('connectedCallback ejecutando...');
        //hay que pasarle el contexto del template por aqui porque
        //asigna a su operador  this el valor entregado, con una secuencia de
        // argumentos dados precediendo a cualquiera entregados cuando la función es llamada
        //hay que bindear porque no se puede acceder al this, por eso hay que pasarselo por "bind"
        //pero la dejo cacheada con clickHandler
        document.addEventListener('click', this.clickHander);
        //esto es una alternativa valida
        document.addEventListener('click',(e) => {
            this.showClickPosition(e)
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        console.log('disconnectedCallback ejecutando...');
        document.removeEventListener('click',  this.clickHander);
    }

    //Updated se ejecuta despues de cada actualizacion 
    //del template. Permite saber que propiedades han
    //cambiado y los valores que tenian se actualizan
    //este metodo se ejecutará cuando el valor de la
    //propiedades de x que hay en el template
    //esto sirve para obsevar cambios en el cambio del componente
    //se ejecuta cada vez que el template es actualizado
    //esto son como los observables antiguos que esta deprecados, no hay tampoco en LitElement
    updated(changedProperties) {
        console.log(changedProperties);
        if(changedProperties.has('x')) {
            console.log(`x valía ${changedProperties.get('x')} y ahora vale ${this.x}`);
        }

    }

    render() {
        return html`
            <p>han hecho clic en ${this.x} x ${this.y}</p>
            <p>
                input: <input id="elinput" type="text" value="${this.x}" />
            </p>
        `;
    }

    showClickPosition(e) {
        console.log('el contexto ', this);
        this.x = e.x;
        this.y = e.y;
    }
}
customElements.define('eit-show-click', EitShowClick);
