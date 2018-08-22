FROM 370531249777.dkr.ecr.ap-south-1.amazonaws.com/node:8.3.0
#FROM node:carbon

EXPOSE 80

# Install app dependencies
COPY package.json package.json
RUN npm install


# Bundle app source

COPY . .

RUN REALM=PROD LANGUAGE=bn npm run build
RUN REALM=PROD LANGUAGE=gu npm run build
RUN REALM=PROD LANGUAGE=hi npm run build
RUN REALM=PROD LANGUAGE=kn npm run build
RUN REALM=PROD LANGUAGE=ml npm run build
RUN REALM=PROD LANGUAGE=mr npm run build
RUN REALM=PROD LANGUAGE=ta npm run build
RUN REALM=PROD LANGUAGE=te npm run build
