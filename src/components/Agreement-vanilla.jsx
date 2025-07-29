import { useState, useRef } from "react";

const Agreement = ({ onAgree }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
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
      onAgree();
    }
  };

  const parseAgreementText = (text) => {
    const sections = text.split(/(\d+\.\s[^|]+\s\|\s[^|]+)/g).filter(Boolean);
    return sections.map((section, index) => {
      if (section.match(/^\d+\./)) {
        const [title, ...content] = section.split("\n");
        const ruleNumber = title.match(/^\d+/)[0];
        const ruleTitle = title.replace(/^\d+\.\s/, "");

        return (
          <div
            key={index}
            className="agreement-rule animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="rule-header">
              <div className="rule-number">{ruleNumber}</div>
              <h3 className="rule-title">{ruleTitle}</h3>
            </div>
            <div className="rule-content">
              {content.map(
                (line, lineIndex) =>
                  line.trim() && (
                    <p key={lineIndex} className="rule-text">
                      {line.trim()}
                    </p>
                  )
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className="agreement-intro">
            {section.split("\n").map(
              (line, lineIndex) =>
                line.trim() && (
                  <p
                    key={lineIndex}
                    className={`intro-text ${
                      line.includes("PENTING") || line.includes("IMPORTANT")
                        ? "important-notice"
                        : ""
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
    <div className="agreement-page">
      <div className="container">
        {/* Header */}
        <div className="agreement-header glass-card animate-fadeInUp">
          <div className="header-content">
            <div className="legreen-logo mb-6">LeGreen</div>
            <h1 className="page-title">Terms & Conditions</h1>
            <p className="page-subtitle">
              Please carefully read through our comprehensive terms and
              conditions. Scroll to the bottom to continue with your
              registration.
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          className="agreement-content-wrapper glass-card animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: hasScrolledToBottom ? "100%" : "0%" }}
            />
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="agreement-scroll-area"
          >
            <div className="agreement-content">
              {parseAgreementText(agreementText)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="agreement-footer glass-card animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="scroll-status">
            {!hasScrolledToBottom ? (
              <div className="status-warning">
                <div className="warning-icon animate-bounce">⬇️</div>
                <p className="font-semibold">
                  Please scroll to the bottom to continue
                </p>
              </div>
            ) : (
              <div className="status-success">
                <div className="success-icon">✅</div>
                <p className="font-semibold">
                  You have read the complete agreement
                </p>
              </div>
            )}
          </div>

          <div className="agreement-actions">
            <button
              className={`btn btn-large ${
                hasScrolledToBottom ? "btn-primary" : "btn-disabled"
              }`}
              onClick={handleAgree}
              disabled={!hasScrolledToBottom}
            >
              {hasScrolledToBottom ? (
                <>
                  I Agree & Continue
                  <span>→</span>
                </>
              ) : (
                "Please scroll to continue"
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agreement-page {
          min-height: 100vh;
          padding: var(--spacing-4);
        }

        @media (min-width: 768px) {
          .agreement-page {
            padding: var(--spacing-8);
          }
        }

        .agreement-header {
          text-align: center;
          margin-bottom: var(--spacing-8);
          padding: var(--spacing-8);
        }

        .header-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .page-title {
          font-size: var(--font-size-4xl);
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: var(--spacing-4);
        }

        @media (min-width: 768px) {
          .page-title {
            font-size: var(--font-size-5xl);
          }
        }

        .page-subtitle {
          font-size: var(--font-size-lg);
          color: var(--gray-600);
          line-height: 1.6;
        }

        .agreement-content-wrapper {
          margin-bottom: var(--spacing-8);
          overflow: hidden;
          max-height: 70vh;
        }

        .agreement-scroll-area {
          padding: var(--spacing-8);
          overflow-y: auto;
          max-height: calc(70vh - 6px);
        }

        .agreement-content {
          max-width: none;
        }

        .agreement-rule {
          margin-bottom: var(--spacing-8);
          padding: var(--spacing-6);
          background: linear-gradient(
            135deg,
            rgba(34, 197, 94, 0.05) 0%,
            rgba(34, 197, 94, 0.1) 100%
          );
          border-left: 4px solid var(--legreen-primary);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .agreement-rule:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .rule-header {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-3);
          gap: var(--spacing-3);
        }

        .rule-number {
          width: 2rem;
          height: 2rem;
          background: var(--legreen-primary);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: var(--font-size-sm);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .agreement-rule:hover .rule-number {
          transform: scale(1.1);
          box-shadow: var(--shadow-md);
        }

        .rule-title {
          font-size: var(--font-size-lg);
          font-weight: 700;
          color: var(--gray-900);
          margin: 0;
        }

        .rule-content {
          margin-left: calc(2rem + var(--spacing-3));
        }

        .rule-text {
          color: var(--gray-700);
          line-height: 1.6;
          margin-bottom: var(--spacing-2);
          font-size: var(--font-size-sm);
        }

        .rule-text:last-child {
          margin-bottom: 0;
        }

        .agreement-intro {
          margin-bottom: var(--spacing-6);
        }

        .intro-text {
          color: var(--gray-700);
          line-height: 1.6;
          margin-bottom: var(--spacing-4);
          font-size: var(--font-size-base);
        }

        .important-notice {
          background: linear-gradient(
            135deg,
            rgba(251, 191, 36, 0.1) 0%,
            rgba(245, 158, 11, 0.1) 100%
          );
          border-left: 4px solid #f59e0b;
          padding: var(--spacing-4);
          border-radius: var(--radius-lg);
          font-weight: 700;
          font-size: var(--font-size-lg);
          color: var(--gray-900);
        }

        .agreement-footer {
          padding: var(--spacing-8);
        }

        .scroll-status {
          text-align: center;
          margin-bottom: var(--spacing-6);
        }

        .status-warning {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-3);
          padding: var(--spacing-4);
          background: rgba(251, 191, 36, 0.1);
          border: 2px solid rgba(251, 191, 36, 0.2);
          border-radius: var(--radius-xl);
          color: #92400e;
        }

        .status-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-3);
          padding: var(--spacing-4);
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid rgba(34, 197, 94, 0.2);
          border-radius: var(--radius-xl);
          color: var(--legreen-primary-dark);
        }

        .warning-icon {
          font-size: var(--font-size-xl);
        }

        .success-icon {
          font-size: var(--font-size-xl);
        }

        .agreement-actions {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Agreement;
