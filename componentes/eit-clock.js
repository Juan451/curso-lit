import { LitElement, html, css } from 'lit';

export class EitClock extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
    //inicializamos el template
    firstUpdated() {
        //despues hacemos que cada intervalo de 1 segundo
        //actualizamos el template de forma imperativa con
        //requestUpdate
        this.interval = setInterval( () => {
        this.requestUpdate()
        console.log('actualizado');
        }, 
        1000);
    }

    //aqui lo que hago es quitar el requestUpdate si el componente ya no esta en la pagina
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.interval);
    }

    render() {
        return html`<div class="clock">${this.getClock()}</div>`;
    }
    
    getClock() {
        let date = new Date();
        return `${date.getHours().toString().padStart(2,0)}:${date.getMinutes().toString().padStart(2,0)}:${date.getSeconds().toString().padStart(2,0)}`;
    }
}
customElements.define('eit-clock', EitClock);
