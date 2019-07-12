import nodemailer, { Transporter } from "nodemailer";
import config, { MailOpts, TaskType } from "./config";
import { retry } from "./util";

class Mailer {
  transporter: Transporter;
  options: MailOpts;
  constructor(opts: MailOpts) {
    this.options = { ...opts };
    delete opts.from;
    delete opts.to;
    this.transporter = nodemailer.createTransport(opts);
    console.log("mailer transporter init");
  }

  send(name: string, type: TaskType, content: string) {
    return retry(null, cb => {
      this.transporter.sendMail(
        {
          from: this.options.from,
          to: this.options.to,
          subject: `关注的${type}: ${name}更新了`,
          text: `新的章节: ${content}`
        },
        (err, res) => cb(err, res)
      );
    });
  }
}

export default new Mailer(config.mail);
