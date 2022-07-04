//esto es una clase mixin que se pone en Mayuscula
//recibe la superClase a la cual debo de extender para
//extender mis otros metodos
export const PerformanceMixin = (superclass) =>
  class extends superclass {
    //codigo que aporta el mixin
    constructor() {
      super();
      this.times = 0;
    }
    startTime() {
      this.timeStart = performance.now();
    }

    endTime() {
      this.timeEnd = performance.now();
    }

    reportPerformance() {
      console.log(
        "Tardó " + (this.timeEnd - this.timeStart) + " milisegundos."
      );
    }
  };
