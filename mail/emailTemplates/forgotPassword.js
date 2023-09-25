function generateForgotPasswordEmailTemplate(token) {
    const html = `
        <html>
            <body>
                <h1>Hola perdiste tu contraseña?</h1>
                <p><strong>No te preocupes, este es tu token para recuperarla ${token}</strong></p>
                <p> Si no iniciaste este proceso, por favor solo ignorar el mail. </p>
            </body>
        </html>
    `;

    return html;
}

module.exports = generateForgotPasswordEmailTemplate;
