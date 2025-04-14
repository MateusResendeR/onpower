import { TfiAnnouncement } from "react-icons/tfi";
import {  FiUsers, FiEye } from 'react-icons/fi';
import { IoStorefrontSharp } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { LuHandHeart } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa6";
import { ImageCarousel } from '../../components/ImageCarousel';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const images = [
  {
    src: '/baixinho.avif',
    alt: 'Baixinho',
  },
  {
    src: '/barbearia.jpeg',
    alt: 'Barbeiros club',
  },
  {
    src: '/fic.jpeg',
    alt: 'FIC',
  },
  {
    src: '/academia.jpeg',
    alt: 'Happy fit',
  },
];

const Home = () => {
  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 w-full overflow-x-hidden">
        <section id='home' className="md:pb-20 md:px-6 pt-32 md:m-0 pl-8 pr-8 md:pl-0 md:pr-0">
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mb-12 lg:mb-0 pl-8"
            >
              <div className='flex flex-row'>
                <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center md:text-left ">
                  Apresentamos a
                  <span className="text-black"> Onpower</span>
                </h1>
              </div>
              <p className="text-gray-600 text-lg mb-2 text-center md:text-left md:mr-2">
                  A On-power nasceu em 2023 em Garanhuns, no Agreste Pernambucano, pertencente ao Grupo Barvax, com a missão de revolucionar o mercado de publicidade digital e serviços de carregamento de dispositivos móveis.
                </p>
                <p className="text-gray-600 text-lg mb-2 text-center md:text-left md:mr-2">
                  Ao ingressar na família On-power, você se torna parte de uma família dedicada a impulsionar os negócios e oferecer serviços de alta qualidade aos clientes.
                </p>
                <p className="text-gray-600 text-lg mb-2 text-center md:text-left md:mr-2">
                  Ao ingressar na família On-power, você se torna parte de uma família dedicada a impulsionar os negócios e oferecer serviços de alta qualidade aos clientes.
                </p>
              
             
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img 
                src="/totem.png"
                alt="Care" 
                className="rounded-xl ml-9 transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

          </div>
        </section>

        <section id='franquia' className="md:pb-10 pt-10 md:m-0 pl-8 pr-8 md:pl-0 md:pr-0 bg-[#eafd5c]">
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl"
            >
              <img 
                src="/forma_abf.png"
                alt="Care" 
                className="w-[500px] transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12 lg:mb-0 w-full h-full"
            >
              <div className='flex flex-row'>
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
                  Vem fazer parte dessa família que só cresce
                </h1>
              </div>
              <div className='w-full text-center md:text-left'>
                <button onClick={() => window.location.href = '/contact?subject=Franquia'} className="bg-black hover:bg-gray-800 text-white font-bold py-6 px-8 rounded-full">
                  Quero ser um franqueado
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id='ourSystem' className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Features */}
              <div className="space-y-8">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 bg-gray-100 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black rounded-lg text-[#EAFD5C]">

                      <TbTargetArrow className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Missão</h3>
                      <p className="text-gray-600">
                      Facilitar o empreendedorismo e apoiar pequenos empresários na divulgação eficaz de suas empresas ou produtos, promovendo o crescimento e o sucesso de seus negócios.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-gray-100 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black rounded-lg text-[#EAFD5C]">
                      <FiEye className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Visão</h3>
                      <p className="text-gray-600">
                      Alcançar todo o território brasileiro, transformando a vida das pessoas por meio do apoio ao empreendedorismo e à promoção de pequenos negócios, contribuindo para o desenvolvimento econômico e social do país.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 bg-gray-100 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black rounded-lg text-[#EAFD5C]">
                      <LuHandHeart className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Valores</h3>
                      <p className="text-gray-600">
                        A Onpower tem como seus valores:
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                          <li>Cooperativismo</li>
                          <li>Transparência</li>
                          <li>Faciliatador de sonhos</li>
                          <li>Inclusividade</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-b from-gray-800 to-black rounded-xl p-8 text-[#eafd5c]"
              >
                <h3 className="text-2xl font-bold mb-6">Vantagens Competitivas</h3>
                
                <div className="space-y-6 h-full">
                  <div className="flex items-start gap-4">
                    <FiUsers className="text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Vantagens para o Usuário</h4>
                      <p className="text-sm opacity-90">
                      Nossos totens inovadores proporcionam carregamento rápido e gratuito de celulares, além de exibir anúncios interessantes, tornando a experiência do usuário prática e agradável.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <IoStorefrontSharp className="text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Vantagens para o Estabelecimento</h4>
                      <p className="text-sm opacity-90">
                      Os locais que hospedam nossos totens atraem mais clientes e aumentam suas oportunidades de venda, beneficiando-se de um ambiente moderno e atrativo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <TfiAnnouncement className="text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Vantagens para o Anunciante</h4>
                      <p className="text-sm opacity-90">
                      Anunciantes desfrutam de uma plataforma poderosa que amplia a visibilidade de suas campanhas, atingindo um público diversificado e engajado de forma impactante e memorável.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaUserTie className="text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Vantagens para o Franqueado</h4>
                      <p className="text-sm opacity-90">
                      Franqueados desfrutam de um modelo de negócios lucrativo e escalável, com suporte completo da franquia, treinamento especializado e acesso a uma marca consolidada no mercado. Beneficiam-se de receita passiva gerada por anúncios e parcerias, além de oportunidades de expansão com baixo custo operacional, garantindo um investimento seguro e potencial de retorno acelerado.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-16 text-center"
            >
              <div className="p-6 bg-gray-100 rounded-xl">
                <div className="text-black text-3xl font-bold mb-2">R$14.285,00</div>
                <div className="text-gray-600">Investimento inicial</div>
              </div>
              <div className="p-6 bg-gray-100 rounded-xl">
                <div className="text-black text-3xl font-bold mb-2">R$399,00</div>
                <div className="text-gray-600">Royalties Mensais</div>
              </div>
              <div className="p-6 bg-gray-100 rounded-xl">
                <div className="text-black text-3xl font-bold mb-2">A partir do 7° mês</div>
                <div className="text-gray-600">Payback</div>
              </div>
              <div className="p-6 bg-gray-100 rounded-xl">
                <div className="text-black text-3xl font-bold mb-2">A partir do 3° mês</div>
                <div className="text-gray-600">Break Even</div>
              </div>
              <div className="p-6 bg-gray-100 rounded-xl">
                <div className="text-black text-3xl font-bold mb-2">5%</div>
                <div className="text-gray-600">Royalties Fixos</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id='parceiros' className="py-4 bg-[#eafd5c] relative">
          <div className="container mx-auto px-6 flex flex-col items-center">
            <div className="w-full">
              <ImageCarousel images={images} />
            </div>
          </div>
        </section>

        {/* Design Partner Section */}
        <section className="bg-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#EAFD5C] rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full filter blur-3xl opacity-5 translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-black mb-6">Seja um Design Parceiro</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Você é designer e quer fazer parte da nossa rede? Entre em contato conosco e descubra como podemos trabalhar juntos para criar experiências visuais incríveis.
              </p>
              <Link 
                to="/contact?subject=Design" 
                className="inline-flex items-center gap-2 bg-black text-[#EAFD5C] font-bold py-4 px-8 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Quero ser um Design Parceiro</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div>© 2025 Onpower. Todos os direitos reservados</div>
            
          </div>
        </footer>
      </div>
  );
};

export default Home;