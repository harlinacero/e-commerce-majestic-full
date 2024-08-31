export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-currency-dollar',
        title: '150K',
        subtitle: 'Total Ventas'
    },
    {
        bgcolor: 'primary',
        icon: 'bi bi-cart-check',
        title: '$12K',
        subtitle: 'Total Ingresos'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-person-plus',
        title: '25',
        subtitle: 'Nuevos Usuarios'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-cart-x',
        title: '10',
        subtitle: 'Carritos Abandonados'
    },

] 