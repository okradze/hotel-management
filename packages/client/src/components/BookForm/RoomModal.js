import React, { useState } from 'react'
import Modal from 'react-modal'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { createRoomSchema } from '@hb/common'
import handleValidate from '../../utils/handleValidate'
import withLoader from '../Loader'
import Input from '../Input'

const CREATE_ROOM = gql`
    mutation CreateRoom($roomNumber: Int!, $rate: Int!, $type: String!) {
        createRoom(
            data: { roomNumber: $roomNumber, rate: $rate, type: $type }
        ) {
            _id
            rate
            roomNumber
            type
        }
    }
`

Modal.setAppElement('#root')

const RoomModal = ({ modalRoomIsOpen, setModalRoomIsOpen, handleChoose }) => {
    const [roomNumber, setRoomNumber] = useState(1)
    const [rate, setRate] = useState(1)
    const [type, setType] = useState('')
    const [errors, setErrors] = useState({
        roomNumber: '',
        rate: '',
        type: '',
    })

    const [createRoom, { loading }] = useMutation(CREATE_ROOM, {
        variables: {
            roomNumber,
            rate,
            type,
        },
        onCompleted: handleComplete,
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            createRoomSchema.validateSync(
                {
                    roomNumber,
                    rate,
                    type,
                },
                {
                    strict: true,
                    abortEarly: false,
                },
            )
            const { data } = await createRoom()
            handleChoose(data.createRoom)
        } catch (e) {
            if (e.inner) {
                e.inner.forEach(({ path, message }) => {
                    setErrors(prevState => ({
                        ...prevState,
                        [path]: [message],
                    }))
                })
            }
        }
    }

    function handleComplete(data) {
        if (data.createRoom) {
            setModalRoomIsOpen(false)
        }
    }

    const ButtonWithLoader = withLoader(() => 'დამატება')

    return (
        <Modal
            isOpen={modalRoomIsOpen}
            onRequestClose={() => setModalRoomIsOpen(false)}
            closeTimeoutMS={200}
            contentLabel="Create Room"
            className="modal"
        >
            <form onSubmit={e => handleSubmit(e)}>
                <Input
                    value={roomNumber}
                    onChange={e =>
                        handleValidate(
                            Number.parseInt(e.target.value, 10),
                            setRoomNumber,
                            'roomNumber',
                            setErrors,
                            createRoomSchema,
                            errors,
                        )
                    }
                    type="number"
                    id="roomNumber"
                    error={errors.roomNumber}
                    text="ოთახის ნომერი:"
                />
                <Input
                    value={rate}
                    onChange={e =>
                        handleValidate(
                            Number.parseInt(e.target.value, 10),
                            setRate,
                            'rate',
                            setErrors,
                            createRoomSchema,
                            errors,
                        )
                    }
                    id="rate"
                    className="input"
                    type="number"
                    error={errors.rate}
                    text="ოთახის ფასი:"
                />
                <Input
                    value={type}
                    onChange={e =>
                        handleValidate(
                            e.target.value,
                            setType,
                            'type',
                            setErrors,
                            createRoomSchema,
                            errors,
                        )
                    }
                    id="type"
                    className="input"
                    type="text"
                    error={errors.type}
                    text="ოთახის ტიპი:"
                />

                <button type="submit" className="button button--primary">
                    <ButtonWithLoader isLoading={loading} />
                </button>
            </form>
        </Modal>
    )
}
export default RoomModal
