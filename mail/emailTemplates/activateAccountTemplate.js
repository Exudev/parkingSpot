function generateActivateAccountEmailTemplate(name, lastName, tokenLink) {
    const html = `
        <html>
            <body>
                <h1>Hola bienvenido a nuestro software</h1>
                <p><strong>${name} ${lastName}</strong></p>
                <p><strong>Click aqui para comenzar${tokenLink}</strong></p>
                <p> Si no iniciaste este proceso, por favor solo ignorar el mail. </p>
            </body>
        </html>
    `;

    return html;
}

module.exports = generateActivateAccountEmailTemplate;
