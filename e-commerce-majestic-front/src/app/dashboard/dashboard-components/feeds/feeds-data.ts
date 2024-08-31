export interface Feed {
    class: string,
    icon: string,
    task: string,
    time: string
}

export const Feeds: Feed[] = [

    {
        class: 'bg-info',
        icon: 'bi bi-cart-check',
        task: 'Tienes 4 pedidos pendientes.',
        time: 'Justo ahora'
    },
    {
        class: 'bg-success',
        icon: 'bi bi-currency-dollar',
        task: 'Venta completada: $200.',
        time: 'Hace 2 horas'
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-person-plus',
        task: 'Nuevo usuario registrado.',
        time: '28 de Julio'
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-cart-x',
        task: 'Carrito abandonado.',
        time: '25 de Julio'
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-star',
        task: 'Nueva reseña recibida.',
        time: '21 de Julio'
    }

] 