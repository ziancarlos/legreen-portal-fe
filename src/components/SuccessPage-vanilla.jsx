import { useState } from "react";

const SuccessPage = ({ formData, onStartOver }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="success-page">
      <div className="container">
        {/* Success Header */}
        <div className="success-header glass-card animate-fadeInUp">
          <div className="header-content">
            <div className="success-icon animate-pulse">
              <div className="checkmark">✓</div>
            </div>

            <div className="legreen-logo mb-4">LeGreen</div>

            <h1 className="page-title">Registration Successful!</h1>
            <p className="page-subtitle">
              Thank you for registering with LeGreen Guest Management System
            </p>
          </div>
        </div>

        {/* What's Next Section */}
        <div
          className="whats-next glass-card animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="section-title">
            <span className="title-icon">🎯</span>
            What's Next?
          </h2>

          <div className="grid grid-cols-3">
            <div className="next-step-card">
              <div className="step-icon room-icon">🏠</div>
              <h3 className="step-title">Room Assignment</h3>
              <p className="step-description">
                Room <strong>{formData?.nomorKamar || "N/A"}</strong> has been
                assigned for your stay
              </p>
            </div>

            <div className="next-step-card">
              <div className="step-icon checkin-icon">📅</div>
              <h3 className="step-title">Check-in Ready</h3>
              <p className="step-description">
                Your check-in is scheduled for{" "}
                <strong>
                  {formData?.tanggalWaktuCheckin
                    ? new Date(formData.tanggalWaktuCheckin).toLocaleDateString(
                        "en-GB",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "Not specified"}
                </strong>
              </p>
            </div>

            <div className="next-step-card">
              <div className="step-icon welcome-icon">🌟</div>
              <h3 className="step-title">Enjoy Your Stay</h3>
              <p className="step-description">
                Welcome to LeGreen! We hope you have a comfortable and pleasant
                stay with us.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className="contact-info glass-card animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="section-title">
            <span className="title-icon">📞</span>
            Contact Information
          </h2>

          <div className="grid grid-cols-4">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h4 className="contact-title">Address</h4>
                <p className="contact-text">LeGreen Office Suite B3-B9</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h4 className="contact-title">Phone</h4>
                <p className="contact-text">+62 21 1234 5678</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4 className="contact-title">Email</h4>
                <p className="contact-text">info@legreen.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🕐</div>
              <div className="contact-details">
                <h4 className="contact-title">Office Hours</h4>
                <p className="contact-text">
                  Mon-Fri: 8AM-6PM
                  <br />
                  Sat: 9AM-4PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Details */}
        <div
          className="registration-details glass-card animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="details-toggle-btn"
          >
            <h2 className="section-title">
              <span className="title-icon">📋</span>
              Registration Details
            </h2>
            <div className={`toggle-icon ${showDetails ? "rotated" : ""}`}>
              ↓
            </div>
          </button>

          {showDetails && (
            <div className="details-content animate-fadeIn">
              <div className="grid grid-cols-2">
                <div className="details-section">
                  <h3 className="details-title">Guest Information</h3>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">
                        {formData?.nama || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">
                        {formData?.lokasiLeGreen || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">
                        {formData?.alamatEmail || "Not provided"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">
                        {formData?.telephone || "N/A"}
                      </span>
                    </div>
                    {formData?.emergencyContactName && (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">
                            Emergency Contact:
                          </span>
                          <span className="detail-value">
                            {formData.emergencyContactName}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Emergency Phone:</span>
                          <span className="detail-value">
                            {formData.emergencyContactPhone}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="details-section">
                  <h3 className="details-title">Booking Information</h3>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">Check-in:</span>
                      <span className="detail-value">
                        {formData?.tanggalWaktuCheckin
                          ? new Date(
                              formData.tanggalWaktuCheckin
                            ).toLocaleDateString("en-GB")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Check-out:</span>
                      <span className="detail-value">
                        {formData?.tanggalWaktuCheckout
                          ? new Date(
                              formData.tanggalWaktuCheckout
                            ).toLocaleDateString("en-GB")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Room Number:</span>
                      <span className="detail-value">
                        {formData?.nomorKamar || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Number of Guests:</span>
                      <span className="detail-value">
                        {formData?.jumlahTamu || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Guest Receiver:</span>
                      <span className="detail-value">
                        {formData?.penerimaTamu || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className="success-actions animate-fadeInUp"
          style={{ animationDelay: "0.8s" }}
        >
          <button
            onClick={() => window.print()}
            className="btn btn-secondary btn-large"
          >
            <span>🖨️</span>
            Print Confirmation
          </button>

          <button onClick={onStartOver} className="btn btn-primary btn-large">
            <span>➕</span>
            New Registration
          </button>
        </div>
      </div>

      <style jsx>{`
        .success-page {
          min-height: 100vh;
          padding: var(--spacing-4);
        }

        @media (min-width: 768px) {
          .success-page {
            padding: var(--spacing-8);
          }
        }

        .success-header {
          text-align: center;
          margin-bottom: var(--spacing-8);
          padding: var(--spacing-8);
        }

        .header-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .success-icon {
          width: 6rem;
          height: 6rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-6);
          box-shadow: var(--shadow-legreen);
        }

        .checkmark {
          font-size: 3rem;
          color: var(--white);
          font-weight: 900;
        }

        .page-title {
          font-size: var(--font-size-5xl);
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: var(--spacing-4);
        }

        .page-subtitle {
          font-size: var(--font-size-xl);
          color: var(--gray-600);
          line-height: 1.6;
        }

        .whats-next,
        .contact-info,
        .registration-details {
          margin-bottom: var(--spacing-8);
          padding: var(--spacing-8);
        }

        .section-title {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: var(--spacing-6);
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .title-icon {
          font-size: 1.5em;
        }

        .next-step-card {
          padding: var(--spacing-6);
          background: linear-gradient(
            135deg,
            rgba(34, 197, 94, 0.05) 0%,
            rgba(34, 197, 94, 0.1) 100%
          );
          border: 2px solid rgba(34, 197, 94, 0.2);
          border-radius: var(--radius-xl);
          text-align: center;
          transition: all var(--transition-normal);
        }

        .next-step-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--legreen-primary);
        }

        .step-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-4);
          font-size: 1.5rem;
          transition: all var(--transition-normal);
        }

        .room-icon {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }

        .checkin-icon {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        }

        .welcome-icon {
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
        }

        .next-step-card:hover .step-icon {
          transform: scale(1.1);
        }

        .step-title {
          font-size: var(--font-size-lg);
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: var(--spacing-3);
        }

        .step-description {
          color: var(--gray-700);
          line-height: 1.5;
          font-size: var(--font-size-sm);
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-4);
          background: rgba(34, 197, 94, 0.05);
          border: 2px solid rgba(34, 197, 94, 0.15);
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
        }

        .contact-card:hover {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          transform: translateY(-2px);
        }

        .contact-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .contact-title {
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-1);
          font-size: var(--font-size-sm);
        }

        .contact-text {
          color: var(--gray-700);
          font-size: var(--font-size-xs);
          line-height: 1.4;
        }

        .details-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-4);
          background: rgba(34, 197, 94, 0.05);
          border: 2px solid rgba(34, 197, 94, 0.2);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .details-toggle-btn:hover {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
        }

        .toggle-icon {
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--legreen-primary);
          transition: transform var(--transition-normal);
        }

        .toggle-icon.rotated {
          transform: rotate(180deg);
        }

        .details-content {
          margin-top: var(--spacing-6);
          padding: var(--spacing-6);
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-lg);
        }

        .details-section {
          margin-bottom: var(--spacing-6);
        }

        .details-title {
          font-size: var(--font-size-lg);
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: var(--spacing-4);
          padding-bottom: var(--spacing-2);
          border-bottom: 2px solid var(--gray-300);
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-2) 0;
        }

        .detail-label {
          font-weight: 600;
          color: var(--gray-700);
          font-size: var(--font-size-sm);
        }

        .detail-value {
          color: var(--gray-900);
          font-size: var(--font-size-sm);
          text-align: right;
        }

        .success-actions {
          display: flex;
          gap: var(--spacing-4);
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .grid-cols-3,
          .grid-cols-4,
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }

          .success-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .page-title {
            font-size: var(--font-size-3xl);
          }

          .contact-card {
            flex-direction: column;
            text-align: center;
          }

          .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-1);
          }

          .detail-value {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
