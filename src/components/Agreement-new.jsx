import { useState, useEffect, useRef } from "react";

const Agreement = ({ onAgree }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const scrollContainerRef = useRef(null);

  const agreementText = `
Peraturan LeGreen (LeGreen Rules)

1. Waktu Check-in dan Check-out | Check-in and Check-out Time
Waktu yang diperbolehkan (permitted time) untuk Check-in adalah pukul 14:00 WIB (2:00 PM) dan waktu untuk Check-out yaitu pukul 12:00 WIB (12:00 PM).
The permitted time to Check-in is 14:00 (2:00 PM) and Check-out is 12:00 (12:00 PM).

2. Keamanan Barang Pribadi | Personal Property Security
Simpan barang-barang pribadi Anda di dalam kamar dan kunci pintu kamar saat keluar.
Keep your personal belongings inside the room and lock the door when leaving.

3. Kebijakan Tamu | Guest Policy
Tamu yang tidak terdaftar dilarang masuk ke kamar dan/atau menginap di LeGreen.
Unregistered guests are not allowed to enter the room and/or stay at LeGreen.

4. Larangan Narkoba dan Senjata | Narcotics and Weapons Prohibition
Dilarang membawa, menggunakan, menyimpan dan mengedarkan narkoba serta senjata tajam dan/atau senjata api.
It is strictly prohibited to bring, use, possess and/or distribute narcotics, sharp weapons and/or firearms.

5. Larangan Tindakan Kriminal | Criminal Activity Prohibition
Dilarang keras untuk melakukan tindakan kekerasan, pelecehan, perjudian dan/atau tindakan kriminal lainnya di dalam properti LeGreen.
It is strictly prohibited to perform any form of violence, harassment, gambling and/or other criminal activity inside the LeGreen property.

6. Aturan Kunjungan | Visitor Rules
Setiap tamu hanya diperbolehkan untuk membawa tamu maksimal 2 orang, untuk kunjungan maksimal 2 jam per hari. Jika lebih dari 2 orang atau lebih dari 2 jam, harap melapor ke manajemen LeGreen.
Each guest is only allowed to have a maximum of 2 visitors per day for a maximum of 2 hours. Additional occupants must report to LeGreen Management.

7. Tanggung Jawab Barang Pribadi | Personal Property Responsibility
Setiap tamu bertanggung jawab terhadap barang-barang pribadinya. Pihak LeGreen tidak bertanggung jawab atas kehilangan dan/atau kerusakan barang pribadi tamu.
Each guest is responsible for their own belongings. LeGreen is not responsible for lost or damaged personal property.

8. Ganti Rugi Kerusakan | Damage Compensation
Segala kerusakan dan/atau kehilangan yang disebabkan oleh tamu terhadap fasilitas LeGreen, akan menjadi tanggung jawab tamu sepenuhnya dan akan dikenakan biaya ganti rugi.
Any damage and/or loss to LeGreen's facilities caused by guests is the full responsibility of the guest and will incur compensation costs.

9. Larangan Merokok | Smoking Prohibition
Dilarang merokok di area LeGreen, kecuali di tempat yang telah disediakan.
Smoking is prohibited in LeGreen, except in designated areas.

10. Larangan Peralatan Elektronik | Electronic Equipment Prohibition
Dilarang menyimpan dan/atau menggunakan peralatan elektronik seperti kompor listrik, rice cooker, setrika dan sejenisnya di dalam kamar.
Storing and/or using electronic devices such as electric stoves, rice cookers, irons, and similar equipment in the room is prohibited.

11. Hak Manajemen | Management Rights
Pihak manajemen berhak untuk mengeluarkan tamu yang tidak mematuhi peraturan dan/atau membahayakan kenyamanan dan keamanan lingkungan LeGreen.
LeGreen Management reserves the right to evict guests who do not comply with the rules and/or endanger the safety and comfort of the LeGreen environment.

12. Larangan Paket Titipan | Package Deposit Prohibition
Dilarang menerima paket/barang titipan dari tamu lain atau orang luar. Semua paket/barang titipan wajib dikirimkan langsung ke kantor pos atau kantor LeGreen terdekat.
It is prohibited to receive parcels/items from other guests or outsiders. All parcels/items must be sent directly to the post office or nearest LeGreen office.

PENTING | IMPORTANT:
Dengan mencentang persetujuan di bawah ini, Anda menyatakan telah membaca, memahami, dan menyetujui untuk mematuhi semua peraturan LeGreen yang tercantum di atas.
By checking the agreement below, you acknowledge that you have read, understood, and agree to comply with all LeGreen rules listed above.
  `;

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setHasScrolledToBottom(scrolledToBottom);
    }
  };

  const handleAgree = () => {
    if (hasScrolledToBottom) {
      setAgreed(true);
      onAgree();
    }
  };

  const parseAgreementText = (text) => {
    const sections = text.split(/(\d+\.\s[^|]+\s\|\s[^|]+)/g).filter(Boolean);
    return sections.map((section, index) => {
      if (section.match(/^\d+\./)) {
        const [title, ...content] = section.split("\n");
        return (
          <div key={index} className="mb-8 group">
            <div className="bg-gradient-to-r from-legreen-50 to-legreen-100 border-l-4 border-legreen-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-legreen-900 mb-3 flex items-center">
                <span className="bg-legreen-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 group-hover:scale-110 transition-transform duration-300">
                  {title.match(/^\d+/)[0]}
                </span>
                {title.replace(/^\d+\.\s/, "")}
              </h3>
              <div className="space-y-2 text-legreen-800">
                {content.map(
                  (line, lineIndex) =>
                    line.trim() && (
                      <p key={lineIndex} className="leading-relaxed text-sm">
                        {line.trim()}
                      </p>
                    )
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className="space-y-4 text-legreen-700">
            {section.split("\n").map(
              (line, lineIndex) =>
                line.trim() && (
                  <p
                    key={lineIndex}
                    className={`leading-relaxed ${
                      line.includes("PENTING") || line.includes("IMPORTANT")
                        ? "text-lg font-bold text-legreen-900 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-l-4 border-orange-400"
                        : "text-base"
                    }`}
                  >
                    {line.trim()}
                  </p>
                )
            )}
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legreen-50 via-legreen-100 to-legreen-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-legreen-200">
          <div className="mb-6">
            <div className="inline-block bg-gradient-to-r from-legreen-600 to-legreen-700 text-white px-8 py-4 rounded-2xl font-bold text-2xl tracking-wider shadow-lg hover:scale-105 transition-transform duration-300 cursor-default">
              LeGreen
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-legreen-900 mb-4">
            Terms & Conditions
          </h2>
          <p className="text-legreen-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Please carefully read through our comprehensive terms and
            conditions. Scroll to the bottom to continue with your registration.
          </p>
        </div>

        {/* Content */}
        <div
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-legreen-200 mb-8 overflow-hidden"
          style={{ maxHeight: "70vh" }}
        >
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-legreen-500 to-legreen-600 h-2">
            <div
              className="bg-gradient-to-r from-legreen-300 to-legreen-400 h-full transition-all duration-300 ease-out"
              style={{
                width: hasScrolledToBottom ? "100%" : "0%",
                background: hasScrolledToBottom
                  ? "linear-gradient(to right, #10b981, #059669)"
                  : "linear-gradient(to right, #86efac, #4ade80)",
              }}
            />
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="p-8 overflow-y-auto custom-scrollbar"
            style={{ maxHeight: "calc(70vh - 8px)" }}
          >
            <div className="prose prose-legreen max-w-none">
              {parseAgreementText(agreementText)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-legreen-200">
          <div className="text-center mb-6">
            {!hasScrolledToBottom ? (
              <div className="flex items-center justify-center space-x-3 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-200">
                <div className="animate-bounce">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <p className="font-semibold">
                  Please scroll to the bottom to continue
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3 text-legreen-600 bg-legreen-50 p-4 rounded-xl border border-legreen-200">
                <div className="bg-legreen-500 text-white rounded-full p-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="font-semibold">
                  You have read the complete agreement
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                hasScrolledToBottom
                  ? "bg-gradient-to-r from-legreen-500 to-legreen-600 text-white shadow-lg hover:scale-105 hover:shadow-xl hover:from-legreen-600 hover:to-legreen-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleAgree}
              disabled={!hasScrolledToBottom}
            >
              {hasScrolledToBottom
                ? "I Agree & Continue"
                : "Please scroll to continue"}
              {hasScrolledToBottom && (
                <svg
                  className="w-5 h-5 ml-2 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #16a34a 0%, #14532d 100%);
        }
      `}</style>
    </div>
  );
};

export default Agreement;
