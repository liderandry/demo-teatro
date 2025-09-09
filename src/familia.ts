export class Familia {
    constructor(
        private _apellido: string,
        private _adultos: number,
        private _ninos: number
    ) {}

    get apellido(): string {
        return this._apellido;
    }

    get adultos(): number {
        return this._adultos;
    }

    get ninos(): number {
        return this._ninos;
    }

    puedeComprar(disponiblesAdultos: number, disponiblesNinos: number): boolean {
        return this._adultos <= disponiblesAdultos && this._ninos <= disponiblesNinos;
    }
}
