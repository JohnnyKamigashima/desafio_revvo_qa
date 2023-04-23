describe('Validar que o administrador consiga trocar o idioma', () => {
    it('Para Portugues-BR', () => {
        let loginToken;
        cy.request({
            method: 'GET',
            url: '/login/index.php'
            }).then((response) => {
                let cookieString = response.headers['set-cookie'][0];
                let cookieValue = cookieString.split("=")[1];
                cookieValue = cookieValue.split(";")[0];
                loginToken = response.body.match(/name="logintoken" value="(.*)"/)[1];

                cy.setCookie('MoodleSession', cookieValue)
            }).then(() => {
                cy.request({
                    method: 'POST',
                    url: '/login/index.php',
                    body: {
                        'anchor' : '',
                        'logintoken' : loginToken,
                        'username' : 'admin',
                        'password' : 'sandbox'
                    },
                    form: true
                    }).then((response) => {
                        console.log(response)
                        let cookieString = response.headers['set-cookie'][0];
                        let cookieValue = cookieString.split("=")[1];
                        cookieValue = cookieValue.split(";")[0];
                        console.log(cookieValue); // Output: "27f1f5abdd5bcaea2e68a8902a88739d"

                        cy.setCookie('MoodleSession', cookieValue, {
                            domain: 'sandbox311.moodledemo.net',
                            path: '/',
                            secure: true,
                            sameSite: 'None'
                        })
                        cy.visit('/my')
                        cy.visit('/admin')
                    })
                })
            });
})