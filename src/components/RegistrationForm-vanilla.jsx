import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerSchema,
  officerSchema,
  completeFormSchema,
} from "../schemas/formSchema.js";

const RegistrationForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Officer, 2 = Customer
  const [officerData, setOfficerData] = useState(null);

  // Officer form (Step 1)
  const officerForm = useForm({
    resolver: zodResolver(officerSchema),
    defaultValues: {
      tanggalWaktuCheckin: "",
      tanggalWaktuCheckout: "",
      nomorKamar: "",
      jumlahTamu: 1,
      penerimaTamu: "",
    },
  });

  // Customer form (Step 2)
  const customerForm = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      lokasiLeGreen: "",
      nama: "",
      alamatEmail: "",
      telephone: "",
      needEmergencyContact: false,
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  const watchEmergencyContact = customerForm.watch("needEmergencyContact");

  const handleOfficerSubmit = (data) => {
    console.log("Officer data:", data);
    setOfficerData(data);
    setCurrentStep(2);
  };

  const handleCustomerSubmit = (data) => {
    console.log("Customer data:", data);
    const completeData = { ...officerData, ...data };
    console.log("Complete data:", completeData);
    onSubmit(completeData);
  };

  const goBackToOfficerStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="registration-page">
      <div className="container">
        {/* Header */}
        <div className="registration-header glass-card animate-fadeInUp">
          <div className="header-content">
            <div className="legreen-logo mb-6">LeGreen</div>
            <h1 className="page-title">Guest Registration System</h1>
            <p className="page-subtitle">
              Complete the registration process in 2 simple steps
            </p>

            {/* Step indicator */}
            <div className="step-indicator">
              <div
                className={`step ${currentStep >= 1 ? "active" : ""} ${
                  currentStep > 1 ? "completed" : ""
                }`}
              >
                <div className="step-number">{currentStep > 1 ? "✓" : "1"}</div>
                <span className="step-label">Officer Verification</span>
              </div>

              <div
                className={`step-line ${currentStep >= 2 ? "active" : ""}`}
              ></div>

              <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                <div className="step-number">2</div>
                <span className="step-label">Customer Information</span>
              </div>
            </div>
          </div>
        </div>

        {/* Officer Step (Step 1) */}
        {currentStep === 1 && (
          <div
            className="form-container glass-card animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <form
              onSubmit={officerForm.handleSubmit(handleOfficerSubmit)}
              className="registration-form"
            >
              <div className="form-header">
                <div className="step-badge">Step 1</div>
                <h2 className="form-title">Officer Verification</h2>
                <p className="form-description">
                  Officer information for check-in and room assignment
                </p>
              </div>

              <div className="form-content">
                <div className="grid grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="tanggalWaktuCheckin" className="form-label">
                      Tanggal Waktu Check-in <span className="text-red">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="tanggalWaktuCheckin"
                      {...officerForm.register("tanggalWaktuCheckin")}
                      className={`form-input ${
                        officerForm.formState.errors.tanggalWaktuCheckin
                          ? "error"
                          : ""
                      }`}
                    />
                    {officerForm.formState.errors.tanggalWaktuCheckin && (
                      <div className="form-error">
                        ⚠️{" "}
                        {
                          officerForm.formState.errors.tanggalWaktuCheckin
                            .message
                        }
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="tanggalWaktuCheckout"
                      className="form-label"
                    >
                      Tanggal Waktu Check-out{" "}
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="tanggalWaktuCheckout"
                      {...officerForm.register("tanggalWaktuCheckout")}
                      className={`form-input ${
                        officerForm.formState.errors.tanggalWaktuCheckout
                          ? "error"
                          : ""
                      }`}
                    />
                    {officerForm.formState.errors.tanggalWaktuCheckout && (
                      <div className="form-error">
                        ⚠️{" "}
                        {
                          officerForm.formState.errors.tanggalWaktuCheckout
                            .message
                        }
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="nomorKamar" className="form-label">
                      Nomor Kamar <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="nomorKamar"
                      {...officerForm.register("nomorKamar")}
                      className={`form-input ${
                        officerForm.formState.errors.nomorKamar ? "error" : ""
                      }`}
                      placeholder="Enter room number"
                    />
                    {officerForm.formState.errors.nomorKamar && (
                      <div className="form-error">
                        ⚠️ {officerForm.formState.errors.nomorKamar.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="jumlahTamu" className="form-label">
                      Jumlah Tamu <span className="text-red">*</span>
                    </label>
                    <input
                      type="number"
                      id="jumlahTamu"
                      min="1"
                      max="10"
                      {...officerForm.register("jumlahTamu", {
                        valueAsNumber: true,
                      })}
                      className={`form-input ${
                        officerForm.formState.errors.jumlahTamu ? "error" : ""
                      }`}
                      placeholder="Number of guests"
                    />
                    {officerForm.formState.errors.jumlahTamu && (
                      <div className="form-error">
                        ⚠️ {officerForm.formState.errors.jumlahTamu.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label htmlFor="penerimaTamu" className="form-label">
                      Penerima Tamu <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="penerimaTamu"
                      {...officerForm.register("penerimaTamu")}
                      className={`form-input ${
                        officerForm.formState.errors.penerimaTamu ? "error" : ""
                      }`}
                      placeholder="Enter guest receiver name"
                    />
                    {officerForm.formState.errors.penerimaTamu && (
                      <div className="form-error">
                        ⚠️ {officerForm.formState.errors.penerimaTamu.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <div className="form-note">
                  <span className="text-red">*</span> Required fields
                </div>
                <button type="submit" className="btn btn-primary btn-large">
                  Continue to Customer Info
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customer Step (Step 2) */}
        {currentStep === 2 && (
          <div
            className="form-container glass-card animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <form
              onSubmit={customerForm.handleSubmit(handleCustomerSubmit)}
              className="registration-form"
            >
              <div className="form-header">
                <div className="step-badge">Step 2</div>
                <h2 className="form-title">Customer Information</h2>
                <p className="form-description">
                  Please provide your personal information for registration
                </p>
              </div>

              <div className="form-content">
                <div className="grid grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="lokasiLeGreen" className="form-label">
                      Lokasi LeGreen (LeGreen Location){" "}
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="lokasiLeGreen"
                      {...customerForm.register("lokasiLeGreen")}
                      className={`form-input ${
                        customerForm.formState.errors.lokasiLeGreen
                          ? "error"
                          : ""
                      }`}
                      placeholder="Enter LeGreen location"
                    />
                    {customerForm.formState.errors.lokasiLeGreen && (
                      <div className="form-error">
                        ⚠️ {customerForm.formState.errors.lokasiLeGreen.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="nama" className="form-label">
                      Nama (Sesuai KTP/Passport){" "}
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      {...customerForm.register("nama")}
                      className={`form-input ${
                        customerForm.formState.errors.nama ? "error" : ""
                      }`}
                      placeholder="Enter name as per ID/Passport"
                    />
                    {customerForm.formState.errors.nama && (
                      <div className="form-error">
                        ⚠️ {customerForm.formState.errors.nama.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="alamatEmail" className="form-label">
                      Alamat Email (Email Address){" "}
                      <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="alamatEmail"
                      {...customerForm.register("alamatEmail")}
                      className={`form-input ${
                        customerForm.formState.errors.alamatEmail ? "error" : ""
                      }`}
                      placeholder="Enter email address"
                    />
                    {customerForm.formState.errors.alamatEmail && (
                      <div className="form-error">
                        ⚠️ {customerForm.formState.errors.alamatEmail.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="telephone" className="form-label">
                      Telephone Mobile/Rumah/Kantor{" "}
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      {...customerForm.register("telephone")}
                      className={`form-input ${
                        customerForm.formState.errors.telephone ? "error" : ""
                      }`}
                      placeholder="08xxxxxxxxxx or 628xxxxxxxxxx"
                    />
                    {customerForm.formState.errors.telephone && (
                      <div className="form-error">
                        ⚠️ {customerForm.formState.errors.telephone.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        id="needEmergencyContact"
                        {...customerForm.register("needEmergencyContact")}
                      />
                      <label
                        htmlFor="needEmergencyContact"
                        className="font-semibold"
                      >
                        Emergency Contact Required
                      </label>
                    </div>

                    {watchEmergencyContact && (
                      <div className="emergency-section">
                        <div className="grid grid-cols-2">
                          <div className="form-group">
                            <label
                              htmlFor="emergencyContactName"
                              className="form-label"
                            >
                              Emergency Contact Name{" "}
                              <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              id="emergencyContactName"
                              {...customerForm.register("emergencyContactName")}
                              className={`form-input ${
                                customerForm.formState.errors
                                  .emergencyContactName
                                  ? "error"
                                  : ""
                              }`}
                              placeholder="Enter emergency contact name"
                            />
                            {customerForm.formState.errors
                              .emergencyContactName && (
                              <div className="form-error">
                                ⚠️{" "}
                                {
                                  customerForm.formState.errors
                                    .emergencyContactName.message
                                }
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <label
                              htmlFor="emergencyContactPhone"
                              className="form-label"
                            >
                              Emergency Contact Phone{" "}
                              <span className="text-red">*</span>
                            </label>
                            <input
                              type="tel"
                              id="emergencyContactPhone"
                              {...customerForm.register(
                                "emergencyContactPhone"
                              )}
                              className={`form-input ${
                                customerForm.formState.errors
                                  .emergencyContactPhone
                                  ? "error"
                                  : ""
                              }`}
                              placeholder="08xxxxxxxxxx or 628xxxxxxxxxx"
                            />
                            {customerForm.formState.errors
                              .emergencyContactPhone && (
                              <div className="form-error">
                                ⚠️{" "}
                                {
                                  customerForm.formState.errors
                                    .emergencyContactPhone.message
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <button
                  type="button"
                  onClick={goBackToOfficerStep}
                  className="btn btn-secondary"
                >
                  <span>←</span>
                  Back to Officer Info
                </button>

                <div className="footer-right">
                  <div className="form-note">
                    <span className="text-red">*</span> Required fields
                  </div>
                  <button type="submit" className="btn btn-primary btn-large">
                    Complete Registration
                    <span>✓</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .registration-page {
          min-height: 100vh;
          padding: var(--spacing-4);
        }

        @media (min-width: 768px) {
          .registration-page {
            padding: var(--spacing-8);
          }
        }

        .registration-header {
          text-align: center;
          margin-bottom: var(--spacing-8);
          padding: var(--spacing-8);
        }

        .header-content {
          max-width: 800px;
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
          margin-bottom: var(--spacing-8);
        }

        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-4);
          margin-top: var(--spacing-8);
        }

        .step {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          color: var(--gray-400);
          font-weight: 600;
          transition: all var(--transition-normal);
        }

        .step.active {
          color: var(--legreen-primary);
        }

        .step.completed {
          color: var(--legreen-primary);
        }

        .step-number {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: var(--gray-200);
          color: var(--gray-500);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transition: all var(--transition-normal);
        }

        .step.active .step-number {
          background: var(--legreen-primary);
          color: var(--white);
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
        }

        .step.completed .step-number {
          background: var(--legreen-primary);
          color: var(--white);
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: var(--gray-200);
          transition: all var(--transition-normal);
          min-width: 100px;
        }

        .step-line.active {
          background: var(--legreen-primary);
        }

        .step-label {
          font-size: var(--font-size-sm);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .step-label {
            display: none;
          }

          .step-line {
            min-width: 50px;
          }
        }

        .form-container {
          margin-bottom: var(--spacing-8);
          padding: var(--spacing-8);
        }

        .form-header {
          text-align: center;
          margin-bottom: var(--spacing-8);
          padding-bottom: var(--spacing-6);
          border-bottom: 2px solid var(--gray-100);
        }

        .step-badge {
          background: var(--legreen-primary);
          color: var(--white);
          padding: var(--spacing-2) var(--spacing-4);
          border-radius: var(--radius-lg);
          font-weight: 700;
          font-size: var(--font-size-sm);
          display: inline-block;
          margin-bottom: var(--spacing-4);
        }

        .form-title {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: var(--spacing-3);
        }

        .form-description {
          font-size: var(--font-size-lg);
          color: var(--gray-600);
          line-height: 1.6;
        }

        .form-content {
          margin-bottom: var(--spacing-8);
        }

        .emergency-section {
          margin-top: var(--spacing-6);
          padding: var(--spacing-6);
          background: rgba(251, 191, 36, 0.05);
          border: 2px solid rgba(251, 191, 36, 0.2);
          border-radius: var(--radius-lg);
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-6);
          border-top: 2px solid var(--gray-100);
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
        }

        .form-note {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
        }

        @media (max-width: 768px) {
          .form-footer {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
          }

          .footer-right {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-3);
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
