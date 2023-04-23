class AddNewCoursePage{
    elementos = {
        courseFullNameRequiredIcon:     () => cy.get('#fitem_id_fullname > .col-md-3 > .form-label-addon > div.text-danger > .icon'),
        courseFullName:                 () => cy.get('#id_fullname'),
        courseFullNameMessage:          () => cy.get('#id_error_fullname'),
        courseShortNameRequiredIcon:    () => cy.get('#fitem_id_shortname > .col-md-3 > .form-label-addon > div.text-danger > .icon'),
        courseShortName:                () => cy.get('#id_shortname'),
        courseShortNameMessage:         () => cy.get('#id_error_shortname'),
        courseCategoryRequiredIcon:     () => cy.get('#fitem_id_category > .col-md-3 > .form-label-addon > div.text-danger > .icon'),
        courseCategory:                 () => cy.get('span[role="option"]'),
        courseCategoryMessage:          () => cy.get('#id_error_category'),
        courseCategoryDrowDown:         () => cy.get('input[placeholder="Buscar"][role="combobox"]'),
        courseIdNumber:                 () => cy.get('#id_idnumber'),
        courseButtonSaveAndDisplay:     () => cy.get('#id_saveanddisplay'),
        coursePainelObrigatorio:        () => cy.get('fieldset[id="id_general"] div[class="fcontainer clearfix"]')
       
    }

    preencheNomeCompletoDoCurso(nomeCompleto){
        if(nomeCompleto != '') this.elementos.courseFullName().type(nomeCompleto)
        return this;
    }

    preencheNomeCurtoDoCurso(nomeCurto){
        if(nomeCurto != '' ) this.elementos.courseShortName().type(nomeCurto)
        return this;
    }

    preencheCategoriaDoCurso(categoria){
        this.elementos.courseCategory().click()
        if(categoria != ''){
            this.elementos.courseCategoryDrowDown().type(categoria).type('{enter}')
        }
        return this;
    }

    preencheIdNumberDoCurso(idNumber){
        if(idNumber != '') this.elementos.courseIdNumber().type(idNumber)
        return this;
    }

    pressionaBotaoSaveAndDisplay(){
        this.elementos.courseButtonSaveAndDisplay().click()
    }

    verificaMensagensDeErro(mensagem){
        this.elementos.coursePainelObrigatorio().should('contain', mensagem)
        cy.contains(mensagem).should('have.css', 'color', "rgb(202, 49, 32)")
    }

    verificaSinalizadorDeCampoObrigatorio(caractere, cor){
        this.elementos.courseFullNameRequiredIcon().should('be.visible')
        this.elementos.courseFullNameRequiredIcon().should('contain', caractere)
        this.elementos.courseFullNameRequiredIcon().should('have.css','color', cor)

        this.elementos.courseShortNameRequiredIcon().should('be.visible')
        this.elementos.courseShortNameRequiredIcon().should('contain', caractere)
        this.elementos.courseShortNameRequiredIcon().should('have.css','color', cor)

        this.elementos.courseCategoryRequiredIcon().should('be.visible')
        this.elementos.courseCategoryRequiredIcon().should('contain', caractere)
        this.elementos.courseCategoryRequiredIcon().should('have.css','color', cor)
    }
}

module.exports = new AddNewCoursePage();