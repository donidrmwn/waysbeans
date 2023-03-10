export function ConvertFormatRupiah(number){
    return new Intl.NumberFormat('id-ID', {minimumFractionDigits: 0, style: 'currency', currency: 'IDR' }).format(number)
}