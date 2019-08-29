import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { createBookingSchema } from '@hb/common'
import { GET_GUESTS, GET_ROOMS, CREATE_BOOKING } from './gql'
import DateRangePicker from '../DateRangePicker'
import AutoCompleteInput from '../AutoCompleteInput'
import ColorPicker from '../ColorPicker'
import GuestModal from './GuestModal'
import RoomModal from './RoomModal'
import withLoader from '../Loader'
import DashboardContext from '../Dashboard/DashboardContext'
import { runAfterDatePick } from './utils'
import './BookForm.scss'

const BookForm = ({ refetchDashboardData }) => {
    const startDay = new Date(new Date().setHours(0, 0, 0, 0))
    const {
        current,
        setCurrent,
        setTempBooking,
        setData,
        setPaginationData,
        paginationData,
    } = React.useContext(DashboardContext)

    const client = useApolloClient()

    const [guests, setGuests] = React.useState([])
    const [rooms, setRooms] = React.useState([])
    const [formData, setFormData] = React.useState({
        guest: '',
        room: '',
        color: '#3c556b',
    })
    const [guestsLoading, setGuestsLoading] = React.useState(false)
    const [roomsLoading, setRoomsLoading] = React.useState(false)
    const [bookingLoading, setBookingLoading] = React.useState(false)

    const [modalGuestIsOpen, setModalGuestIsOpen] = React.useState(false)
    const [modalRoomIsOpen, setModalRoomIsOpen] = React.useState(false)

    const [guestInput, setGuestInput] = React.useState('')
    const [roomInput, setRoomInput] = React.useState('')

    // checkin, checkout
    const [startDate, setStartDate] = React.useState(startDay)
    const [endDate, setEndDate] = React.useState(startDay)

    function resetForm() {
        setFormData({
            guest: '',
            room: '',
            color: '#3c556b',
        })
        setGuestInput('')
        setRoomInput('')
        setStartDate(startDay)
        setEndDate(startDay)
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()

            createBookingSchema.validateSync(
                {
                    ...formData,
                    checkIn: startDate,
                    checkOut: endDate,
                },
                {
                    strict: true,
                    abortEarly: false,
                },
            )
            setBookingLoading(true)

            await client.mutate({
                mutation: CREATE_BOOKING,
                variables: {
                    ...formData,
                    checkIn: startDate.toISOString(),
                    checkOut: endDate.toISOString(),
                },
            })

            client.clearStore().then(() => {
                setCurrent(
                    new Date(startDate.getFullYear(), startDate.getMonth()),
                )
                refetchDashboardData()

                // rerender component by changing state
                setData([])
            })

            resetForm()

            setBookingLoading(false)
        } catch (err) {}
    }

    function handleGuestChoose({ name, _id }) {
        if (name && _id) {
            setFormData(prevState => ({
                ...prevState,
                guest: _id,
            }))
            setGuestInput(name)
        }
    }
    function handleRoomChoose({ roomNumber, type, rate, _id }) {
        if (roomNumber && type && rate) {
            setFormData(prevState => ({
                ...prevState,
                room: _id,
            }))
            setRoomInput(`N${roomNumber}, ${type}, ${rate}₾`)

            const skip =
                Math.floor(roomNumber / paginationData.limit) *
                paginationData.limit

            // rerender if state will be different

            if (paginationData.skip !== skip) {
                setPaginationData(prevState => ({
                    ...prevState,
                    skip,
                }))
            }
        }
    }

    function renderGuest({ name }) {
        return name
    }
    function renderRoom({ roomNumber, rate, type }) {
        if (rate && roomNumber && type) {
            return `N${roomNumber}, ${type}, ${rate}₾`
        }
        return 'ოთახი არ მოიძებნა'
    }

    async function handleGuestInput(value) {
        if (value.length > 2) {
            setGuestsLoading(true)
            const { data } = await client.query({
                query: GET_GUESTS,
                variables: {
                    query: value,
                    limit: 6,
                },
                fetchPolicy: 'no-cache',
            })
            if (data.guests.length > 0) {
                setGuests(data.guests)
            } else {
                setGuests([
                    {
                        name: 'სტუმარი არ მოიძებნა',
                    },
                ])
            }
            setGuestsLoading(false)
        }
    }
    async function handleRoomInput(value) {
        setRoomsLoading(true)

        const { data } = await client.query({
            query: GET_ROOMS,
            variables: {
                query: value,
                limit: 6,
            },
            fetchPolicy: 'no-cache',
        })
        if (data.rooms.length > 0) {
            setRooms(data.rooms)
        } else {
            setRooms([
                {
                    type: 'ოთახი არ მოიძებნა',
                },
            ])
        }
        setRoomsLoading(false)
    }

    const ButtonWithLoader = withLoader(() => 'დაჯავშნა')

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="BookForm">
                <div className="BookForm__AutoComplete">
                    <AutoCompleteInput
                        value={guestInput}
                        setValue={setGuestInput}
                        handleChoose={handleGuestChoose}
                        handleModalOpen={() => setModalGuestIsOpen(true)}
                        data={guests}
                        handleChange={value => handleGuestInput(value.trim())}
                        className="BookForm__input"
                        placeholder="მოძებნეთ სტუმარი"
                        loading={guestsLoading}
                        renderItem={renderGuest}
                    />
                </div>
                <div className="BookForm__AutoComplete">
                    <AutoCompleteInput
                        value={roomInput}
                        setValue={setRoomInput}
                        handleChoose={handleRoomChoose}
                        handleModalOpen={() => setModalRoomIsOpen(true)}
                        data={rooms}
                        className="BookForm__input"
                        placeholder="ოთახის ტიპი"
                        handleChange={value => handleRoomInput(value.trim())}
                        loading={roomsLoading}
                        renderItem={renderRoom}
                    />
                </div>

                <div className="BookForm__DateRangePicker">
                    <DateRangePicker
                        current={current}
                        setCurrent={setCurrent}
                        roomId={formData.room}
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        runAfterDatePick={(...rest) =>
                            runAfterDatePick(
                                ...rest,
                                setTempBooking,
                                formData.color,
                            )
                        }
                    />
                </div>
                <div className="BookForm__ColorPicker">
                    <ColorPicker
                        color={formData.color}
                        setColor={color => {
                            setFormData(prevState => ({ ...prevState, color }))
                            setTempBooking(prev => {
                                if (prev) {
                                    return {
                                        ...prev,
                                        color,
                                    }
                                }
                            })
                        }}
                        colors={[
                            '#FF6633',
                            '#FFB399',
                            '#FF33FF',
                            '#FFFF99',
                            '#00B3E6',
                            '#E6B333',
                            '#3366E6',
                            '#999966',
                            '#99FF99',
                            '#B34D4D',
                            '#80B300',
                            '#809900',
                            '#E6B3B3',
                            '#FF4D4D',
                            '#99E6E6',
                            '#6666FF',
                        ]}
                    />
                </div>
                <button
                    type="submit"
                    className="button button--primary BookForm__button"
                >
                    <ButtonWithLoader isLoading={bookingLoading} />
                </button>
            </form>
            <GuestModal
                modalGuestIsOpen={modalGuestIsOpen}
                setModalGuestIsOpen={setModalGuestIsOpen}
                handleChoose={handleGuestChoose}
            />
            <RoomModal
                modalRoomIsOpen={modalRoomIsOpen}
                setModalRoomIsOpen={setModalRoomIsOpen}
                handleChoose={handleRoomChoose}
            />
        </div>
    )
}

export default React.memo(BookForm)
