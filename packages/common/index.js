import { string, number, object, date } from 'yup'

const email = string()
    .trim()
    .min(1, 'შეიყვანეთ სწორი ელ-ფოსტა')
    .max(100, 'ელ-ფოსტა უნდა შეიცავდეს მაქსიმუმ 50 ასოს')
    .email('შეიყვანეთ სწორი ელ-ფოსტა')

const phone = string()
    .trim()
    .matches(/^(\+)?\d{6,12}$/, {
        message: 'შეიყვანეთ ტელეფონი',
    })

const password = string()
    .min(8, 'პაროლი უნდა შეიცავდეს 8 ასოს ან მეტს')
    .max(32, 'პაროლი უნდა იყოს შეიცავდეს მაქსიმუმ 32 ასოს')

export const createHotelSchema = object().shape({
    name: string()
        .trim()
        .min(1, 'შეიყვანეთ სასტუმროს სახელი')
        .max(100, 'შეიყვანეთ სასტუმროს სახელი'),
    email,
    phone,
    password,
})

export const createRoomSchema = object().shape({
    roomNumber: number()
        .typeError('შეიყვანეთ ოთახის ნომერი')
        .min(1, 'შეიყვანეთ ოთახის ნომერი')
        .max(1000000, 'შეიყვანეთ ოთახის ნომერი'),
    rate: number()
        .typeError('შეიყვანეთ ოთახის ფასი')
        .moreThan(0, 'შეიყვანეთ ოთახის ფასი')
        .max(1000000000, 'შეიყვანეთ ოთახის ფასი')
        .positive('შეიყვანეთ ოთახის ფასი')
        .required('შეიყვანეთ ოთახის ფასი'),
    type: string()
        .typeError('შეიყვანეთ ოთახის ტიპი')
        .trim()
        .min(1, 'შეიყვანეთ ოთახის ტიპი')
        .max(50, 'შეიყვანეთ ოთახის ტიპი'),
})

export const createGuestSchema = object().shape({
    name: string()
        .trim()
        .min(1, 'შეიყვანეთ სახელი')
        .max(100, 'შეიყვანეთ სახელი'),
    phone,
})

const id = string()
    .trim()
    .min(1)
    .required()

export const createBookingSchema = object().shape({
    checkIn: date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)))
        .required(),
    checkOut: date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)))
        .required(),
    room: id,
    guest: id,
    color: string().min(7).max(7).required()
})
