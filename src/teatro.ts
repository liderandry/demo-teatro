// Definición de tipos
export type TipoEntrada = 'adulto' | 'niño';

export interface InventarioEntradas {
    tipo: TipoEntrada;
    cantidad: number;
    precio: number;
}

import { Familia } from './familia';

export class Teatro {
    // Precios fijos
    public static readonly PRECIO_ADULTO = 10;
    public static readonly PRECIO_NINO = 5;
    
    private entradas: Map<TipoEntrada, InventarioEntradas>;
    private totalRecaudado: number;

    constructor() {
        this.entradas = new Map<TipoEntrada, InventarioEntradas>([
            ['adulto', { tipo: 'adulto', cantidad: 0, precio: Teatro.PRECIO_ADULTO }],
            ['niño', { tipo: 'niño', cantidad: 0, precio: Teatro.PRECIO_NINO }]
        ]);
        this.totalRecaudado = 0;
    }

    // Método para configurar el inventario inicial
    public configurarInventario(adultos: number, ninos: number): void {
        this.entradas.get('adulto')!.cantidad = adultos;
        this.entradas.get('niño')!.cantidad = ninos;
    }

    // Método para procesar la compra de una familia
    public procesarFamilia(familia: Familia): number {
        const entradasAdulto = this.entradas.get('adulto')!;
        const entradasNino = this.entradas.get('niño')!;
        
        // Verificar disponibilidad
        if (!familia.puedeComprar(entradasAdulto.cantidad, entradasNino.cantidad)) {
            throw new Error(`No hay suficientes entradas disponibles para la familia ${familia.apellido}`);
        }

        // Calcular total
        const total = (familia.adultos * entradasAdulto.precio) + (familia.ninos * entradasNino.precio);
        
        // Actualizar inventario
        entradasAdulto.cantidad -= familia.adultos;
        entradasNino.cantidad -= familia.ninos;
        this.totalRecaudado += total;

        return total;
    }

    // Obtener el total recaudado
    public getTotalRecaudado(): number {
        return this.totalRecaudado;
    }

    // Mostrar inventario actual
    public mostrarInventario(): void {
        console.log('\nInventario actual:');
        this.entradas.forEach((entrada) => {
            console.log(`Entradas para ${entrada.tipo}s: ${entrada.cantidad} ($${entrada.precio} c/u)`);
        });
    }
}

// Ejecutar el ejemplo si este archivo se ejecuta directamente
try {
    const isMainModule = require.main === module;
    const isDirectRun = Boolean(process.argv[1] && process.argv[1].endsWith('teatro.ts'));
    
    if (Boolean(isMainModule) || isDirectRun) {
    const teatro = new Teatro();
    teatro.configurarInventario(10, 20);
    
    const familias: Familia[] = [
        new Familia('Gil', 2, 3),
        new Familia('Ramos', 1, 5),
        new Familia('Pérez', 4, 0),
        new Familia('Carmona', 1, 2)
    ];

    console.log('--- Ejecutando ejemplo directo ---');
    
    for (const familia of familias) {
        try {
            const total = teatro.procesarFamilia(familia);
            console.log(`La familia ${familia.apellido} debe pagar $${total}`);
        } catch (error) {
            console.error((error as Error).message);
        }
    }
    
    console.log(`\nTotal recaudado: $${teatro.getTotalRecaudado()}`);
    teatro.mostrarInventario();
    }
} catch (e) {
    // Ignorar errores de require
}
