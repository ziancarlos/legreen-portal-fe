import { useState } from "react";
import Agreement from "./components/Agreement";
import RegistrationForm from "./components/RegistrationForm";
import SuccessPage from "./components/SuccessPage";

function App() {
  const [currentStep, setCurrentStep] = useState("agreement"); // 'agreement', 'form', 'success'
  const [formData, setFormData] = useState(null);

  const handleAgreementComplete = () => {
    setCurrentStep("form");
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentStep("success");
  };

  const handleStartOver = () => {
    setCurrentStep("agreement");
    setFormData(null);
  };

  return (
    <>
      {currentStep === "agreement" && (
        <Agreement onAgree={handleAgreementComplete} />
      )}

      {currentStep === "form" && (
        <RegistrationForm onSubmit={handleFormSubmit} />
      )}

      {currentStep === "success" && (
        <SuccessPage formData={formData} onStartOver={handleStartOver} />
      )}
    </>
  );
}

export default App;
