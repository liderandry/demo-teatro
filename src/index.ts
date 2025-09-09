// Definición de tipos
interface Familia {
    apellido: string;
    adultos: number;
    ninos: number;
}

// Clase Teatro
class Teatro {
    // Precios fijos
    public static readonly PRECIO_ADULTO = 10;
    public static readonly PRECIO_NINO = 5;
    
    private entradas: {
        adulto: { cantidad: number, precio: number },
        niño: { cantidad: number, precio: number }
    };
    
    private totalRecaudado: number;

    constructor() {
        this.entradas = {
            adulto: { cantidad: 0, precio: Teatro.PRECIO_ADULTO },
            niño: { cantidad: 0, precio: Teatro.PRECIO_NINO }
        };
        this.totalRecaudado = 0;
    }

    // Configurar el inventario inicial
    public configurarInventario(adultos: number, ninos: number): void {
        this.entradas.adulto.cantidad = adultos;
        this.entradas.niño.cantidad = ninos;
    }

    // Procesar la compra de una familia
    public procesarFamilia(familia: Familia): number {
        // Verificar disponibilidad
        if (this.entradas.adulto.cantidad < familia.adultos || this.entradas.niño.cantidad < familia.ninos) {
            throw new Error(`No hay suficientes entradas disponibles para la familia ${familia.apellido}`);
        }

        // Calcular total
        const total = (familia.adultos * this.entradas.adulto.precio) + 
                     (familia.ninos * this.entradas.niño.precio);
        
        // Actualizar inventario
        this.entradas.adulto.cantidad -= familia.adultos;
        this.entradas.niño.cantidad -= familia.ninos;
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
        console.log(`- Entradas para adultos: ${this.entradas.adulto.cantidad} ($${this.entradas.adulto.precio} c/u)`);
        console.log(`- Entradas para niños: ${this.entradas.niño.cantidad} ($${this.entradas.niño.precio} c/u)`);
    }
}

// Función principal
function main() {
    console.log('=== SISTEMA DE VENTA DE ENTRADAS DEL TEATRO ===\n');
    
    // Crear instancia del teatro
    const teatro = new Teatro();
    
    // Configurar inventario inicial
    const ENTRADAS_ADULTOS = 10;
    const ENTRADAS_NINOS = 20;
    teatro.configurarInventario(ENTRADAS_ADULTOS, ENTRADAS_NINOS);
    
    console.log('Inventario inicial configurado:');
    console.log(`- Entradas para adultos: ${ENTRADAS_ADULTOS} ($${Teatro.PRECIO_ADULTO} c/u)`);
    console.log(`- Entradas para niños: ${ENTRADAS_NINOS} ($${Teatro.PRECIO_NINO} c/u)\n`);
    
    // Definir las familias que comprarán entradas
    const familias: Familia[] = [
        { apellido: 'Gil', adultos: 2, ninos: 3 },
        { apellido: 'Ramos', adultos: 1, ninos: 5 },
        { apellido: 'Pérez', adultos: 4, ninos: 0 },
        { apellido: 'Carmona', adultos: 1, ninos: 2 }
    ];

    console.log('--- Procesando ventas de entradas ---');
    
    // Procesar cada familia
    for (const familia of familias) {
        try {
            const total = teatro.procesarFamilia(familia);
            console.log(`La familia ${familia.apellido} debe pagar $${total}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    // Mostrar resumen final
    console.log('\n--- Resumen final ---');
    console.log(`Total recaudado: $${teatro.getTotalRecaudado()}`);
    
    console.log('\n--- Inventario final ---');
    teatro.mostrarInventario();
}

// Ejecutar la aplicación
main();
