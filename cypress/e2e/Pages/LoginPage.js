const AdminSitePage = require("./AdminSitePage");

class LoginPage {

    elementos = {
        username:           ()=> cy.get('#username'),
        password:           ()=> cy.get('#password'),
        loginBtn:           ()=> cy.get('#loginbtn'),
        rememberUsername:   ()=> cy.get('#rememberusername'),
        mensagemAlerta:     ()=> cy.get('div[role="alert"]'),
        body:               ()=> cy.get('body'),
        guestBtn:           ()=> cy.get('#loginguestbtn'),
        criarContaBtn:      ()=> cy.get('button[class="btn btn-secondary"]')
    }

    preencheUsuario(username){
        if (username == '') this.elementos.username().clear();
        else this.elementos.username().type(username);
        return this;
    }

    preencheSenha(password){
        if (password == '') this.elementos.password().clear();
        else this.elementos.password().type(password);
        return this;
    }

    selecionaLembrarUsuario(selecao){
        if (selecao == 'TRUE') this.elementos.rememberUsername().click();
        return this;
    }

    visitaLogin(){
        cy.visit('/login')
        return this;
    }
    
    pressionaBotaoLogin(){
        this.elementos.loginBtn().click();
        return AdminSitePage;
    }

    verificaCordeFundo(cor){
        this.elementos.body().should('have.css', 'background-color', cor)
    }

    verificaCorDoBotaoLogin(cor){
        this.elementos.loginBtn().should('have.css', 'background-color', cor)
    }

    verificaCorDoBotaoVisitante(cor){
        this.elementos.guestBtn().should('have.css', 'background-color', cor)
    }

    verificarCorDoBotaoCriarConta(cor){
        this.elementos.criarContaBtn().should('have.css', 'background-color', cor)
    }
}
module.exports = new LoginPage();