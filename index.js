const sgMail = require("@sendgrid/mail");
const fs = require("fs");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const puppeteer = require("puppeteer");

// convert html to pdf and send pdf as attachment

const convertPdf = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(
            "file:///home/alite-10/Documents/Github/cypress/mochawesome-report/mochawesome.html",
            { waitUntil: "networkidle2" }
        );
        await page.click("button.test--header-btn---mI0Oy");
        await page.pdf({ path: "hn.pdf", format: "A4" });

        await browser.close();
        console.log("PDF saved.");

        sendMail()
    } catch (error) {
        console.log("error: ", error);
    }
}


const sendMail = async () => {
    try {
        // send mail through sendgrid
        const pathToAttachment = `${__dirname}/hn.pdf`;
        const attachment = fs.readFileSync(pathToAttachment).toString("base64");
        
        const message = {
            to: "nikkibhalodiya03@gmail.com",
            from: "nikkibhalodiya03@gmail.com",
            subject: "Generated Test Report",
            template_id: "d-8f7f36aac0ea492cae1b4ae26a6c15df",
            attachments: [
                {
                    content: attachment,
                    type: "application/pdf",
                    filename: "test-report",
                    dispostition: "inline",
                    content_id: "uid1",
                },
            ],
        };
        
        await sgMail.send(message).catch((error) => {
            console.log(error);
        });
        
        console.log("Mail sent.");
        
    } catch (error) {
        console.log('error: ', error);
        
    }
}

convertPdf();