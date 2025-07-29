import { useState } from "react";

const SuccessPage = ({ formData, onStartOver }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-legreen-50 via-legreen-100 to-legreen-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-legreen-200">
          <div className="mb-6">
            {/* Animated Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-legreen-500 rounded-full mb-6 animate-pulse">
              <svg
                className="w-12 h-12 text-white"
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

            <div className="inline-block bg-gradient-to-r from-legreen-600 to-legreen-700 text-white px-8 py-4 rounded-2xl font-bold text-2xl tracking-wider shadow-lg mb-4">
              LeGreen
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-legreen-900 mb-4">
            Registration Successful!
          </h1>
          <p className="text-legreen-700 text-xl max-w-2xl mx-auto leading-relaxed">
            Thank you for registering with LeGreen Guest Management System
          </p>
        </div>

        {/* What's Next Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-legreen-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-legreen-900 mb-6 flex items-center">
            <svg
              className="w-8 h-8 text-legreen-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            What's Next?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-legreen-50 to-legreen-100 p-6 rounded-xl border border-legreen-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-legreen-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="text-lg font-bold text-legreen-900">
                  Room Assignment
                </h4>
              </div>
              <p className="text-legreen-700">
                Room <strong>{formData?.nomorKamar || "N/A"}</strong> has been
                assigned for your stay
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="text-lg font-bold text-blue-900">
                  Check-in Ready
                </h4>
              </div>
              <p className="text-blue-700">
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

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="text-lg font-bold text-purple-900">
                  Enjoy Your Stay
                </h4>
              </div>
              <p className="text-purple-700">
                Welcome to LeGreen! We hope you have a comfortable and pleasant
                stay with us.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-legreen-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-legreen-900 mb-6 flex items-center">
            <svg
              className="w-8 h-8 text-legreen-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-legreen-50 rounded-lg border border-legreen-200">
              <div className="text-2xl">📍</div>
              <div>
                <p className="font-semibold text-legreen-900">Address</p>
                <p className="text-legreen-700 text-sm">
                  LeGreen Office Suite B3-B9
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-legreen-50 rounded-lg border border-legreen-200">
              <div className="text-2xl">📞</div>
              <div>
                <p className="font-semibold text-legreen-900">Phone</p>
                <p className="text-legreen-700 text-sm">+62 21 1234 5678</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-legreen-50 rounded-lg border border-legreen-200">
              <div className="text-2xl">📧</div>
              <div>
                <p className="font-semibold text-legreen-900">Email</p>
                <p className="text-legreen-700 text-sm">info@legreen.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-legreen-50 rounded-lg border border-legreen-200">
              <div className="text-2xl">🕐</div>
              <div>
                <p className="font-semibold text-legreen-900">Office Hours</p>
                <p className="text-legreen-700 text-sm">
                  Mon-Fri: 8AM-6PM
                  <br />
                  Sat: 9AM-4PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Details */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-legreen-200 p-8 mb-8">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between p-4 bg-legreen-50 hover:bg-legreen-100 rounded-lg border border-legreen-200 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-legreen-900 flex items-center">
              <svg
                className="w-6 h-6 text-legreen-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Registration Details
            </h3>
            <svg
              className={`w-6 h-6 text-legreen-500 transition-transform duration-300 ${
                showDetails ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showDetails && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2">
                  Guest Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-gray-900">
                      {formData?.nama || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>
                    <span className="text-gray-900">
                      {formData?.lokasiLeGreen || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-900">
                      {formData?.alamatEmail || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-gray-900">
                      {formData?.telephone || "N/A"}
                    </span>
                  </div>
                  {formData?.emergencyContactName && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Emergency Contact:
                        </span>
                        <span className="text-gray-900">
                          {formData.emergencyContactName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Emergency Phone:
                        </span>
                        <span className="text-gray-900">
                          {formData.emergencyContactPhone}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2">
                  Booking Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Check-in:
                    </span>
                    <span className="text-gray-900">
                      {formData?.tanggalWaktuCheckin
                        ? new Date(
                            formData.tanggalWaktuCheckin
                          ).toLocaleDateString("en-GB")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Check-out:
                    </span>
                    <span className="text-gray-900">
                      {formData?.tanggalWaktuCheckout
                        ? new Date(
                            formData.tanggalWaktuCheckout
                          ).toLocaleDateString("en-GB")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Room Number:
                    </span>
                    <span className="text-gray-900">
                      {formData?.nomorKamar || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Number of Guests:
                    </span>
                    <span className="text-gray-900">
                      {formData?.jumlahTamu || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Guest Receiver:
                    </span>
                    <span className="text-gray-900">
                      {formData?.penerimaTamu || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            <span>Print Confirmation</span>
          </button>

          <button
            onClick={onStartOver}
            className="bg-gradient-to-r from-legreen-500 to-legreen-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>New Registration</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
