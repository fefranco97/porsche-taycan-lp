import { navigate } from 'astro:transitions/client'
import React from 'react'

interface EDPFormProps {
  isOpen: boolean
}

const EDPForm = ({ isOpen }: EDPFormProps) => {
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', lastName: '' })
  const [isFormOpen, setIsFormOpen] = React.useState(isOpen)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsFormOpen(isOpen)
  }, [isOpen])

  React.useEffect(() => {
    const handleToggleForm = (event: any) => {
      setIsFormOpen(event.detail.isOpen)
    }

    const handleResetForm = () => {
      setIsFormOpen(false)
      setFormData({ name: '', email: '', phone: '', lastName: '' })
      setIsLoading(false)
    }

    window.addEventListener('toggleForm', handleToggleForm)
    window.addEventListener('resetForm', handleResetForm)

    window.addEventListener('pageshow', handleResetForm)

    return () => {
      window.removeEventListener('toggleForm', handleToggleForm)
      window.removeEventListener('resetForm', handleResetForm)
      window.removeEventListener('pageshow', handleResetForm)
    }
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    const resetEvent = new CustomEvent('resetForm')
    window.dispatchEvent(resetEvent)

    setTimeout(() => {
      setIsLoading(false)
      navigate('/success')
    }, 1500) // Reduced timeout for better UX
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setFormData({ name: '', email: '', phone: '', lastName: '' })
    const event = new CustomEvent('toggleForm', { detail: { isOpen: false } })
    window.dispatchEvent(event)
  }

  return (
    <div className={`accordion-wrapper ${isFormOpen ? 'open' : 'closed'} w-full relative z-50`}>
      <form
        onSubmit={handleSubmit}
        data-form-component
        className="relative z-10 flex flex-col gap-4 items-center justify-between p-6 w-3/4 md:w-2/3 xl:w-1/3 mx-auto  mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="border border-[#DBDBDB] rounded-lg px-4 py-2 w-full placeholder:text-[#DBDBDB] font-light focus:outline-none "
              type="text"
              id="name"
              name="name"
              placeholder="Type your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              className="border border-[#DBDBDB] rounded-lg px-4 py-2 w-full placeholder:text-[#DBDBDB] font-light focus:outline-none "
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Type your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              className="border border-[#DBDBDB] rounded-lg px-4 py-2 w-full placeholder:text-[#DBDBDB] font-light focus:outline-none 
              invalid:border-red-500
              "
              type="email"
              id="email"
              name="email"
              placeholder="Type your e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              className="border border-[#DBDBDB] rounded-lg px-4 py-2 w-full placeholder:text-[#DBDBDB] font-light focus:outline-none "
              type="tel"
              id="phone"
              name="phone"
              placeholder="Type your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex w-full justify-between items-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 font-bold rounded-3xl px-4 py-2 border border-gray-300 hover:bg-gray-100 hoverEffect">
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#F6334F] text-white font-bold rounded-3xl px-4 py-2 shadow-md shadow-[#F6334F] hover:bg-[#F6334F]/80 hoverEffect disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? <span className="p-4 rounded-full border-1 animate-spin"></span> : 'Activate Now'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EDPForm
