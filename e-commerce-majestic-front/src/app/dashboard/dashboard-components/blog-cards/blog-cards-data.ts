export interface blogcard {
    title: string,
    subtitle: string,
    subtext: string,
    image: string
}

export const blogcards: blogcard[] = [

    {
        title: 'Total Ventas',
        subtitle: '150 ventas hoy',
        subtext: 'Este es un resumen de las ventas totales realizadas en el día de hoy.',
        image: 'assets/images/bg/ventas.jpg'
    },
    {
        title: 'Total Ingresos',
        subtitle: '$12,000 ingresos hoy',
        subtext: 'Este es un resumen de los ingresos totales generados en el día de hoy.',
        image: 'assets/images/bg/ingresos.jpg'
    },
    {
        title: 'Nuevos Usuarios',
        subtitle: '25 nuevos usuarios hoy',
        subtext: 'Este es un resumen de los nuevos usuarios registrados en el día de hoy.',
        image: 'assets/images/bg/nuevos-usuarios.jpg'
    },
    {
        title: 'Carritos Abandonados',
        subtitle: '10 carritos abandonados hoy',
        subtext: 'Este es un resumen de los carritos de compra abandonados en el día de hoy.',
        image: 'assets/images/bg/carritos-abandonados.jpg'
    }

] 