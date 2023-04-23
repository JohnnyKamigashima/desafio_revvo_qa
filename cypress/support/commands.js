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
