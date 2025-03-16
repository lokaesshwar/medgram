import emailjs from "@emailjs/browser";

// Replace these with your EmailJS credentials
const SERVICE_ID: string = "service_uhsvznn";
const TEMPLATE_ID: string = "template_b4j8myf";
const PUBLIC_KEY: string = "t0LtjL5DSSP0Aqv_A";

// Define the type for email parameters
interface EmailParams {
  user_email: string;
  user_name: string;
  doctor_name: string;
  date: string;
  time: string;
  [key: string]: unknown;
}

// Function to send email
export const sendEmail = async (
  userEmail: string,
  userName: string,
  doctorName: string,
  date: string,
  time: string
): Promise<boolean> => {
  const emailParams: EmailParams = {
    user_email: userEmail,
    user_name: userName,
    doctor_name: doctorName,
    date: date,
    time: time,
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY);
    console.log("Email sent successfully!", response.status, response.text);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};