function generateActivateAccountEmailTemplate(name, lastName, token) {
    const html = `
        <html>
            <body>
                <h1>Hola bienvenido a nuestro software</h1>
                <p><strong>${name} ${lastName}</strong></p>
                <p><strong>Este es tu token de activacion ${token}</strong></p>
                <p> Si no iniciaste este proceso, por favor solo ignorar el mail. </p>
            </body>
        </html>
    `;

    return html;
}

module.exports = generateActivateAccountEmailTemplate;
