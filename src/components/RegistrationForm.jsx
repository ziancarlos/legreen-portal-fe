import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  customerSchema,
  officerSchema,
  completeFormSchema,
} from "../schemas/formSchema.js";

const RegistrationForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Officer, 2 = Customer
  const [officerData, setOfficerData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Officer form (Step 1)
  const officerForm = useForm({
    resolver: zodResolver(officerSchema),
    mode: "onChange", // Enable real-time validation
    reValidateMode: "onChange",
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
    mode: "onChange", // Enable real-time validation
    reValidateMode: "onChange",
    defaultValues: {
      lokasiLeGreen: "",
      nama: "",
      alamatEmail: "",
      telephone: "",
      darimanaAndaMengetahuiKami: "",
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

  const handleCustomerSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log("Customer data:", data);
      const completeData = { ...officerData, ...data };
      console.log("Complete data:", completeData);

      // Transform data to match API format
      const apiPayload = {
        check_in_datetime: Math.floor(
          new Date(completeData.tanggalWaktuCheckin).getTime() / 1000
        ),
        check_out_datetime: Math.floor(
          new Date(completeData.tanggalWaktuCheckout).getTime() / 1000
        ),
        email: completeData.alamatEmail || "",
        legreen_location: completeData.lokasiLeGreen,
        name: completeData.nama,
        occupancy_amount: completeData.jumlahTamu,
        reception_officer: completeData.penerimaTamu,
        room_number: parseInt(completeData.nomorKamar),
        telephone: completeData.telephone,
        submission_source: completeData.darimanaAndaMengetahuiKami,
      };

      // Add emergency contact if provided
      if (
        completeData.needEmergencyContact &&
        completeData.emergencyContactName
      ) {
        apiPayload.emergency_name = completeData.emergencyContactName;
        apiPayload.emergency_telephone = completeData.emergencyContactPhone;
      }

      console.log("API Payload:", apiPayload);

      // Submit to API
      const response = await axios.post(
        "https://api-oos.jojonomic.com/14/legreen/form-submission",
        apiPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      // Check if submission was successful
      if (
        response.data &&
        !response.data.error &&
        response.data.status_code === 201
      ) {
        // Success - navigate to success page
        onSubmit(completeData);
      } else {
        console.log(response);
        const message = response.data?.message;

        if (typeof message === "object" && message !== null) {
          // If message is an object, loop through and create multiple error messages
          const errorMessages = [];
          for (const [key, value] of Object.entries(message)) {
            if (Array.isArray(value)) {
              // If value is an array, join the messages
              errorMessages.push(value.join(", "));
            } else {
              errorMessages.push(value);
            }
          }
          setSubmitError(errorMessages.join("\n"));
        } else {
          setSubmitError(
            typeof message === "string"
              ? message
              : "Unexpected response from server"
          );
        }
      }
    } catch (error) {
      console.error("Submission error:", error);

      if (error.response && error.response.data) {
        // API returned an error response
        const errorMessage = error.response.data.message;

        if (typeof errorMessage === "object" && errorMessage !== null) {
          // If message is an object, loop through and create multiple error messages
          const errorMessages = [];
          for (const [key, value] of Object.entries(errorMessage)) {
            if (Array.isArray(value)) {
              // If value is an array, join the messages
              errorMessages.push(value.join(", "));
            } else {
              errorMessages.push(value);
            }
          }
          setSubmitError(errorMessages.join("\n"));
        } else {
          setSubmitError(
            typeof errorMessage === "string"
              ? errorMessage
              : "Submission failed"
          );
        }
      } else if (error.request) {
        // Request was made but no response received
        setSubmitError(
          "Network error - please check your connection and try again"
        );
      } else {
        // Something else happened
        setSubmitError("An unexpected error occurred - please try again");
      }
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="brand-section">
              <div className="legreen-logo">
                <span className="logo-icon">🌿</span>
                <span className="logo-text">LeGreen</span>
              </div>
              <div className="company-tagline">
                Premium Hospitality Experience
              </div>
            </div>

            <div className="header-main">
              <h1 className="page-title">Guest Registration Portal</h1>
              <p className="page-subtitle">
                Streamlined check-in process designed for your convenience
              </p>
            </div>

            {/* Step indicator */}
            <div className="step-indicator">
              <div className="step-container">
                <div
                  className={`step ${currentStep >= 1 ? "active" : ""} ${
                    currentStep > 1 ? "completed" : ""
                  }`}
                >
                  <div className="step-number">
                    {currentStep > 1 ? "✓" : "1"}
                  </div>
                  <div className="step-content">
                    <span className="step-label">Officer Verification</span>
                    <span className="step-desc">Room & booking details</span>
                  </div>
                </div>

                <div
                  className={`step-line ${currentStep >= 2 ? "active" : ""}`}
                ></div>

                <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <span className="step-label">Guest Information</span>
                    <span className="step-desc">
                      Personal & contact details
                    </span>
                  </div>
                </div>
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
                <div className="grid grid-responsive-2">
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
                          : officerForm.formState.dirtyFields
                              .tanggalWaktuCheckin &&
                            !officerForm.formState.errors.tanggalWaktuCheckin
                          ? "valid"
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
                          : officerForm.formState.dirtyFields
                              .tanggalWaktuCheckout &&
                            !officerForm.formState.errors.tanggalWaktuCheckout
                          ? "valid"
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
                        officerForm.formState.errors.nomorKamar
                          ? "error"
                          : officerForm.formState.dirtyFields.nomorKamar &&
                            !officerForm.formState.errors.nomorKamar
                          ? "valid"
                          : ""
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
                        officerForm.formState.errors.jumlahTamu
                          ? "error"
                          : officerForm.formState.dirtyFields.jumlahTamu &&
                            !officerForm.formState.errors.jumlahTamu
                          ? "valid"
                          : ""
                      }`}
                      placeholder="Number of guests"
                    />
                    {officerForm.formState.errors.jumlahTamu && (
                      <div className="form-error">
                        ⚠️ {officerForm.formState.errors.jumlahTamu.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group form-group-full">
                    <label htmlFor="penerimaTamu" className="form-label">
                      Penerima Tamu <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="penerimaTamu"
                      {...officerForm.register("penerimaTamu")}
                      className={`form-input ${
                        officerForm.formState.errors.penerimaTamu
                          ? "error"
                          : officerForm.formState.dirtyFields.penerimaTamu &&
                            !officerForm.formState.errors.penerimaTamu
                          ? "valid"
                          : ""
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

              {/* Error Alert */}
              {submitError && (
                <div className="error-alert animate-fadeInUp">
                  <div className="error-icon">⚠️</div>
                  <div className="error-content">
                    <div className="error-title">Submission Failed</div>
                    <div className="error-message">
                      {submitError.split("\n").map((line, index) => (
                        <div key={index} style={{ marginBottom: "4px" }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitError("")}
                    className="error-close"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="form-content">
                <div className="grid grid-responsive-2">
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
                          : customerForm.formState.dirtyFields.lokasiLeGreen &&
                            !customerForm.formState.errors.lokasiLeGreen
                          ? "valid"
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
                        customerForm.formState.errors.nama
                          ? "error"
                          : customerForm.formState.dirtyFields.nama &&
                            !customerForm.formState.errors.nama
                          ? "valid"
                          : ""
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
                        customerForm.formState.errors.alamatEmail
                          ? "error"
                          : customerForm.formState.dirtyFields.alamatEmail &&
                            !customerForm.formState.errors.alamatEmail
                          ? "valid"
                          : ""
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
                        customerForm.formState.errors.telephone
                          ? "error"
                          : customerForm.formState.dirtyFields.telephone &&
                            !customerForm.formState.errors.telephone
                          ? "valid"
                          : ""
                      }`}
                      placeholder="08xxxxxxxxxx or 628xxxxxxxxxx"
                    />
                    {customerForm.formState.errors.telephone && (
                      <div className="form-error">
                        ⚠️ {customerForm.formState.errors.telephone.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="darimanaAndaMengetahuiKami"
                      className="form-label"
                    >
                      Darimana anda mengetahui kami?{" "}
                      <span className="text-red">*</span>
                    </label>
                    <select
                      id="darimanaAndaMengetahuiKami"
                      {...customerForm.register("darimanaAndaMengetahuiKami")}
                      className={`form-select ${
                        customerForm.formState.errors.darimanaAndaMengetahuiKami
                          ? "error"
                          : customerForm.formState.dirtyFields
                              .darimanaAndaMengetahuiKami &&
                            !customerForm.formState.errors
                              .darimanaAndaMengetahuiKami
                          ? "valid"
                          : ""
                      }`}
                    >
                      <option value="">-- Pilih salah satu --</option>
                      <option value="Internet/OTA">Internet/OTA</option>
                      <option value="Datang Langsung">Datang Langsung</option>
                      <option value="Rekomendasi">Rekomendasi</option>
                    </select>
                    {customerForm.formState.errors
                      .darimanaAndaMengetahuiKami && (
                      <div className="form-error">
                        ⚠️{" "}
                        {
                          customerForm.formState.errors
                            .darimanaAndaMengetahuiKami.message
                        }
                      </div>
                    )}
                  </div>

                  <div className="form-group form-group-full">
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
                        <div className="grid grid-responsive-2">
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
                                  : customerForm.formState.dirtyFields
                                      .emergencyContactName &&
                                    !customerForm.formState.errors
                                      .emergencyContactName
                                  ? "valid"
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
                                  : customerForm.formState.dirtyFields
                                      .emergencyContactPhone &&
                                    !customerForm.formState.errors
                                      .emergencyContactPhone
                                  ? "valid"
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner">⟳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <span>✓</span>
                      </>
                    )}
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
          background: linear-gradient(
            135deg,
            rgba(34, 197, 94, 0.05) 0%,
            rgba(16, 163, 74, 0.1) 100%
          );
          border: 1px solid rgba(34, 197, 94, 0.1);
        }

        .brand-section {
          margin-bottom: var(--spacing-6);
        }

        .legreen-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-2);
          padding: var(--spacing-3) var(--spacing-6);
          background: rgba(255, 255, 255, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .logo-icon {
          font-size: 2rem;
          filter: drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3));
        }

        .logo-text {
          font-size: var(--font-size-3xl);
          font-weight: 800;
          color: var(--legreen-primary);
          letter-spacing: -0.02em;
          text-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
        }

        .company-tagline {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 2px solid var(--legreen-primary);
          display: inline-block;
          padding-bottom: var(--spacing-1);
        }

        .header-main {
          margin-bottom: var(--spacing-8);
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
          line-height: 1.1;
          letter-spacing: -0.02em;
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
          font-weight: 400;
        }

        .step-indicator {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .step-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-4);
          max-width: 600px;
          margin: 0 auto;
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

        .step-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--spacing-1);
        }

        .step-desc {
          font-size: var(--font-size-xs);
          color: var(--gray-500);
          font-weight: 400;
        }

        .step.active .step-desc,
        .step.completed .step-desc {
          color: var(--legreen-secondary);
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

        .form-group-full {
          grid-column: 1 / -1;
        }

        .error-alert {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.1) 0%,
            rgba(220, 38, 38, 0.15) 100%
          );
          border: 2px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          margin-bottom: var(--spacing-6);
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-3);
          position: relative;
        }

        .error-icon {
          font-size: var(--font-size-xl);
          color: #ef4444;
          flex-shrink: 0;
        }

        .error-content {
          flex: 1;
        }

        .error-title {
          font-weight: 700;
          color: #dc2626;
          margin-bottom: var(--spacing-1);
          font-size: var(--font-size-base);
        }

        .error-message {
          color: #b91c1c;
          font-size: var(--font-size-sm);
          line-height: 1.5;
        }

        .error-close {
          background: none;
          border: none;
          color: #ef4444;
          font-size: var(--font-size-lg);
          cursor: pointer;
          padding: var(--spacing-1);
          border-radius: var(--radius-sm);
          transition: all var(--transition-normal);
          flex-shrink: 0;
        }

        .error-close:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }

        .loading-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
          margin-right: var(--spacing-2);
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn:disabled:hover {
          transform: none;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }

        @media (max-width: 768px) {
          .grid-responsive-2 {
            grid-template-columns: 1fr;
            gap: var(--spacing-4);
          }

          /* Enhanced datetime-local input responsiveness */
          input[type="datetime-local"] {
            padding: var(--spacing-3);
            font-size: var(--font-size-base);
            width: 100%;
            min-width: 0;
            -webkit-appearance: none;
            -moz-appearance: textfield;
          }

          /* Webkit-specific fixes for datetime inputs */
          input[type="datetime-local"]::-webkit-datetime-edit {
            display: block;
            width: 100%;
            padding: 0;
          }

          input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper {
            padding: 0;
            display: flex;
            flex-wrap: wrap;
          }

          input[type="datetime-local"]::-webkit-datetime-edit-text {
            color: var(--gray-600);
            padding: 0 2px;
          }

          input[type="datetime-local"]::-webkit-datetime-edit-month-field,
          input[type="datetime-local"]::-webkit-datetime-edit-day-field,
          input[type="datetime-local"]::-webkit-datetime-edit-year-field,
          input[type="datetime-local"]::-webkit-datetime-edit-hour-field,
          input[type="datetime-local"]::-webkit-datetime-edit-minute-field {
            padding: 0 2px;
            border: none;
            background: transparent;
            color: var(--gray-900);
          }

          .form-group-full {
            grid-column: 1;
          }

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

          .step-container {
            flex-direction: column;
            gap: var(--spacing-4);
          }

          .step-line {
            width: 2px;
            height: 30px;
            min-width: auto;
          }

          .step-content {
            align-items: center;
            text-align: center;
          }

          .step-label {
            font-size: var(--font-size-sm);
          }

          .step-desc {
            display: none;
          }

          .page-title {
            font-size: var(--font-size-3xl);
          }

          .logo-text {
            font-size: var(--font-size-2xl);
          }

          .logo-icon {
            font-size: 1.5rem;
          }

          .form-container {
            padding: var(--spacing-4);
            margin: 0 var(--spacing-2) var(--spacing-6);
          }

          .registration-header {
            padding: var(--spacing-6) var(--spacing-4);
            margin: 0 var(--spacing-2) var(--spacing-6);
          }

          .registration-page {
            padding: var(--spacing-2);
          }

          .header-content {
            padding: 0;
          }

          .form-header {
            margin-bottom: var(--spacing-6);
            padding-bottom: var(--spacing-4);
          }

          .form-title {
            font-size: var(--font-size-xl);
          }

          .form-description {
            font-size: var(--font-size-base);
          }

          .emergency-section {
            margin-top: var(--spacing-4);
            padding: var(--spacing-4);
          }

          .page-subtitle {
            font-size: var(--font-size-base);
            padding: 0 var(--spacing-2);
          }

          .step-indicator {
            padding: var(--spacing-4);
          }
        }

        @media (max-width: 480px) {
          .step-number {
            width: 2rem;
            height: 2rem;
            font-size: var(--font-size-xs);
          }

          .btn-large {
            padding: var(--spacing-3) var(--spacing-4);
            font-size: var(--font-size-base);
          }

          .form-input {
            padding: var(--spacing-3);
            font-size: var(--font-size-base);
          }

          /* Ultra-responsive datetime-local for very small screens */
          input[type="datetime-local"] {
            padding: var(--spacing-2) var(--spacing-3);
            font-size: var(--font-size-sm);
            width: 100%;
            min-width: 0;
            overflow: hidden;
          }

          /* Additional webkit fixes for tiny screens */
          input[type="datetime-local"]::-webkit-datetime-edit {
            min-height: 1.5rem;
            display: flex;
            align-items: center;
            width: 100%;
          }

          input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 1px;
          }

          .form-label {
            font-size: var(--font-size-sm);
            margin-bottom: var(--spacing-2);
          }

          .legreen-logo {
            padding: var(--spacing-3) var(--spacing-6);
            font-size: var(--font-size-xl);
          }

          .page-title {
            font-size: var(--font-size-2xl);
          }

          .page-subtitle {
            font-size: var(--font-size-sm);
          }

          .form-container {
            padding: var(--spacing-3);
            margin: 0 var(--spacing-1) var(--spacing-4);
          }

          .registration-header {
            padding: var(--spacing-4) var(--spacing-3);
            margin: 0 var(--spacing-1) var(--spacing-4);
          }

          .form-content {
            margin-bottom: var(--spacing-6);
          }

          .grid-responsive-2 {
            gap: var(--spacing-3);
          }

          .step-badge {
            padding: var(--spacing-1) var(--spacing-3);
            font-size: var(--font-size-xs);
          }

          .form-error {
            font-size: var(--font-size-xs);
          }

          .emergency-section {
            padding: var(--spacing-3);
          }

          .form-footer {
            padding-top: var(--spacing-4);
            gap: var(--spacing-3);
          }

          .step-indicator {
            margin: var(--spacing-4) 0;
          }

          .error-alert {
            flex-direction: column;
            gap: var(--spacing-2);
            padding: var(--spacing-3);
          }

          .error-close {
            align-self: flex-end;
            position: absolute;
            top: var(--spacing-2);
            right: var(--spacing-2);
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
