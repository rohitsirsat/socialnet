// // pages/VerifyEmail.js
// import React, { useEffect, useState } from "react";
// import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
// import { apiClient } from "@/api";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import axios from "axios";

// const VerifyEmail = () => {
//   //   const { verificationToken } = useParams();
//   //   const [isVerifying, setIsVeriying] = useState(false);
//   const { toast } = useToast();
//   // const { navigate } = Navigate();

//   //   useEffect(() => {
//   //     const verifyEmail = async () => {
//   //       setIsVeriying(true);
//   //       try {
//   //         const response = await axios.get(
//   //           "http://localhost:8081/users/verify-email/:verificationToken"
//   //         );

//   //         if (response.status >= 200 && response.status < 300) {
//   //           toast({
//   //             title: "Login Successful",
//   //             description: response.data.message || "Email verified successfully",
//   //             variant: "success",
//   //           });
//   //           setIsVerified(false);
//   //         }
//   //       } catch (error) {
//   //         toast({
//   //           title: "Login Failed",
//   //           description:
//   //             error.response?.data?.message ||
//   //             "Verification failed. Please try again.",
//   //           variant: "destructive",
//   //         });
//   //         setIsVeriying(false);
//   //       }
//   //     };

//   //     if (verificationToken) verifyEmail();
//   //   }, [verificationToken]);

//   //   return (
//   //     <>
//   //       {isVerifying ? (
//   //         <h1>Verifying email...</h1>
//   //       ) : (
//   //         <div>
//   //           <h1>Email verified successfully</h1>
//   //           <Link to={"/login"}>
//   //             <Button>Go to login</Button>
//   //           </Link>
//   //         </div>
//   //       )}
//   //     </>
//   //   );
//   // };
//   const { verificationToken } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!verificationToken) return;

//     const verifyUserEmail = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8081/api/v1/users/verify-email/${verificationToken}`
//         );
//         toast({ title: "Success", description: response.data.message });
//         Navigate("/login");
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: error.response?.data?.message || "Verification failed",
//         });
//       }
//     };

//     verifyUserEmail();
//   }, [verificationToken, navigate]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       Verifying email...
//     </div>
//   );
// };

// export default VerifyEmail;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  // useEffect(() => {
  //   if (verificationToken) {
  //     axios
  //       .get(
  //         `http://localhost:8081/api/v1/users/verify-email/${verificationToken}`
  //       )
  //       .then((res) => {
  //         setStatus("Email verified successfully! Redirecting to login...");
  //         setTimeout(() => navigate("/login"), 3000);
  //       })
  //       .catch((err) => {
  //         setStatus(
  //           err.response?.data?.message ||
  //             "Failed to verify email. Token may be invalid or expired."
  //         );
  //       });
  //   } else {
  //     setStatus("Invalid verification token.");
  //   }
  // }, [verificationToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">User Verification Doneeeeee</h2>
    </div>
  );
};

export default VerifyEmail;
