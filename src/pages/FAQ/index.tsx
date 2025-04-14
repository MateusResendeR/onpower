import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Como funciona o sistema de totens da Onpower?",
    answer: "Os totens da Onpower são dispositivos inteligentes que oferecem carregamento gratuito de celulares enquanto exibem anúncios relevantes. Eles são estrategicamente posicionados em estabelecimentos parceiros para maximizar a visibilidade e utilidade para os usuários."
  },
  {
    question: "Quais são os benefícios para os estabelecimentos parceiros?",
    answer: "Os estabelecimentos parceiros se beneficiam de várias maneiras: aumento do fluxo de clientes, modernização do ambiente, possibilidade de divulgação do próprio negócio nos totens, e o mais importante, fidelização dos clientes que permanecem mais tempo no estabelecimento enquanto seus dispositivos carregam."
  },
  {
    question: "Como posso me tornar um franqueado Onpower?",
    answer: "Para se tornar um franqueado Onpower, o investimento inicial é de R$14.285,00, com royalties mensais de R$399,00. O retorno do investimento (payback) é estimado a partir do 7º mês, e o ponto de equilíbrio (break even) é alcançado a partir do 3º mês. Entre em contato conosco para mais informações sobre o processo de franquia."
  },
  {
    question: "Como funciona o sistema de publicidade nos totens?",
    answer: "O sistema de publicidade nos totens é gerenciado digitalmente, permitindo que anunciantes exibam seus conteúdos de forma direcionada e eficiente. Os anúncios são exibidos em alta qualidade enquanto os usuários carregam seus dispositivos, garantindo alta visibilidade e engajamento do público-alvo."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-6 pb-20 pt-40">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Perguntas Frequentes
          </motion.h1>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  className={`bg-white rounded-xl shadow-lg overflow-hidden
                    ${activeIndex === index ? 'ring-2 ring-[#EAFD5C]' : 'hover:shadow-xl'}
                    transition-all duration-300`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center justify-center w-8 h-8 rounded-full
                        ${activeIndex === index ? 'bg-black text-[#EAFD5C]' : 'bg-[#EAFD5C]'}`}
                    >
                      {activeIndex === index ? <FiMinus /> : <FiPlus />}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: activeIndex === index ? 1 : 0 }}
                  className="absolute -z-10 top-0 left-0 w-full h-full bg-[#EAFD5C] opacity-10 rounded-xl transform -rotate-1"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: activeIndex === index ? 1 : 0 }}
                  className="absolute -z-10 top-0 left-0 w-full h-full bg-black opacity-5 rounded-xl transform rotate-1"
                />
              </motion.div>
            ))}
          </div>

          {/* Decorative background elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-20 w-64 h-64 bg-[#EAFD5C] rounded-full opacity-10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 right-20 w-64 h-64 bg-black rounded-full opacity-5 blur-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 