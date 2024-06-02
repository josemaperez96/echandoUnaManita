Antes de comenzar tenemos que descargarnos nuestro repositorio de github de la rama master.
Una vez lo tengamos descomprimido, nos metemos en la carpeta que nos deja con la consola de comandos y procedemos a instalar las dependencias necesarias para su ejecución(copia y pega en la consola de comandos):

npm install express sqlite3 cors
npm install concurrently --save-dev
npm install axios
npm install react-router-dom
npm install multer
npm install web-vitals
npm install react-scripts

Una vez instalado todo, lanzamos el servicio con:

npm start

Para que los tests funcionen, los comandos son los siguientes:
npm install --save-dev jest
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react
npm test
