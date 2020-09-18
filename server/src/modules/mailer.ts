import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '742fefeca7358e',
    pass: '79d03a91cc4f4c',
  },
});

export default transport;
