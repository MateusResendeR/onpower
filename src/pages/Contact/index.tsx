import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiInstagram, FiSend, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../../config/emailjs';
import { useSearchParams } from 'react-router-dom';

interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  isWhatsapp: boolean;
  subject: string;
  message: string;
}

const Contact = () => {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    subject: Yup.string().required('Assunto é obrigatório'),
    message: Yup.string().required('Mensagem é obrigatória')
  });

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      isWhatsapp: false,
      subject: subjectParam === 'Design' ? 'Design' : subjectParam === 'Franquia' ? 'Franquia' : subjectParam === 'Publicidade' ? 'Publicidade' : subjectParam === 'Suporte' ? 'Suporte' : 'Outro',
      message: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const templateParams = {
          from_name: values.fullName,
          from_email: values.email,
          phone: values.phone,
          is_whatsapp: values.isWhatsapp ? "Sim" : "Não",
          subject: values.subject,
          message: values.message,
        };

        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams
        );

        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        formik.resetForm();
      } catch (err) {
        setError('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
        console.error('Erro ao enviar email:', err);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const contactInfo = [
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Telefone",
      value: "(87) 98857-2472",
      link: "tel:+5587988572472"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      value: "(87) 98857-2472",
      link: "https://wa.me/5587988572472"
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email",
      value: "barvax.br@gmail.com",
      link: "mailto:barvax.br@gmail.com"
    },
    {
      icon: <FiInstagram className="text-2xl" />,
      title: "Instagram",
      value: "@onpowermidia",
      link: "https://instagram.com/onpowermidia"
    }
  ];

  const subjectOptions = [
    { value: '', label: 'Selecione um assunto' },
    { value: 'Franquia', label: 'Seja um Franqueado' },
    { value: 'Design', label: 'Design Parceiro' },
    { value: 'Publicidade', label: 'Publicidade' },
    { value: 'Suporte', label: 'Suporte' },
    { value: 'Outro', label: 'Outro' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Entre em Contato
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#EAFD5C] to-black" />
              
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="text-gray-700 font-medium block mb-2">Nome Completo</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('fullName')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formik.touched.fullName && formik.errors.fullName 
                        ? 'border-red-500' 
                        : 'border-gray-300 focus:border-[#EAFD5C]'
                    } focus:ring-2 focus:ring-[#EAFD5C] focus:ring-opacity-50 transition`}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 font-medium block mb-2">Email</label>
                  <input
                    type="email"
                    {...formik.getFieldProps('email')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formik.touched.email && formik.errors.email 
                        ? 'border-red-500' 
                        : 'border-gray-300 focus:border-[#EAFD5C]'
                    } focus:ring-2 focus:ring-[#EAFD5C] focus:ring-opacity-50 transition`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 font-medium block mb-2">Telefone</label>
                    <input
                      type="tel"
                      {...formik.getFieldProps('phone')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formik.touched.phone && formik.errors.phone 
                          ? 'border-red-500' 
                          : 'border-gray-300 focus:border-[#EAFD5C]'
                      } focus:ring-2 focus:ring-[#EAFD5C] focus:ring-opacity-50 transition`}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                    )}
                  </div>
                  <div className="flex items-center mt-8">
                    <input
                      type="checkbox"
                      {...formik.getFieldProps('isWhatsapp')}
                      className="w-5 h-5 rounded border-gray-300 text-[#EAFD5C] focus:ring-[#EAFD5C]"
                    />
                    <label className="ml-2 text-gray-700">É WhatsApp?</label>
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-medium block mb-2">Assunto</label>
                  <select
                    {...formik.getFieldProps('subject')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formik.touched.subject && formik.errors.subject 
                        ? 'border-red-500' 
                        : 'border-gray-300 focus:border-[#EAFD5C]'
                    } focus:ring-2 focus:ring-[#EAFD5C] focus:ring-opacity-50 transition`}
                  >
                    {subjectOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 font-medium block mb-2">Mensagem</label>
                  <textarea
                    {...formik.getFieldProps('message')}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formik.touched.message && formik.errors.message 
                        ? 'border-red-500' 
                        : 'border-gray-300 focus:border-[#EAFD5C]'
                    } focus:ring-2 focus:ring-[#EAFD5C] focus:ring-opacity-50 transition`}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2
                    ${isSubmitted 
                      ? 'bg-green-500 text-white'
                      : isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black text-[#EAFD5C] hover:bg-gray-900'}`}
                  disabled={isSubmitted || isLoading}
                >
                  {isSubmitted ? (
                    <>
                      <FiCheck />
                      Mensagem Enviada!
                    </>
                  ) : isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Enviar Mensagem
                    </>
                  )}
                </motion.button>
                {error && (
                  <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                )}
              </form>
            </motion.div>

            {/* Contact Info and Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 bg-[#EAFD5C] rounded-full flex items-center justify-center mb-4">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                    <p className="text-gray-600">{info.value}</p>
                  </motion.a>
                ))}
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.9717516679707!2d-36.49066452498305!3d-8.88221819117336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7070cdcf9725de5%3A0x1116f9b01d0257ea!2sR.%20Am%C3%A9lia%20Zooby%2C%20123%20-%20Heli%C3%B3polis%2C%20Garanhuns%20-%20PE%2C%2055295-440!5e0!3m2!1spt-BR!2sbr!4v1744672645805!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 