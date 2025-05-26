import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Baby, Heart, Clock, Droplets, User, Eye, Target, Smile } from 'lucide-react';

const EducationSSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const mainCards = [
    {
      id: 'cara-menyusui',
      title: 'Cara Menyusui yang Benar',
      icon: <Baby className="w-8 h-8" />,
      description: 'Panduan lengkap teknik menyusui yang tepat untuk ibu dan bayi',
      items: [
        {
          icon: <Clock className="w-6 h-6" />,
          title: 'Frekuensi Menyusui',
          content: 'Menyusui sesering mungkin/semau bayi (8-12 x sehari atau lebih)'
        },
        {
          icon: <Baby className="w-6 h-6" />,
          title: 'Membangunkan Bayi',
          content: 'Bila bayi tidur lebih dari 3 jam, bangunkan, lalu susui'
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: 'Durasi Menyusui',
          content: 'Susui sampai payudara terasa kosong, lalu pindah ke payudara sisi yang lain'
        },
        {
          icon: <Droplets className="w-6 h-6" />,
          title: 'Mencegah Mastitis',
          content: 'Apabila bayi sudah kenyang tetapi payudara masih penuh/kencang, payudara perlu diperah dan ASI disimpan untuk mencegah mastitis'
        }
      ]
    },
    {
      id: 'posisi-perlekatan',
      title: 'Posisi dan Perlekatan Menyusui',
      icon: <Target className="w-8 h-8" />,
      description: 'Teknik posisi dan perlekatan yang benar untuk kenyamanan optimal',
      items: [
        {
          icon: <User className="w-6 h-6" />,
          title: 'Posisi Kepala dan Badan',
          content: 'Kepala dan badan bayi membentuk garis lurus'
        },
        {
          icon: <Eye className="w-6 h-6" />,
          title: 'Arah Wajah Bayi',
          content: 'Wajah bayi menghadap payudara, hidung berhadapan dengan puting susu'
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: 'Kedekatan Badan',
          content: 'Badan bayi dekat ke tubuh ibu, ibu menggendong/mendekap badan bayi secara utuh'
        },
        {
          icon: <Smile className="w-6 h-6" />,
          title: 'Perlekatan Mulut',
          content: 'Bayi dekat dengan payudara dengan mulut terbuka lebar, dagu menyentuh payudara, areola atas lebih terlihat, bibir bawah memutar keluar'
        }
      ]
    },
    {
      id: 'cara-menyimpan-asi',
      title: 'Cara Menyimpan ASI',
      icon: <Droplets className="w-8 h-8" />,
      description: 'Panduan lengkap menyimpan ASI dengan aman berdasarkan suhu dan durasi',
      items: [
        {
          icon: <Clock className="w-6 h-6" />,
          title: 'ASI dalam Cooler Bag (15°C)',
          content: 'ASI dapat disimpan dalam cooler bag pada suhu 15°C selama 4-6 jam'
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: 'ASI dalam Ruangan (27°C-32°C)',
          content: 'Pada suhu ruangan 27°C-32°C: 4 jam. Pada suhu <25°C: 6-8 jam'
        },
        {
          icon: <Target className="w-6 h-6" />,
          title: 'ASI dalam Kulkas (<4°C)',
          content: 'Dapat disimpan dalam kulkas biasa selama 48-72 jam'
        },
        {
          icon: <Droplets className="w-6 h-6" />,
          title: 'ASI dalam Freezer',
          content: 'Lemari es 1 pintu (-15°C s/d 0°C): 2 minggu. Lemari es 2 pintu (-20°C s/d -18°C): 3-6 bulan. CATATAN: Sebelum diberikan, rendam dalam air hangat menggunakan wadah kaca/keramik, jangan gunakan plastik'
        }
      ]
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-6  px-4">
      <div className=" mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Edukasi Menyusui
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Panduan lengkap untuk ibu nifas dalam memberikan ASI dengan teknik yang benar dan aman
          </p>
        </motion.div>

        {/* Main Cards Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {mainCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Main Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                  ${expandedCard === card.id 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl' 
                    : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-white shadow-lg hover:shadow-xl'
                  }
                `}
                onClick={() => toggleCard(card.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    animate={{ rotate: expandedCard === card.id ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`
                      p-3 rounded-full
                      ${expandedCard === card.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600'
                      }
                    `}
                  >
                    {card.icon}
                  </motion.div>
                  <h2 className={`text-xl font-bold ${expandedCard === card.id ? 'text-white' : 'text-gray-800'}`}>
                    {card.title}
                  </h2>
                </div>
                
                <p className={`mb-4 ${expandedCard === card.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {card.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${expandedCard === card.id ? 'text-blue-100' : 'text-blue-600'}`}>
                    {expandedCard === card.id ? 'Tutup Detail' : 'Lihat Detail'}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedCard === card.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${expandedCard === card.id ? 'text-white' : 'text-blue-600'}`} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Expanded Detail Cards */}
              <AnimatePresence>
                {expandedCard === card.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    {card.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-400"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex-shrink-0">
                            <div className="text-blue-600">
                              {item.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 font-medium">Tips Penting</span>
            </div>
            <p className="text-gray-600">
              Konsultasikan dengan tenaga kesehatan jika mengalami kesulitan dalam menyusui atau tanda-tanda mastitis
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationSSection;