FROM node:15
WORKDIR /usr/src/app

# A wildcrad is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install express mongoose ejs
RUN npm install --save-dev nodemon
RUN npm install dotenv marked slugify method-override dompurify jsdom

COPY . .

EXPOSE 5000
CMD ["npm", "run", "devStart"]