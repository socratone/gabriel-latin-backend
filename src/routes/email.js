const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

/**
 * G메일의 '보안 수준이 낮은 앱의 액세스'를 허용해야 메일이 보내진다.
 * https://myaccount.google.com/lesssecureapps
 */

router.post('/', async (req, res) => {
  const { name, sex, birth, phone, email, q1, q2 } = req.body;

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });
 
    const html = `
      <h3>이름</h3>
      <p>${name}</p>
      <h3>성별</h3>
      <p>${sex === 'male' ? '남' : '여'}</p>
      <h3>생년월일</h3>
      <p>${birth}</p>
      <h3>전화번호</h3>
      <p>${phone}</p>
      <h3>이메일</h3>
      <p>${email}</p>
      <h3>라틴어를 처음 접하시나요? 아니라면 어느 정도 공부하셨나요?</h3>
      <p>${q1}</p>
      <h3>어떤 언어를 알고 계시나요? 어느 정도 수준이신가요?</h3>
      <p>${q2}</p>
    `;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${name} <${process.env.EMAIL}>`, // sender address
      to: process.env.EMAIL, // list of receivers
      subject: `${name}, 라틴어 수강 신청합니다.`, // Subject line
      // text: "", // plain text body
      html // html body
    });

    res.status(200).send(info);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;