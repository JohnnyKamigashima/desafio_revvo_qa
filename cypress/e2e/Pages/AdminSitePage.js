class AdminSitePage {
    elementos = {
        siteName:            () => cy.get('.site-name.d-none.d-md-inline'),
        adminName:           () => cy.get("span.usertext"),
        mensagemAlerta:      () => cy.get('div[role="alert"]'),
        listaDropDownIdioma: () => cy.get('.dropdown-toggle.nav-link'),
    }

    verificaRedirecionamento(nomeDoSite, nomedoUsuario){
        this.elementos.siteName().should('have.text', nomeDoSite)
        this.elementos.adminName().should('have.text', nomedoUsuario)
    }

    verificaLogin(mensagemPT, mensagemEN){
        if((mensagemPT == 'Sucesso' || mensagemEN == 'Success')){
            this.verificaRedirecionamento('Sandbox 3.11', 'Admin User')
        }else{
            this.elementos.mensagemAlerta().should(($div) => {
                const text = $div.text()
                let regex = new RegExp(mensagemPT + '|' + mensagemEN)
                expect(text).to.match(regex)
              })
        }
        return this;
    }

    selecionaIdioma(idioma){
        this.elementos.listaDropDownIdioma().click()
        cy.get(`a[role='menuitem']:contains('${idioma}')`)
            .scrollIntoView()
            .click()
        return this;
    }

    verificaIdiomadoSite(idioma){
        cy.url().should('contain', idioma)
        return this;
    }

    adicionaNovoCurso(lang){
        cy.visit(`course/edit.php?lang=${lang}`)
    }

    gerenciaCursos(lang){
        cy.visit(`course/management.php?lang=${lang}`)
    }
  
};

module.exports = new AdminSitePage();