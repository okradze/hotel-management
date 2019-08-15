import React, { useState } from 'react'
import Modal from 'react-modal'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { createGuestSchema } from '@hb/common'
import handleValidate from '../../utils/handleValidate'
import Loader from '../Loader'
import Input from '../Input'

const CREATE_GUEST = gql`
    mutation CreateGuest($name: String!, $phone: String!) {
        createGuest(data: { name: $name, phone: $phone }) {
            id
            name
        }
    }
`

Modal.setAppElement('#root')

const GuestModal = ({
    modalGuestIsOpen,
    setModalGuestIsOpen,
    handleChoose,
}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
    })

    const [createGuest, { loading }] = useMutation(CREATE_GUEST, {
        variables: {
            name,
            phone,
        },
        onCompleted: handleComplete,
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            createGuestSchema.validateSync(
                {
                    name,
                    phone,
                },
                {
                    strict: true,
                    abortEarly: false,
                },
            )
            const { data } = await createGuest()
            handleChoose(data.createGuest)
        } catch (e) {
            e.inner.forEach(({ path, message }) => {
                setErrors(prevState => ({
                    ...prevState,
                    [path]: [message],
                }))
            })
        }
    }

    function handleComplete(data) {
        if (data.createGuest) {
            setModalGuestIsOpen(false)
        }
    }

    return (
        <Modal
            isOpen={modalGuestIsOpen}
            onRequestClose={() => setModalGuestIsOpen(false)}
            closeTimeoutMS={200}
            contentLabel="Create Guest"
            className="modal"
        >
            <form onSubmit={e => handleSubmit(e)}>
                <Input
                    value={name}
                    onChange={e =>
                        handleValidate(
                            e.target.value,
                            setName,
                            'name',
                            setErrors,
                            createGuestSchema,
                            errors,
                        )
                    }
                    type="text"
                    id="name"
                    error={errors.name}
                    text="სტუმრის სრული სახელი:"
                />
                <Input
                    value={phone}
                    onChange={e =>
                        handleValidate(
                            e.target.value,
                            setPhone,
                            'phone',
                            setErrors,
                            createGuestSchema,
                            errors,
                        )
                    }
                    id="phone"
                    className="input"
                    type="text"
                    error={errors.phone}
                    text="სტუმრის საკონტაქტო ტელეფონი:"
                />

                <button type="submit" className="button button--primary">
                    {loading ? <Loader /> : 'დამატება'}
                </button>
            </form>
        </Modal>
    )
}

export default GuestModal
