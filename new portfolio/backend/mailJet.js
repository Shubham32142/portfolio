const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

const mailjet = require("node-mailjet").apiConnect(
  process.env.API_KEY,
  process.env.SECRET_KEY
);

const sendEmail = async (subject, textContent) => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "shubhamdubey23042004@gmail.com",
            Name: "Shubham",
          },
          To: [
            {
              Email: "shubhamdubey23042004@gmail.com",
              Name: "Recipient",
            },
          ],
          Subject: subject,
          TextPart: textContent,
        },
      ],
    });
    console.log("Response:", JSON.stringify(request.body, null, 2));
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending Email:", err);
  }
};

app.post("/send-email", async (req, res) => {
  const { firstName, lastName, subject, message } = req.body; // User provides recipient fullName , subject, and message
  const fullName = `${firstName} ${lastName}`;
  try {
    await sendEmail(subject, `from: ${fullName}\n ${message}`); // Sends email to the recipient
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send Email" });
  }
});
