Cypress.Commands.add('login', (login, password) => {
    cy.session([login, password], () => {
        let elementos = {
            adminName:          () => cy.get("span.usertext"),
            username:           ()=> cy.get('#username'),
            password:           ()=> cy.get('#password'),
            loginBtn:           ()=> cy.get('#loginbtn'),
            mensagemAlerta:     ()=> cy.get('div[role="alert"]'),
        }

        cy.visit('/login')
                
        elementos.username().clear();
        if (login != '') elementos.username().type(login);

        elementos.password().clear();
        if (password != '') elementos.password().type(password);

        elementos.loginBtn().click();

        elementos.adminName().should(($adminName) =>{
            let text = $adminName.text().toLowerCase();
            let expectedText = login.toLowerCase();
            expect(text).to.contain(expectedText);
        })
        
    })
});

Cypress.Commands.add('loginAPI', (login, password) => {
    cy.session([login,password], () => {
        let loginToken;
        cy.request({
            method: 'GET',
            url: '/login/index.php'
        })
            .then((response) => {
                loginToken = response.body.match(/name="logintoken" value="(.*)"/)[1];
            })
                .then(() => {
                    cy.request({
                        method: 'POST',
                        url: '/login/index.php',
                        body: {
                            'anchor' : '',
                            'logintoken' : loginToken,
                            'username' : login,
                            'password' : password
                        },
                        form: true
                    })
                        .then(() => {
                            cy.visit('/my')
                        })
                    })
    });
})
