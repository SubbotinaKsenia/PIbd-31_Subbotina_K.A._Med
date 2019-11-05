export interface Doctor {
    id: number
    fio: string
    description: string
    price: number
    images: Images[]
    images_files: File[]
}

export interface Images {
    id: number
    original: string
    small: string
    doctor_id: number
}