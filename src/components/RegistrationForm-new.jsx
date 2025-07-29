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
            Guest Registration System
          </h2>
          <p className="text-legreen-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Complete the registration process in 2 simple steps
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div
              className={`flex items-center space-x-3 ${
                currentStep >= 1 ? "text-legreen-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= 1
                    ? currentStep > 1
                      ? "bg-legreen-500 text-white shadow-lg"
                      : "bg-legreen-500 text-white shadow-lg ring-4 ring-legreen-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > 1 ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  "1"
                )}
              </div>
              <span className="font-semibold">Officer Verification</span>
            </div>

            <div
              className={`flex-1 h-1 rounded transition-all duration-300 ${
                currentStep >= 2 ? "bg-legreen-500" : "bg-gray-300"
              }`}
            />

            <div
              className={`flex items-center space-x-3 ${
                currentStep >= 2 ? "text-legreen-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= 2
                    ? "bg-legreen-500 text-white shadow-lg ring-4 ring-legreen-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="font-semibold">Customer Information</span>
            </div>
          </div>
        </div>

        {/* Officer Step (Step 1) */}
        {currentStep === 1 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-legreen-200 p-8">
            <form
              onSubmit={officerForm.handleSubmit(handleOfficerSubmit)}
              className="space-y-8"
            >
              <div className="border-b border-legreen-200 pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-legreen-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    Step 1
                  </div>
                  <h3 className="text-2xl font-bold text-legreen-900">
                    Officer Verification
                  </h3>
                </div>
                <p className="text-legreen-700 text-lg">
                  Officer information for check-in and room assignment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="tanggalWaktuCheckin"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Tanggal Waktu Check-in{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="tanggalWaktuCheckin"
                    {...officerForm.register("tanggalWaktuCheckin")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      officerForm.formState.errors.tanggalWaktuCheckin
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                  />
                  {officerForm.formState.errors.tanggalWaktuCheckin && (
                    <p className="text-red-500 text-sm font-medium">
                      {officerForm.formState.errors.tanggalWaktuCheckin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="tanggalWaktuCheckout"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Tanggal Waktu Check-out{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="tanggalWaktuCheckout"
                    {...officerForm.register("tanggalWaktuCheckout")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      officerForm.formState.errors.tanggalWaktuCheckout
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                  />
                  {officerForm.formState.errors.tanggalWaktuCheckout && (
                    <p className="text-red-500 text-sm font-medium">
                      {
                        officerForm.formState.errors.tanggalWaktuCheckout
                          .message
                      }
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nomorKamar"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Nomor Kamar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nomorKamar"
                    {...officerForm.register("nomorKamar")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      officerForm.formState.errors.nomorKamar
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="Enter room number"
                  />
                  {officerForm.formState.errors.nomorKamar && (
                    <p className="text-red-500 text-sm font-medium">
                      {officerForm.formState.errors.nomorKamar.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="jumlahTamu"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Jumlah Tamu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="jumlahTamu"
                    min="1"
                    max="10"
                    {...officerForm.register("jumlahTamu", {
                      valueAsNumber: true,
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      officerForm.formState.errors.jumlahTamu
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="Number of guests"
                  />
                  {officerForm.formState.errors.jumlahTamu && (
                    <p className="text-red-500 text-sm font-medium">
                      {officerForm.formState.errors.jumlahTamu.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label
                    htmlFor="penerimaTamu"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Penerima Tamu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="penerimaTamu"
                    {...officerForm.register("penerimaTamu")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      officerForm.formState.errors.penerimaTamu
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="Enter guest receiver name"
                  />
                  {officerForm.formState.errors.penerimaTamu && (
                    <p className="text-red-500 text-sm font-medium">
                      {officerForm.formState.errors.penerimaTamu.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-legreen-200">
                <p className="text-sm text-legreen-600">
                  <span className="text-red-500">*</span> Required fields
                </p>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-legreen-500 to-legreen-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Continue to Customer Info</span>
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customer Step (Step 2) */}
        {currentStep === 2 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-legreen-200 p-8">
            <form
              onSubmit={customerForm.handleSubmit(handleCustomerSubmit)}
              className="space-y-8"
            >
              <div className="border-b border-legreen-200 pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-legreen-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    Step 2
                  </div>
                  <h3 className="text-2xl font-bold text-legreen-900">
                    Customer Information
                  </h3>
                </div>
                <p className="text-legreen-700 text-lg">
                  Please provide your personal information for registration
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="lokasiLeGreen"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Lokasi LeGreen (LeGreen Location){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lokasiLeGreen"
                    {...customerForm.register("lokasiLeGreen")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      customerForm.formState.errors.lokasiLeGreen
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="Enter LeGreen location"
                  />
                  {customerForm.formState.errors.lokasiLeGreen && (
                    <p className="text-red-500 text-sm font-medium">
                      {customerForm.formState.errors.lokasiLeGreen.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nama"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Nama (Sesuai KTP/Passport){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    {...customerForm.register("nama")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      customerForm.formState.errors.nama
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="Enter name as per ID/Passport"
                  />
                  {customerForm.formState.errors.nama && (
                    <p className="text-red-500 text-sm font-medium">
                      {customerForm.formState.errors.nama.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="alamatEmail"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Alamat Email (Email Address){" "}
                    <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="alamatEmail"
                    {...customerForm.register("alamatEmail")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      customerForm.formState.errors.alamatEmail
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="Enter email address"
                  />
                  {customerForm.formState.errors.alamatEmail && (
                    <p className="text-red-500 text-sm font-medium">
                      {customerForm.formState.errors.alamatEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-semibold text-legreen-900"
                  >
                    Telephone Mobile/Rumah/Kantor{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    {...customerForm.register("telephone")}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legreen-500 focus:border-legreen-500 ${
                      customerForm.formState.errors.telephone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-legreen-300"
                    }`}
                    placeholder="08xxxxxxxxxx or 628xxxxxxxxxx"
                  />
                  {customerForm.formState.errors.telephone && (
                    <p className="text-red-500 text-sm font-medium">
                      {customerForm.formState.errors.telephone.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-legreen-50 rounded-lg border border-legreen-200">
                    <input
                      type="checkbox"
                      id="needEmergencyContact"
                      {...customerForm.register("needEmergencyContact")}
                      className="w-5 h-5 text-legreen-600 border-gray-300 rounded focus:ring-legreen-500"
                    />
                    <label
                      htmlFor="needEmergencyContact"
                      className="text-sm font-semibold text-legreen-900"
                    >
                      Emergency Contact Required
                    </label>
                  </div>

                  {watchEmergencyContact && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="space-y-2">
                        <label
                          htmlFor="emergencyContactName"
                          className="block text-sm font-semibold text-amber-900"
                        >
                          Emergency Contact Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="emergencyContactName"
                          {...customerForm.register("emergencyContactName")}
                          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            customerForm.formState.errors.emergencyContactName
                              ? "border-red-500 bg-red-50"
                              : "border-amber-300 hover:border-amber-400"
                          }`}
                          placeholder="Enter emergency contact name"
                        />
                        {customerForm.formState.errors.emergencyContactName && (
                          <p className="text-red-500 text-sm font-medium">
                            {
                              customerForm.formState.errors.emergencyContactName
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="emergencyContactPhone"
                          className="block text-sm font-semibold text-amber-900"
                        >
                          Emergency Contact Phone{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="emergencyContactPhone"
                          {...customerForm.register("emergencyContactPhone")}
                          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            customerForm.formState.errors.emergencyContactPhone
                              ? "border-red-500 bg-red-50"
                              : "border-amber-300 hover:border-amber-400"
                          }`}
                          placeholder="08xxxxxxxxxx or 628xxxxxxxxxx"
                        />
                        {customerForm.formState.errors
                          .emergencyContactPhone && (
                          <p className="text-red-500 text-sm font-medium">
                            {
                              customerForm.formState.errors
                                .emergencyContactPhone.message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-legreen-200">
                <button
                  type="button"
                  onClick={goBackToOfficerStep}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 17l-5-5m0 0l5-5m-5 5h12"
                    />
                  </svg>
                  <span>Back to Officer Info</span>
                </button>

                <div className="flex items-center space-x-4">
                  <p className="text-sm text-legreen-600">
                    <span className="text-red-500">*</span> Required fields
                  </p>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-legreen-500 to-legreen-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Complete Registration</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
