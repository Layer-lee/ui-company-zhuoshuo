import emailjs from 'emailjs-com'

const emailService = {
  sendEmail(formData) {
    const userID = '6Hrrceb-d_SfAd4j5' // Replace with your actual EmailJS User ID
    const serviceID = 'service_s88ixuj' // Replace with your Service ID
    const templateID = 'template_bqh2cnj' // Replace with your Template ID

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }

    return emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully:', response)
        return response
      })
      .catch((error) => {
        console.error('Error sending email:', error)
        throw error
      })
  },
}

export { emailService }
