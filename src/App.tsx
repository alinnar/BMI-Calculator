import React, { useState, useEffect } from 'react';
import { Calculator, User, Calendar, Ruler, Weight, History, HandHeart, AlignCenter } from 'lucide-react';

interface BMIRecord {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  category: string;
  date: string;
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dateOfBirth: '',
    gender:'',
    height: '',
    weight: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [bmiHistory, setBmiHistory] = useState<BMIRecord[]>([]);
  const [showHistory] = useState(false);

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Kekurangan Berat Badan';
    if (bmi < 25) return 'Berat Badan Normal';
    if (bmi < 30) return 'Kelebihan Berat Badan';
    return 'Obesitas';
  };

  const getBMIDescription = (category: string) => {
    switch (category) {

    case 'Kekurangan Berat Badan':
      return (
        <>
          <ol className="list-decimal list-inside space-y-2">
            <br />
            <strong>1. Konsumsi Makanan Bernilai Gizi Tinggi.</strong>
              <br />
              Makanan yang kaya nutrisi, yaitu karbohidrat kompleks (seperti roti gandum, nasi, pasta), 
              protein (seperti daging, ikan, telur, produk susu), lemak sehat (seperti alpukat, kacang-kacangan, minyak zaitun), 
              dan buah serta sayuran. <br />
            
            <br />
            <strong>2. Memperbanyak Porsi Makan. </strong><br />
              Tingkatkan jumlah makanan yang dikonsumsi dalam setiap waktu makan.<br />

            <br />
            <strong>3. Pilih Camilan yang Bergizi. </strong><br />
              Contohnya yoghurt, kacang-kacangan, telur, atau keju.<br />

            <br />
            <strong>4. Latihan Fisik Teratur. </strong><br />
              Melakukan aktivitas fisik secara teratur dapat meningkatkan nafsu makan.<br />

            <br />
            <strong>5. Konsumsi Makanan dalam Porsi Kecil, Tapi Sering. </strong><br />
              Membantu menjaga asupan kalori yang konsisten.<br />

            <br />
            <strong>6. Hindari Stres dan Cemas. </strong><br />
              Ketika stres, tubuh melepaskan kortisol yang bisa mengurangi nafsu makan. 
              Untuk mengatasinya bisa olahraga, meditasi, atau kegiatan menyenangkan.<br />

          </ol>
          <p className="mt-4">
            <strong>
              Disarankan untuk memperhatikan asupan gizi dan berkonsultasi dengan ahli gizi.
            </strong>
          </p>
        </>
      );

      case 'Berat Badan Normal':
        return  (
        <>
          <p>
            Berat badan Anda <strong>NORMAL</strong>. Pertahankan pola makan dan gaya hidup sehat.
          </p>
        </>
      );

      case 'Kelebihan Berat Badan':
        return (
          <>
            <ol className="list-decimal list-inside space-y-2">
              <br />
              <strong>1. Atur Pola Makan Sehat. </strong><br />
              Makan teratur dan konsumsi makanan yang rendah kalori namun tetap bergizi, 
              perbanyak porsi buah dan sayur, hindari cara masak yang terlalu berminyak 
              dan bahan yang mengandung lemak. Karbohidrat tetap boleh dikonsumsi tapi 
              dengan jumlah yang lebih sedikit.<br />

              <br />
              <strong>2. Olahraga Teratur. </strong><br />
              Olahraga dilakukan minimal 3-5x seminggu, setidaknya 150 menit perminggu 
              atau 30 menit perhari.<br />

              <br />
              <strong>3. Perbanyak Minum Air Putih dan Hindari Produk Kafein. </strong><br />
              Terkadang karena kurang minum air putih sering merasa lapar dan akhirnya makan lebih banyak. 
              Serta kurangi minum minuman yang bersoda, kopi, dan teh.<br />

              <br />
              <strong>4. Istirahat Cukup. </strong><br />
              Bergadang meningkatkan kegiatan nyemil pada malam hari.<br />

              <br />
              <strong>5. Konsultasi ke Dokter. </strong><br />
              Apabila IMT sudah melebihi 27, disarankan untuk bisa melakukan konsultasi ke fasilitas 
              kesehatan terdekat untuk mendapatkan panduan dan mendeteksi berbagai potensi penyakit.<br />
            </ol>
            <p className="mt-4">
              <strong>
                Disarankan untuk segera mengatur pola makan dan berkonsultasi dengan ahli gizi.
              </strong>
            </p>
          </>
        );

        case 'Obesitas':
          return (
            <>
              <ol className="list-decimal list-inside space-y-2">
                <br />
                <strong>1. Mengatur Pola Makan. </strong><br />
                Mengatur pola makan dan mengonsumsi makanan yang sehat dan bergizi.<br />

                <br />
                <strong>2. Tidak Mengonsumsi Gula, Garam, dan Lemak secara Berlebihan. </strong><br />
                Perbanyak konsumsi buah dan sayur minimal 5 porsi per hari atau setara dengan 450 gram/hari.<br />

                <br />
                <strong>3. Rutin Melakukan Aktivitas Fisik. </strong><br />
                Rutin melakukan aktivitas fisik minimal 150 menit per minggu atau 30 menit per hari.<br />

                <br />
                <strong>4. Tidak Mengonsumsi Rokok dan Alkohol. </strong><br />
                Berhenti dari perilaku tidak sehat dan menghindari minuman beralkohol.<br />

                <br />
                <strong>5. Konsultasi ke Dokter. </strong><br />
                Apabila IMT sudah melebihi 27, disarankan untuk melakukan konsultasi ke fasilitas 
                kesehatan terdekat untuk mendapatkan panduan dan mendeteksi potensi penyakit.<br />
              </ol>
              <p className="mt-4">
                <strong>
                  Disarankan untuk segera mengatur pola makan dan berkonsultasi dengan ahli gizi.
                </strong>
              </p>
            </>
          );

        default:
        return '';
    }
  };

  const getBMIColor = (category: string): string => {
    switch (category) {
      case 'Kekurangan Berat Badan': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Berat Badan Normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'Kelebihan Berat Badan': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Obesitas': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.age) newErrors.age = 'Umur wajib diisi';
    else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) newErrors.age = 'Usia harus antara 1 dan 120';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Tanggal lahir wajib diisi';
    if (!formData.gender) newErrors.gender = 'Jenis Kelamin wajib diisi';
    if (!formData.height) newErrors.height = 'Tinggi badan wajib diisi';
    else if (parseFloat(formData.height) < 50 || parseFloat(formData.height) > 300) newErrors.height = 'Tinggi badan harus antara 50 dan 300 cm';
    if (!formData.weight) newErrors.weight = 'Berat badan wajib diisi';
    else if (parseFloat(formData.weight) < 20 || parseFloat(formData.weight) > 500) newErrors.weight = 'Berat badan harus antara 20 dan 500 kg';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const height = parseFloat(formData.height) / 100; // Convert cm to meters
    const weight = parseFloat(formData.weight);
    const bmi = weight / (height * height);
    const category = getBMICategory(bmi);

    setBmiResult(bmi);
    setBmiCategory(category);


    // Add to history
    const newRecord: BMIRecord = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      bmi: bmi,
      category: category,
      date: new Date().toLocaleDateString()
    };

    setBmiHistory(prev => [newRecord, ...prev]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      dateOfBirth: '',
      gender: '',
      height: '',
      weight: ''
    });
    setBmiResult(null);
    setBmiCategory('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <HandHeart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kalkulator BMI
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Main Form */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Hitung BMI Anda</h2>
              </div>

              <form onSubmit={calculateBMI} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    <span>Nama Lengkap</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Masukkan Nama"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Age and Date of Birth Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <span>Umur</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.age ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="25"
                      min="1"
                      max="120"
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>Tanggal Lahir</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                </div>

                {/* Gender Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    <span>Jenis Kelamin</span>
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Laki-laki"
                        checked={formData.gender === 'Laki-laki'}
                        onChange={handleInputChange}
                        className="accent-blue-600"
                      />
                      <span>Laki-laki</span>
                    </label>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Perempuan"
                        checked={formData.gender === 'Perempuan'}
                        onChange={handleInputChange}
                        className="accent-pink-600"
                      />
                      <span>Perempuan</span>
                    </label>
                  </div>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                {/* Height and Weight Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Ruler className="h-4 w-4" />
                      <span>Tinggi Badan (cm)</span>
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.height ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="170"
                      min="50"
                      max="300"
                      step="0.1"
                    />
                    {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Weight className="h-4 w-4" />
                      <span>Berat Badan (kg)</span>
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.weight ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="70"
                      min="20"
                      max="500"
                      step="0.1"
                    />
                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Hitung BMI
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* BMI Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori BMI</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm"><strong>Kekurangan Berat Badan:</strong> Di Bawah 18.5</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm"><strong>Normal:</strong> 18.5 - 24.9</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm"><strong>Kelebihan Berat Badan:</strong> 25 - 29.9</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm"><strong>Obesitas:</strong> 30 Ke Atas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results and History */}
          <div className="space-y-6">
            {/* BMI Result */}
            {bmiResult && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 transform animate-in fade-in duration-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hasil BMI Anda</h3>
                
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-white shadow-lg">
                    <span className="text-3xl font-bold text-gray-800">{bmiResult.toFixed(1)}</span>
                  </div>
                  
                  <div className={`inline-block px-6 py-3 rounded-full border-2 font-semibold ${getBMIColor(bmiCategory)}`}>
                    {bmiCategory}
                  </div>

                  {/* Berat Badan Ideal */}
                  <div className="bg-blue-50 rounded-xl p-4 mt-2 text-sm text-gray-700">
                    <strong>Berat Badan Ideal Anda (<i>Rumus Borca</i>):</strong>
                    <br />
                    {(() => {
                      const height = parseFloat(formData.height); // tinggi dalam cm
                      let idealWeight = 0;

                      if (formData.gender === "Laki-laki") {
                        idealWeight = (height - 100) - ((height - 100) * 0.10);
                      } else if (formData.gender === "Perempuan") {
                        idealWeight = (height - 100) - ((height - 100) * 0.15);
                      }

                      return `${idealWeight.toFixed(1)} kg`;
                    })()}
                  </div>

                  <div className="bg-red-50 rounded-xl p-4 mt-6 text-sm text-gray-700 mt-2 whitespace-pre-line text-left"> 
                    <p className='text-center'><strong>Saran:</strong></p>
                    {getBMIDescription(bmiCategory)}
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mt-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Informasi Pribadi</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Nama:</strong> {formData.name}</p>
                      <p><strong>Umur:</strong> {formData.age} Tahun</p>
                      <p><strong>Jenis Kelamin:</strong> {formData.gender}</p>
                      <p><strong>Tinggi Badan:</strong> {formData.height} cm</p>
                      <p><strong>Berat Badan:</strong> {formData.weight} kg</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History */}
            {(showHistory || bmiHistory.length > 0) && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Riwayat</h3>
                  {bmiHistory.length > 0 && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setBmiHistory([])}
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
                      >
                        Hapus Semua
                      </button>

                      <button
                        onClick={() => {
                          // Convert to CSV
                          const headers = [
                            "Nama",
                            "Tanggal",
                            "BMI",
                            "Umur",
                            "Jenis Kelamin",
                            "Tinggi (cm)",
                            "Berat (kg)",
                            "Kategori",
                          ];
                          const rows = bmiHistory.map((record) => [
                            record.name,
                            record.date,
                            record.bmi.toFixed(1),
                            record.age,
                            record.gender,
                            record.height,
                            record.weight,
                            record.category,
                          ]);

                          const csvContent = [headers, ...rows]
                            .map((e) => e.join(","))
                            .join("\n");

                          // Download file
                          const blob = new Blob([csvContent], {
                            type: "text/csv;charset=utf-8;",
                          });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.setAttribute("download", "riwayat_bmi.csv");
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200"
                      >
                        Export CSV
                      </button>
                    </div>
                  )}
                </div>

                {bmiHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Belum Ada Perhitungan BMI</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {bmiHistory.map((record) => (
                      <div
                        key={record.id}
                        className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{record.name}</h4>
                            <span className="text-xs text-gray-500">{record.date}</span>
                          </div>
                          <button
                            onClick={() =>
                              setBmiHistory(bmiHistory.filter((r) => r.id !== record.id))
                            }
                            className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            Hapus
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p>
                              BMI:{" "}
                              <strong className="text-gray-800">
                                {record.bmi.toFixed(1)}
                              </strong>
                            </p>
                            <p>Umur: {record.age} tahun</p>
                            <p>Jenis Kelamin: {record.gender}</p>
                          </div>
                          <div>
                            <p
                              className={`font-medium ${
                                getBMIColor(record.category).split(" ")[0]
                              }`}
                            >
                              {record.category}
                            </p>
                            <p>
                              {record.height}cm, {record.weight}kg
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center py-4 text-gray-600 text-sm">
        <p>© 2025 <span className="font-semibold">KKN UNY - KLEPU MERAMU</span></p>
        <p className="mt-1">By <span className="font-bold">Revalin Arianti Rajagukguk</span></p>
      </footer>
    </div>
  );
}

export default App;